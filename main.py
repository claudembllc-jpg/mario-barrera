#!/usr/bin/env python3
"""
Social Intelligence Agent — CLI principal.

Uso:
  python main.py analyze @username [--type full|hooks|strategic|opportunities] [--model haiku|sonnet] [--force]
  python main.py compare @user1 @user2 [--model haiku|sonnet]
  python main.py hooks @username
  python main.py opportunities @username
  python main.py strategic @username [--model sonnet]
  python main.py analyze-all [--type full]
  python main.py list
  python main.py clear @username

  -- SKILL: Insurance Marketing Strategist --
  python main.py content-plan [--weeks 1]
  python main.py hook-builder [--type familia|miedo|barrera|urgencia|curiosidad|autoridad]
  python main.py campaign [--budget 20]
  python main.py market-report
"""

import argparse
import asyncio
import json
import os
import sys
from datetime import date
from pathlib import Path

BASE_DIR = Path(__file__).parent
CACHE_PROFILES = BASE_DIR / "cache" / "profiles"
CACHE_ANALYSIS = BASE_DIR / "cache" / "analysis"
OUTPUT_REPORTS = BASE_DIR / "output" / "reports"
COMPETITORS_FILE = BASE_DIR / "data" / "competitors.json"

# Ensure dirs exist
for d in (CACHE_PROFILES, CACHE_ANALYSIS, OUTPUT_REPORTS):
    d.mkdir(parents=True, exist_ok=True)

sys.path.insert(0, str(BASE_DIR))

from scripts.scrape_instagram import scrape_profile as ig_scrape
from scripts.clean_data import clean_profile_data
from scripts.analyze_profile import analyze_with_claude, analyze_comparison, ANALYSIS_TYPES, MODELS
from scripts.compare_profiles import compare_profiles


# ── Cache helpers ────────────────────────────────────────────────────────────

def _cache_key(username: str, suffix: str = "clean") -> Path:
    today = date.today().isoformat()
    return CACHE_PROFILES / f"{username}_{today}_{suffix}.json"


def _analysis_cache_key(username: str, atype: str) -> Path:
    today = date.today().isoformat()
    return CACHE_ANALYSIS / f"{username}_{atype}_{today}.json"


def _load_cache(path: Path) -> dict | None:
    if path.exists():
        with open(path) as f:
            return json.load(f)
    return None


def _save_cache(path: Path, data: dict) -> None:
    with open(path, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def _save_report(username: str, atype: str, content: str) -> Path:
    from datetime import datetime
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    path = OUTPUT_REPORTS / f"{username}_{atype}_{ts}.md"
    path.write_text(content, encoding="utf-8")
    return path


# ── Core pipeline ────────────────────────────────────────────────────────────

def get_clean_profile(
    username: str,
    force: bool = False,
    headless: bool = True,
    cookies_file: str | None = None,
    max_posts: int = 10,
) -> dict:
    username = username.lstrip("@").strip()
    cache_path = _cache_key(username)

    if not force and (cached := _load_cache(cache_path)):
        print(f"[cache] Usando perfil en cache: {cache_path.name}")
        return cached

    print(f"[scraping] Obteniendo perfil de @{username} en Instagram...")
    raw = asyncio.run(ig_scrape(username, max_posts, headless, cookies_file))

    raw_path = _cache_key(username, "raw")
    _save_cache(raw_path, raw)

    print("[cleaning] Limpiando y compactando datos...")
    clean = clean_profile_data(raw)
    _save_cache(cache_path, clean)

    followers = clean.get("followers", 0)
    posts_n = len(clean.get("posts", []))
    print(f"[ok] @{username} — {followers:,} seguidores — {posts_n} posts procesados")

    if clean.get("partial_data"):
        print("[warn] Datos parciales. Para datos completos usa --cookies con un archivo de sesión.")

    return clean


def run_analysis(
    username: str,
    atype: str = "full",
    model_key: str = "haiku",
    force: bool = False,
    headless: bool = True,
    cookies_file: str | None = None,
) -> str:
    username = username.lstrip("@").strip()

    # Check analysis cache
    analysis_cache = _analysis_cache_key(username, atype)
    if not force and (cached_text := _load_cache(analysis_cache)):
        print(f"[cache] Usando análisis en cache: {analysis_cache.name}")
        return cached_text.get("content", "")

    profile = get_clean_profile(username, force, headless, cookies_file)

    print(f"[claude] Analizando con {MODELS.get(model_key, model_key)} (tipo: {atype})...")
    result = analyze_with_claude(profile, atype, model_key)

    _save_cache(analysis_cache, {"content": result})
    report_path = _save_report(username, atype, result)
    print(f"[saved] Reporte guardado: {report_path.name}")

    return result


# ── Commands ─────────────────────────────────────────────────────────────────

def cmd_analyze(args) -> None:
    atype = args.type or "full"
    result = run_analysis(
        args.username,
        atype=atype,
        model_key=args.model,
        force=args.force,
        headless=not args.no_headless,
        cookies_file=args.cookies,
    )
    print("\n" + "=" * 60)
    print(result)


def cmd_hooks(args) -> None:
    result = run_analysis(
        args.username,
        atype="hooks",
        model_key=args.model,
        force=getattr(args, "force", False),
        headless=not getattr(args, "no_headless", False),
        cookies_file=getattr(args, "cookies", None),
    )
    print("\n" + "=" * 60)
    print(result)


def cmd_opportunities(args) -> None:
    result = run_analysis(
        args.username,
        atype="opportunities",
        model_key=args.model,
        force=getattr(args, "force", False),
        headless=not getattr(args, "no_headless", False),
        cookies_file=getattr(args, "cookies", None),
    )
    print("\n" + "=" * 60)
    print(result)


def cmd_strategic(args) -> None:
    model = getattr(args, "model", "sonnet")
    result = run_analysis(
        args.username,
        atype="strategic",
        model_key=model,
        force=getattr(args, "force", False),
        headless=not getattr(args, "no_headless", False),
        cookies_file=getattr(args, "cookies", None),
    )
    print("\n" + "=" * 60)
    print(result)


def cmd_compare(args) -> None:
    usernames = [u.lstrip("@").strip() for u in args.usernames]

    if len(usernames) < 2:
        print("ERROR: Se necesitan al menos 2 perfiles para comparar.")
        sys.exit(1)

    profiles = []
    for u in usernames:
        p = get_clean_profile(
            u,
            force=getattr(args, "force", False),
            headless=not getattr(args, "no_headless", False),
            cookies_file=getattr(args, "cookies", None),
        )
        profiles.append(p)

    print(f"[claude] Comparando {len(profiles)} perfiles con {MODELS.get(args.model, args.model)}...")
    comparison = compare_profiles(profiles)
    result = analyze_comparison(comparison, args.model)

    # Save report
    names = "_vs_".join(usernames[:3])
    from datetime import datetime
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_path = OUTPUT_REPORTS / f"compare_{names}_{ts}.md"
    report_path.write_text(result, encoding="utf-8")
    print(f"[saved] Reporte guardado: {report_path.name}")

    print("\n" + "=" * 60)
    print(result)


def cmd_analyze_all(args) -> None:
    if not COMPETITORS_FILE.exists():
        print("ERROR: No existe data/competitors.json")
        sys.exit(1)

    with open(COMPETITORS_FILE) as f:
        data = json.load(f)

    competitors = data.get("competitors", [])
    if not competitors:
        print("No hay competidores registrados en data/competitors.json")
        return

    atype = getattr(args, "type", "full") or "full"

    for comp in competitors:
        username = comp.get("username", "")
        if not username or username.startswith("ejemplo_"):
            continue
        print(f"\n{'─' * 40}")
        print(f"Analizando @{username} ...")
        try:
            result = run_analysis(username, atype=atype, model_key=args.model)
            print(result[:500] + "...\n[ver reporte completo en output/reports/]")
        except Exception as exc:
            print(f"[error] @{username}: {exc}")


def cmd_list(args) -> None:
    today = date.today().isoformat()
    cached = list(CACHE_PROFILES.glob(f"*_{today}_clean.json"))

    if not cached:
        print("No hay perfiles en cache para hoy.")
        return

    print(f"Perfiles en cache ({today}):")
    for p in sorted(cached):
        with open(p) as f:
            data = json.load(f)
        followers = data.get("followers", 0)
        niche = data.get("niche", "?")
        username = data.get("username", p.stem)
        print(f"  @{username:<25} {followers:>10,} seguidores  [{niche}]")


def cmd_clear(args) -> None:
    username = args.username.lstrip("@").strip()
    removed = 0
    for pattern in (
        CACHE_PROFILES.glob(f"{username}_*"),
        CACHE_ANALYSIS.glob(f"{username}_*"),
    ):
        for f in pattern:
            f.unlink()
            removed += 1
    print(f"[ok] Cache limpiado para @{username} ({removed} archivos eliminados)")


# ── CLI setup ────────────────────────────────────────────────────────────────

def _add_common_args(parser) -> None:
    parser.add_argument("--model", choices=list(MODELS.keys()), default="haiku",
                        help="Modelo Claude: haiku (rápido) o sonnet (profundo)")
    parser.add_argument("--force", action="store_true", help="Forzar re-scraping y re-análisis")
    parser.add_argument("--no-headless", action="store_true", help="Mostrar navegador durante scraping")
    parser.add_argument("--cookies", metavar="FILE", help="Archivo JSON con cookies de Instagram")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="python main.py",
        description="Social Intelligence Agent — Inteligencia competitiva para Instagram",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  python main.py analyze @competidor1
  python main.py analyze @competidor1 --type hooks
  python main.py analyze @competidor1 --type strategic --model sonnet
  python main.py compare @comp1 @comp2 @comp3
  python main.py hooks @competidor1
  python main.py opportunities @competidor1
  python main.py strategic @competidor1
  python main.py analyze-all
  python main.py list
  python main.py clear @competidor1
        """,
    )

    sub = parser.add_subparsers(dest="command", metavar="COMANDO")

    # analyze
    p_analyze = sub.add_parser("analyze", help="Analiza un perfil de Instagram")
    p_analyze.add_argument("username", help="Username (con o sin @)")
    p_analyze.add_argument(
        "--type", choices=list(ANALYSIS_TYPES.keys()), default="full",
        help="Tipo de análisis (default: full)"
    )
    _add_common_args(p_analyze)

    # hooks
    p_hooks = sub.add_parser("hooks", help="Analiza los hooks del perfil")
    p_hooks.add_argument("username", help="Username")
    _add_common_args(p_hooks)

    # opportunities
    p_opp = sub.add_parser("opportunities", help="Detecta oportunidades de mercado")
    p_opp.add_argument("username", help="Username")
    _add_common_args(p_opp)

    # strategic
    p_strat = sub.add_parser("strategic", help="Análisis estratégico profundo")
    p_strat.add_argument("username", help="Username")
    _add_common_args(p_strat)

    # compare
    p_compare = sub.add_parser("compare", help="Compara múltiples perfiles")
    p_compare.add_argument("usernames", nargs="+", help="Usernames a comparar (mínimo 2)")
    _add_common_args(p_compare)

    # analyze-all
    p_all = sub.add_parser("analyze-all", help="Analiza todos los competidores registrados")
    p_all.add_argument("--type", choices=list(ANALYSIS_TYPES.keys()), default="full")
    _add_common_args(p_all)

    # list
    sub.add_parser("list", help="Lista perfiles en cache")

    # clear
    p_clear = sub.add_parser("clear", help="Limpia cache de un perfil")
    p_clear.add_argument("username", help="Username a limpiar")

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    dispatch = {
        "analyze": cmd_analyze,
        "hooks": cmd_hooks,
        "opportunities": cmd_opportunities,
        "strategic": cmd_strategic,
        "compare": cmd_compare,
        "analyze-all": cmd_analyze_all,
        "list": cmd_list,
        "clear": cmd_clear,
    }

    fn = dispatch.get(args.command)
    if fn:
        fn(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
