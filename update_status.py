#!/usr/bin/env python3
"""
Genera STATUS.md — el documento vivo del proyecto.
Ejecutar al final de cada sesión importante:
  python3 update_status.py
ATLAS lo llama automáticamente cuando hay cambios relevantes.
"""

import json
from pathlib import Path
from datetime import datetime

BASE = Path(__file__).parent


def read_json(path: str) -> dict:
    p = BASE / path
    if p.exists():
        try:
            return json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def read_text(path: str, lines: int = 999) -> str:
    p = BASE / path
    if p.exists():
        content = p.read_text(encoding="utf-8")
        return "\n".join(content.splitlines()[:lines])
    return ""


def latest_report() -> tuple[str, str]:
    reports_dir = BASE / "output" / "reports"
    if not reports_dir.exists():
        return "", ""
    reports = sorted(reports_dir.glob("*.md"), key=lambda f: f.stat().st_mtime, reverse=True)
    if reports:
        f = reports[0]
        lines = f.read_text(encoding="utf-8").splitlines()
        snippet = " ".join(l.strip() for l in lines[2:8] if l.strip())[:300]
        return f.name, snippet
    return "", ""


def latest_trend() -> str:
    p = BASE / "output" / "reports" / "tendencias_mercado_2026-05-29.md"
    if not p.exists():
        return "Sin análisis de tendencias reciente."
    lines = p.read_text(encoding="utf-8").splitlines()
    # Extraer las 3 tendencias principales
    trends = []
    for line in lines:
        if line.startswith("## TENDENCIA #"):
            trends.append(line.replace("## ", "").strip())
        if len(trends) == 3:
            break
    return "\n".join(f"- {t}" for t in trends) or "Ver output/reports/tendencias_mercado_2026-05-29.md"


def infra_status() -> list[tuple[str, str]]:
    items = [
        ("Dashboard Kanban", "http://localhost:3001"),
        ("Servidor Flask", "PID en /tmp/dashboard.log"),
        ("Instagram Session", "$INSTAGRAM_SESSION"),
        ("Anthropic API", "$ANTHROPIC_API_KEY"),
        ("Cloudflare Tunnel", "URL en /tmp/tunnel.log"),
        ("Landing page cotización", "/var/www/cotizacion/ — PENDIENTE"),
        ("Google Business Profile", "Sin crear — URGENTE"),
    ]
    return items


def skills_table() -> str:
    skills = [
        ("ATLAS", "orchestrator.md", "Siempre — es el núcleo"),
        ("Social Intelligence", "social_intelligence.md", "Scraping · análisis competencia"),
        ("Insurance Marketing", "insurance_marketing_strategist.md", "Contenido · hooks · Meta Ads"),
        ("Web Funnel Builder", "web_funnel_builder.md", "Landing pages · web · hosting"),
        ("SEO Intelligence", "seo_intelligence.md", "Google · keywords · GEO/AEO · IA"),
    ]
    rows = ["| Skill | Activar cuando |", "|-------|----------------|"]
    for name, _, trigger in skills:
        rows.append(f"| **{name}** | {trigger} |")
    return "\n".join(rows)


def tasks_section(active: dict) -> str:
    resumen = active.get("resumen", {})
    proximas = active.get("proximas", [])

    total = active.get("total", 0)
    pend = resumen.get("pendiente", 0)
    prog = resumen.get("en_progreso", 0)
    rev  = resumen.get("revision", 0)
    done = resumen.get("completada", 0)

    lines = [
        f"**{total} tareas totales** · {pend} pendientes · {prog} en progreso · {rev} en revisión · {done} completadas",
        "",
        "**Próximas más urgentes:**",
    ]
    for t in proximas[:5]:
        pri = {"alta": "🔴", "media": "🟡", "baja": "🟢"}.get(t.get("prioridad", ""), "⚪")
        fecha = t.get("fecha_limite", "")
        para = t.get("para", "")
        titulo = t.get("titulo", "")[:65]
        lines.append(f"- {pri} `{t.get('id','')}` **{titulo}** → {para} · {fecha}")

    return "\n".join(lines)


def competitors_section() -> str:
    data = read_json("data/competitors.json")
    comps = data.get("competitors", [])
    if not comps:
        return "Ver `data/competitors.json`"
    rows = ["| Cuenta | Seguidores | Prioridad |", "|--------|-----------|-----------|"]
    for c in sorted(comps, key=lambda x: x.get("followers", 0), reverse=True)[:6]:
        u = c.get("username", "")
        f = c.get("followers", 0)
        p = c.get("priority", "").upper()
        rows.append(f"| @{u} | {f:,} | {p} |")
    return "\n".join(rows)


def generate() -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    active = read_json("data/tasks_active.json")
    report_name, report_snippet = latest_report()

    doc = f"""# ATLAS · Mario Barrera Group
> Documento vivo — actualizado automáticamente · Última actualización: **{now}**

---

## 🎯 NEGOCIO

| Campo | Valor |
|-------|-------|
| **Agente** | Mario Barrera |
| **Producto** | Final Expense Insurance + Beneficios en Vida |
| **Experiencia** | 15 años |
| **Mercado** | Latinos 50-85 años · Houston · Dallas · Austin · Texas |
| **Instagram** | @mariobarrera_agente — 376 seguidores · 675 posts |
| **Teléfono** | 1-888-856-1999 |
| **Diferenciador #1** | "Auditor de seguros" — único en el nicho hispano TX |
| **Diferenciador #2** | Beneficios en vida — el cliente cobra estando vivo |

---

## 🔴 URGENTE AHORA

1. **Optimizar bio de Instagram** — incluir "15 años", "beneficios en vida", CTA
2. **Foto de perfil con cara visible** — la acción de mayor impacto inmediato
3. **REEL #1 — Presentación personal** — base de toda la estrategia de contenido
4. **Crear Google Business Profile** — sin esto no hay SEO local

---

## 📊 MERCADO — Tendencias detectadas ({datetime.now().strftime("%Y-%m-%d")})

{latest_trend()}

**Oportunidad urgente:** hashtags vacíos `#beneficiosenvidausa` `#auditordeseguros` `#finalexpenseinspanish`
Ver reporte completo: `output/reports/tendencias_mercado_2026-05-29.md`

---

## 🏆 COMPETIDORES

{competitors_section()}

Análisis completos en `output/reports/`. Perfiles en cache: `cache/profiles/`

---

## 📋 TAREAS ACTIVAS

{tasks_section(active)}

Dashboard en vivo: **http://localhost:3001**

---

## ⚙️ INFRAESTRUCTURA

| Componente | Estado |
|-----------|--------|
| Dashboard Kanban | ✅ Activo — http://localhost:3001 |
| Servidor Flask | ✅ Corriendo — ver /tmp/dashboard.log |
| Instagram Scraper | ✅ Operativo — requiere $INSTAGRAM_SESSION |
| Cloudflare Tunnel | ✅ URL en /tmp/tunnel.log |
| Landing page | ⏳ Pendiente — /var/www/cotizacion/ |
| Google Business | ⏳ Sin crear — URGENTE |
| Anthropic API | ⏳ Pendiente — $ANTHROPIC_API_KEY |

---

## 🧠 SKILLS DE ATLAS

{skills_table()}

Detalle completo de cada skill en `agents/`

---

## 📁 ARCHIVOS CLAVE

| Archivo | Para qué |
|---------|---------|
| `data/atlas_index.md` | Contexto completo del negocio (cargar primero) |
| `data/tasks_active.json` | Estado rápido de tareas (304 tokens) |
| `data/tasks.json` | Detalle completo de tareas (para dashboard) |
| `data/mario_barrera_profile.md` | Perfil profesional completo |
| `data/results.json` | Registro de publicaciones y resultados |
| `data/competitors.json` | Lista de competidores con métricas |
| `references/keyword-database.md` | Keywords para SEO + GEO |
| `references/hook-patterns.md` | Hooks para el mercado latino TX |
| `references/meta-ads-specs.md` | Campañas Meta Ads paso a paso |
| `output/reports/` | Todos los reportes de análisis |
| `strategy/` | Briefs generados para el equipo |

---

## 📈 RESULTADOS

Ver `data/results.json` para registro de publicaciones y métricas.
*(Sin datos aún — se actualiza cuando el equipo reporte resultados)*

---

## 🗓 HISTORIAL DE SESIONES

| Fecha | Qué se hizo |
|-------|------------|
| 2026-05-28 | Setup · scraping competidores · análisis 3 perfiles · 4 skills · dashboard Kanban PWA |
| 2026-05-29 | Tendencias mercado · naming ATLAS · skill SEO · keyword DB · GEO plan · auditoría sistema · slim skills |

---

*Actualizar con: `python3 /root/social-agent/update_status.py`*
"""
    return doc.strip()


if __name__ == "__main__":
    status = generate()
    out = BASE / "STATUS.md"
    out.write_text(status, encoding="utf-8")
    tokens = len(status) // 4
    print(f"✅ STATUS.md actualizado ({tokens} tokens · {len(status):,} chars)")
    print(f"   {out}")
