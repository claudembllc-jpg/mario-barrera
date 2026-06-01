#!/usr/bin/env python3
"""
Limpia y compacta datos scraped antes de enviarlos a Claude.
Objetivo: mínimo de tokens, máximo de información útil.
"""

import json
import re
import sys
from pathlib import Path


# Keywords para inferir nicho del bio y captions
_NICHE_KEYWORDS: dict[str, list[str]] = {
    "negocios": ["negocio", "emprendedor", "startup", "ventas", "empresa", "marketing", "facturar", "ingresos"],
    "fitness": ["gym", "fitness", "ejercicio", "entrenamiento", "crossfit", "musculacion", "salud", "nutricion"],
    "gastronomia": ["receta", "cocina", "comida", "chef", "gastronomia", "food", "restaurante"],
    "moda": ["moda", "outfit", "fashion", "ropa", "estilo", "lookbook", "tendencia"],
    "tecnologia": ["tech", "tecnologia", "software", "ia", "ai", "programacion", "developer", "codigo"],
    "viajes": ["viaje", "travel", "trip", "destino", "turismo", "aventura", "nomada"],
    "educacion": ["aprende", "educacion", "curso", "clases", "tips", "tutorial", "ensenanza"],
    "bienestar": ["mindfulness", "meditacion", "bienestar", "yoga", "espiritualidad", "paz"],
    "finanzas": ["finanzas", "inversiones", "dinero", "crypto", "bolsa", "ahorro", "riqueza"],
    "creatividad": ["diseño", "arte", "fotografia", "video", "creativo", "ilustracion"],
}


def _infer_niche(bio: str, posts: list[dict]) -> str:
    text = (bio or "").lower()
    for post in posts[:5]:
        text += " " + (post.get("summary") or "").lower()

    scores: dict[str, int] = {}
    for niche, keywords in _NICHE_KEYWORDS.items():
        scores[niche] = sum(1 for kw in keywords if kw in text)

    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "general"


def _strip_emojis_excess(text: str) -> str:
    # Remove emoji clusters (keep max 2 consecutive emojis)
    text = re.sub(r'([\U00010000-\U0010ffff]|☀-⟿){3,}', '', text)
    return text.strip()


def _clean_caption(text: str, max_len: int = 250) -> str:
    if not text:
        return ""
    # Remove excessive newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    # Remove hashtag blocks (keep max 3 hashtags inline)
    hashtags = re.findall(r'#\w+', text)
    text = re.sub(r'(\s*#\w+){4,}', f' [{len(hashtags)} hashtags]', text)
    text = _strip_emojis_excess(text)
    return text[:max_len].strip()


def _calculate_engagement_rate(post: dict, followers: int) -> float:
    if followers <= 0:
        return 0.0
    engagement = post.get("likes", 0) + post.get("comments", 0)
    return round((engagement / followers) * 100, 2)


def clean_profile_data(raw: dict) -> dict:
    """
    Toma datos crudos del scraper y retorna JSON compacto y limpio.
    Elimina campos vacíos, trunca textos, añade métricas derivadas.
    """
    followers = raw.get("followers", 0)

    # Clean posts
    clean_posts = []
    for post in raw.get("posts", []):
        if post.get("error"):
            continue
        clean_post = {
            "type": post.get("type", "post"),
            "hook": _clean_caption(post.get("hook", ""), 120),
            "summary": _clean_caption(post.get("summary", ""), 250),
            "likes": post.get("likes", 0),
            "comments": post.get("comments", 0),
            "engagement_rate": _calculate_engagement_rate(post, followers),
        }
        # Remove empty fields to save tokens
        clean_post = {k: v for k, v in clean_post.items() if v not in ("", 0, 0.0)}
        clean_posts.append(clean_post)

    # Sort posts by engagement
    clean_posts.sort(key=lambda p: p.get("likes", 0) + p.get("comments", 0), reverse=True)

    bio = _clean_caption(raw.get("bio", ""), 400)
    niche = raw.get("niche") or _infer_niche(bio, clean_posts)

    # Calculate avg engagement
    avg_likes = 0
    if clean_posts:
        total_likes = sum(p.get("likes", 0) for p in clean_posts)
        avg_likes = total_likes // len(clean_posts)

    clean: dict = {
        "username": raw.get("username", ""),
        "bio": bio,
        "followers": followers,
        "following": raw.get("following", 0),
        "posts_count": raw.get("posts_count", 0),
        "niche": niche,
        "avg_likes": avg_likes,
        "posts_analyzed": len(clean_posts),
        "posts": clean_posts,
    }

    # Add optional fields only when present
    if raw.get("display_name"):
        clean["display_name"] = raw["display_name"]
    if raw.get("partial_data"):
        clean["partial_data"] = True
    if raw.get("note"):
        clean["note"] = raw["note"]

    # Remove zero-value numeric fields at top level
    for field in ("following", "posts_count", "avg_likes", "posts_analyzed"):
        if clean.get(field) == 0:
            del clean[field]

    return clean


def load_and_clean(filepath: str) -> dict:
    with open(filepath) as f:
        raw = json.load(f)
    return clean_profile_data(raw)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python clean_data.py <raw_profile.json>")
        sys.exit(1)

    result = load_and_clean(sys.argv[1])
    print(json.dumps(result, ensure_ascii=False, indent=2))
