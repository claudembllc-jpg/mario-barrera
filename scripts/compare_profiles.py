#!/usr/bin/env python3
"""
Compara dos o más perfiles scraped y genera un JSON de comparación
listo para análisis por Claude.
"""

import json
import sys
from pathlib import Path


def _engagement_score(profile: dict) -> float:
    posts = profile.get("posts", [])
    if not posts or not profile.get("followers"):
        return 0.0
    total = sum(p.get("likes", 0) + p.get("comments", 0) for p in posts)
    avg = total / len(posts)
    return round((avg / profile["followers"]) * 100, 2)


def _top_hooks(profile: dict, n: int = 3) -> list[str]:
    posts = sorted(profile.get("posts", []), key=lambda p: p.get("likes", 0), reverse=True)
    hooks = [p.get("hook", "") for p in posts[:n] if p.get("hook")]
    return hooks


def _content_mix(profile: dict) -> dict:
    posts = profile.get("posts", [])
    if not posts:
        return {}
    types = [p.get("type", "post") for p in posts]
    total = len(types)
    counts: dict[str, int] = {}
    for t in types:
        counts[t] = counts.get(t, 0) + 1
    return {t: f"{round(c / total * 100)}%" for t, c in counts.items()}


def compare_profiles(profiles: list[dict]) -> dict:
    """
    Genera un JSON comparativo compacto de múltiples perfiles.
    Input: lista de perfiles limpios (output de clean_data).
    """
    comparison = {
        "profiles_count": len(profiles),
        "profiles": [],
        "ranking": {},
        "insights": {},
    }

    summaries = []
    for p in profiles:
        eng = _engagement_score(p)
        summary = {
            "username": p.get("username", ""),
            "niche": p.get("niche", ""),
            "followers": p.get("followers", 0),
            "avg_likes": p.get("avg_likes", 0),
            "engagement_rate": eng,
            "content_mix": _content_mix(p),
            "top_hooks": _top_hooks(p),
            "bio_snippet": (p.get("bio") or "")[:100],
        }
        summaries.append(summary)

    comparison["profiles"] = summaries

    # Rankings
    if summaries:
        by_followers = sorted(summaries, key=lambda x: x["followers"], reverse=True)
        by_engagement = sorted(summaries, key=lambda x: x["engagement_rate"], reverse=True)
        by_avg_likes = sorted(summaries, key=lambda x: x["avg_likes"], reverse=True)

        comparison["ranking"] = {
            "by_followers": [s["username"] for s in by_followers],
            "by_engagement_rate": [s["username"] for s in by_engagement],
            "by_avg_likes": [s["username"] for s in by_avg_likes],
        }

        # Quick insights
        leader = by_engagement[0]
        comparison["insights"] = {
            "highest_engagement": leader["username"],
            "highest_engagement_rate": leader["engagement_rate"],
            "follower_range": f"{by_followers[-1]['followers']:,} – {by_followers[0]['followers']:,}",
            "dominant_format": _most_common_format(summaries),
        }

    return comparison


def _most_common_format(summaries: list[dict]) -> str:
    format_counts: dict[str, int] = {}
    for s in summaries:
        for fmt, pct_str in s.get("content_mix", {}).items():
            pct = int(pct_str.replace("%", "") or 0)
            format_counts[fmt] = format_counts.get(fmt, 0) + pct
    if not format_counts:
        return "unknown"
    return max(format_counts, key=format_counts.get)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compare_profiles.py profile1.json profile2.json [profile3.json ...]")
        sys.exit(1)

    loaded = []
    for path in sys.argv[1:]:
        with open(path) as f:
            loaded.append(json.load(f))

    result = compare_profiles(loaded)
    print(json.dumps(result, ensure_ascii=False, indent=2))
