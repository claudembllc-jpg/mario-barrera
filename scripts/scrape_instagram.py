#!/usr/bin/env python3
"""
Instagram profile scraper usando Playwright + API unofficial.
Retorna JSON limpio y compacto — sin HTML, sin ruido.

Autenticación (necesaria para la mayoría de perfiles):
  export INSTAGRAM_SESSION=<valor de la cookie sessionid>
  O pasar cookies_file con el JSON de cookies exportado del navegador.

Cómo obtener sessionid:
  1. Inicia sesión en instagram.com en Chrome/Firefox
  2. DevTools → Application → Cookies → instagram.com → sessionid
  3. Copia el valor
"""

import asyncio
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

try:
    from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print("ERROR: Playwright no instalado. Ejecuta: pip install playwright && playwright install chromium")
    sys.exit(1)


def _parse_number(text: str) -> int:
    if not text:
        return 0
    text = text.strip().replace("\xa0", " ").lower()

    # Detectar sufijo (puede ir separado por espacio: "269 m")
    suffix = ""
    for s in ("m", "k", "b"):
        if text.endswith(s) or f" {s}" in text:
            suffix = s
            text = text.replace(f" {s}", "").replace(s, "").strip()
            break

    # Quitar separadores de miles (formato europeo usa "." y americano usa ",")
    # Si hay "." pero no "," → punto es separador de miles (ej: 31.672)
    # Si hay "," pero no "." → coma es separador de miles (ej: 31,672)
    # Si hay ambos → el último es decimal
    text = re.sub(r"[^\d.,]", "", text)
    if "." in text and "," not in text:
        # Podría ser formato europeo (31.672) o decimal (3.14)
        parts = text.split(".")
        if len(parts) == 2 and len(parts[1]) == 3:
            text = text.replace(".", "")   # separador de miles
        else:
            text = text.replace(",", "").replace(".", "")
    else:
        text = text.replace(",", "").replace(".", "")

    try:
        n = float(text) if text else 0
        if suffix == "m":
            return int(n * 1_000_000)
        if suffix == "k":
            return int(n * 1_000)
        if suffix == "b":
            return int(n * 1_000_000_000)
        return int(n)
    except (ValueError, OverflowError):
        return 0


def _clean_caption(text: str, max_len: int = 300) -> str:
    if not text:
        return ""
    text = text.strip()
    text = re.sub(r"\s+", " ", text)
    return text[:max_len]


async def _dismiss_dialogs(page) -> None:
    selectors = [
        'button:has-text("Aceptar todas")',
        'button:has-text("Aceptar")',
        'button:has-text("Accept All")',
        'button:has-text("Accept")',
        'button:has-text("Allow")',
        '[aria-label="Close"]',
        '[aria-label="Cerrar"]',
    ]
    for selector in selectors:
        try:
            await page.click(selector, timeout=1500)
            await page.wait_for_timeout(300)
        except Exception:
            pass


async def _extract_profile_info(page, profile: dict) -> None:
    # Leer todos los spans del header y clasificar por contenido
    # Instagram muestra: "269 M seguidores", "194 seguidos", "31.672 publicaciones"
    try:
        spans = await page.query_selector_all("header section span")
        for span in spans:
            text = (await span.inner_text()).replace("\xa0", " ").strip()
            if not text:
                continue
            tl = text.lower()

            if "seguidor" in tl or "follower" in tl:
                # "269 M seguidores" → extraer número
                num_part = tl.replace("seguidores", "").replace("followers", "").strip()
                profile["followers"] = _parse_number(num_part)
            elif "seguido" in tl and "seguidor" not in tl:
                num_part = tl.replace("seguidos", "").replace("following", "").strip()
                profile["following"] = _parse_number(num_part)
            elif "publicacion" in tl or "post" in tl:
                num_part = tl.replace("publicaciones", "").replace("posts", "").strip()
                profile["posts_count"] = _parse_number(num_part)
    except Exception:
        pass

    # Bio: buscar span con texto largo que no sea número ni stat
    try:
        spans = await page.query_selector_all("header section span, header section div > span")
        for span in spans:
            text = (await span.inner_text()).strip()
            if not text or len(text) < 10:
                continue
            tl = text.lower()
            # Descartar los stats
            if any(w in tl for w in ["seguidor", "seguido", "publicacion", "post", "follower"]):
                continue
            # Descartar si es solo números
            if re.match(r'^[\d\s.,MKmk]+$', text):
                continue
            profile["bio"] = text[:500]
            break
    except Exception:
        pass

    # Nombre de display
    try:
        name_el = await page.query_selector("header section h1, header h1, header h2")
        if name_el:
            profile["display_name"] = (await name_el.inner_text()).strip()
    except Exception:
        pass


async def _close_post_modal(page) -> None:
    try:
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(600)
    except Exception:
        pass


async def _extract_single_post(page, link, index: int) -> dict:
    href = ""
    try:
        href = await link.get_attribute("href") or ""
    except Exception:
        pass

    post_type = "reel" if "/reel/" in href else "post"
    post: dict = {"type": post_type, "hook": "", "summary": "", "likes": 0, "comments": 0}

    try:
        await link.click()
        await page.wait_for_timeout(1800)

        # Caption — first meaningful span inside article
        caption_selectors = [
            'article h1',
            'article div[role="button"] > span',
            'article ul li:last-child span',
            '[data-testid="post-comment-root-0"] span',
        ]
        for sel in caption_selectors:
            try:
                el = await page.query_selector(sel)
                if el:
                    text = (await el.inner_text()).strip()
                    if text and len(text) > 5:
                        post["hook"] = _clean_caption(text, 150)
                        post["summary"] = _clean_caption(text, 300)
                        break
            except Exception:
                pass

        # Likes
        like_selectors = [
            'section[class*="like"] span',
            'button[class*="like"] span',
            'a[href*="liked_by"] span',
            'span:has-text("likes")',
            'span:has-text("Me gusta")',
        ]
        for sel in like_selectors:
            try:
                el = await page.query_selector(sel)
                if el:
                    val = (await el.inner_text()).strip()
                    n = _parse_number(val)
                    if n > 0:
                        post["likes"] = n
                        break
            except Exception:
                pass

        # Comments count
        try:
            comment_els = await page.query_selector_all('article ul li')
            post["comments"] = max(0, len(comment_els) - 2)
        except Exception:
            pass

    except Exception as exc:
        post["error"] = str(exc)[:80]

    return post


async def _extract_posts(page, profile: dict, max_posts: int) -> None:
    try:
        selectors = [
            'article a[href*="/p/"]',
            'article a[href*="/reel/"]',
            'main a[href*="/p/"]',
            'main a[href*="/reel/"]',
        ]
        links = []
        for sel in selectors:
            found = await page.query_selector_all(sel)
            links.extend(found)

        # Deduplicate by href
        seen, unique = set(), []
        for link in links:
            try:
                href = await link.get_attribute("href") or ""
                if href and href not in seen:
                    seen.add(href)
                    unique.append(link)
            except Exception:
                pass

        unique = unique[:max_posts]

        for i, link in enumerate(unique):
            post = await _extract_single_post(page, link, i)
            profile["posts"].append(post)
            await _close_post_modal(page)
            await page.wait_for_timeout(400)

    except Exception as exc:
        profile["scraper_warning"] = f"Post extraction error: {str(exc)[:100]}"


def _api_fetch_profile(username: str, sessionid: str) -> dict | None:
    """
    Intenta obtener datos del perfil via la API unofficial de Instagram.
    Requiere sessionid válido. Retorna dict con datos básicos o None si falla.
    """
    url = f"https://i.instagram.com/api/v1/users/web_profile_info/?username={username}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
            "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        ),
        "Accept": "*/*",
        "Accept-Language": "es-ES,es;q=0.9",
        "X-IG-App-ID": "936619743392459",
        "Cookie": f"sessionid={sessionid}",
        "Referer": "https://www.instagram.com/",
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read())
        user = data.get("data", {}).get("user", {})
        if not user:
            return None

        # Extraer posts básicos del GraphQL response
        posts = []
        edges = user.get("edge_owner_to_timeline_media", {}).get("edges", [])
        for edge in edges[:10]:
            node = edge.get("node", {})
            caption_edges = node.get("edge_media_to_caption", {}).get("edges", [])
            caption = caption_edges[0].get("node", {}).get("text", "") if caption_edges else ""
            media_type = node.get("__typename", "GraphImage")
            post_type = "reel" if "Video" in media_type else "post"
            posts.append({
                "type": post_type,
                "hook": caption[:150],
                "summary": caption[:300],
                "likes": node.get("edge_liked_by", {}).get("count", 0),
                "comments": node.get("edge_media_to_comment", {}).get("count", 0),
            })

        return {
            "username": user.get("username", username),
            "display_name": user.get("full_name", ""),
            "bio": user.get("biography", ""),
            "followers": user.get("edge_followed_by", {}).get("count", 0),
            "following": user.get("edge_follow", {}).get("count", 0),
            "posts_count": user.get("edge_owner_to_timeline_media", {}).get("count", 0),
            "is_verified": user.get("is_verified", False),
            "niche": "",
            "posts": posts,
            "scraped_at": datetime.now().isoformat(),
            "partial_data": False,
            "source": "api",
        }
    except urllib.error.HTTPError as e:
        return {"error": f"API HTTP {e.code}", "partial_data": True, "posts": []}
    except Exception as e:
        return {"error": str(e)[:100], "partial_data": True, "posts": []}


def _build_playwright_cookies(sessionid: str) -> list[dict]:
    return [
        {
            "name": "sessionid",
            "value": sessionid,
            "domain": ".instagram.com",
            "path": "/",
            "httpOnly": True,
            "secure": True,
        }
    ]


async def scrape_profile(
    username: str,
    max_posts: int = 10,
    headless: bool = True,
    cookies_file: str | None = None,
    sessionid: str | None = None,
) -> dict:
    username = username.lstrip("@").strip()

    # Resolver sessionid: argumento > variable de entorno > cookies_file
    sid = sessionid or os.environ.get("INSTAGRAM_SESSION", "")

    if not sid and cookies_file and Path(cookies_file).exists():
        with open(cookies_file) as f:
            raw_cookies = json.load(f)
        for c in raw_cookies:
            if c.get("name") == "sessionid":
                sid = c.get("value", "")
                break

    # 1) Intentar API unofficial primero (más rápido, menos recursos)
    if sid:
        print(f"[api] Obteniendo @{username} via API unofficial...")
        api_result = _api_fetch_profile(username, sid)
        if api_result and not api_result.get("error") and api_result.get("followers", 0) > 0:
            api_result["username"] = username
            return api_result
        print(f"[api] API fallida ({api_result.get('error', 'sin datos')}), usando Playwright...")

    # 2) Fallback: Playwright con sesión (browser completo)
    profile: dict = {
        "username": username,
        "display_name": "",
        "bio": "",
        "followers": 0,
        "following": 0,
        "posts_count": 0,
        "niche": "",
        "posts": [],
        "scraped_at": datetime.now().isoformat(),
        "partial_data": False,
        "source": "playwright",
    }

    if not sid:
        profile["partial_data"] = True
        profile["error"] = (
            "Se requiere sessionid de Instagram. "
            "Configura: export INSTAGRAM_SESSION=<tu_sessionid> "
            "o usa --cookies cookies.json"
        )
        profile["hint"] = (
            "Obtén tu sessionid: Instagram.com → DevTools → "
            "Application → Cookies → instagram.com → sessionid"
        )
        return profile

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=headless,
            args=["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        )

        ctx_kwargs = {
            "user_agent": (
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "viewport": {"width": 1280, "height": 800},
            "locale": "es-ES",
        }

        context = await browser.new_context(**ctx_kwargs)

        # Inyectar sessionid como cookie
        await context.add_cookies(_build_playwright_cookies(sid))

        # También cargar cookies_file si existe (puede tener más cookies útiles)
        if cookies_file and Path(cookies_file).exists():
            with open(cookies_file) as f:
                try:
                    await context.add_cookies(json.load(f))
                except Exception:
                    pass

        page = await context.new_page()

        try:
            await page.goto(
                f"https://www.instagram.com/{username}/",
                wait_until="domcontentloaded",
                timeout=30000,
            )
            await page.wait_for_timeout(2500)
            await _dismiss_dialogs(page)

            # Detectar si seguimos en login wall
            current_url = page.url
            if "accounts/login" in current_url:
                profile["partial_data"] = True
                profile["error"] = "sessionid inválido o expirado. Renueva tu cookie de sesión."
                await browser.close()
                return profile

            await _extract_profile_info(page, profile)
            await _extract_posts(page, profile, max_posts)

        except PlaywrightTimeout:
            profile["partial_data"] = True
            profile["error"] = "Timeout cargando el perfil"
        except Exception as exc:
            profile["partial_data"] = True
            profile["error"] = str(exc)[:150]
        finally:
            await browser.close()

    return profile


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scrape_instagram.py <username> [max_posts] [--no-headless]")
        sys.exit(1)

    username_arg = sys.argv[1]
    max_posts_arg = int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 10
    headless_arg = "--no-headless" not in sys.argv

    data = asyncio.run(scrape_profile(username_arg, max_posts_arg, headless_arg))
    print(json.dumps(data, ensure_ascii=False, indent=2))
