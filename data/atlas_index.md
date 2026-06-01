# ATLAS — Índice Maestro de Conocimiento
**Mario Barrera Group · Actualizado: 2026-05-29 (sesión 3)**

Este archivo es la memoria de trabajo de ATLAS. Se carga en cada sesión.
Contiene solo lo esencial — los detalles están en los archivos referenciados.

---

## NEGOCIO

| Campo | Valor |
|-------|-------|
| Cliente | Mario Barrera |
| Producto | Final Expense + Beneficios en Vida |
| Experiencia | 15 años |
| Mercado | Latinos 50-85 años, Texas (Houston · Dallas · Austin) |
| Instagram | @mariobarrera_agente — 376 seguidores · 675 posts |
| Teléfono | 1-888-856-1999 |
| Diferenciador #1 | "Auditor de seguros" — nadie más lo usa en el nicho hispano |
| Diferenciador #2 | Beneficios en vida — cliente cobra estando vivo |
| Estructura | Agente independiente + red de sub-agentes en Texas |
| Perfil completo | `data/mario_barrera_profile.md` |

---

## ESTADO DEL MERCADO (última investigación: 2026-05-29)

### Competidores principales analizados
| Cuenta | Seguidores | Posts | Ratio | Idioma | Prioridad |
|--------|-----------|-------|-------|--------|-----------|
| @celeste_cazares_ | 4,507 | 116 | 38.8x | Inglés | ALTA |
| @usallbenefitsgroup_oficial | 1,768 | 1,414 | 1.2x | Español | ALTA |
| @thegraciedavisagency | 670 | 141 | 4.7x | Inglés | MEDIA |
| @insuredbykourt | 470 | 6 | 78x | Inglés | ALTA |
| @iamjamilarobinson | 700 | 65 | 10.8x | Inglés | MEDIA |
| @amoranteinsurance | 540 | 371 | 1.4x | Español | MEDIA |

### Tendencias activas (2026-05-29) — YA APLICADAS EN TAREAS
1. 🔥 "Beneficios en Vida" se convierte en posicionamiento dominante del nicho hispano
2. 🔥 Hashtags vacíos en español = oportunidad: #beneficiosenvidausa #auditordeseguros #finalexpenseinspanish — incorporados en todos los reels y carruseles
3. 🔥 Ángulo "no estar bien asesorado" — incorporado en REEL #2, #3, #4
4. 📱 Facebook es donde está el cliente 50-70 — META ADS actualizado con audiencia separada por plataforma
5. 📊 Cuentas nuevas crecen con pocos posts de video — volumen no importa

### Archivos de investigación
- `output/reports/ranking_competidores_texas_2026-05-28.md`
- `output/reports/analisis_celeste_cazares_2026-05-28.md`
- `output/reports/analisis_insuredbykourt_2026-05-28.md`
- `output/reports/analisis_mariobarrera_agente_2026-05-28.md`
- `output/reports/inteligencia_mercado_texas_seguros_2026-05-28.md`
- `output/reports/tendencias_mercado_2026-05-29.md` ← MÁS RECIENTE

---

## DIAGNÓSTICO DE @mariobarrera_agente

| Problema | Causa | Solución |
|----------|-------|----------|
| Ratio 0.55x (peor del nicho) | 675 posts de texto, sin video, sin cara | Reels + cara visible |
| Sin conversión en leads | Bio sin CTA claro · landing activa pero sin tráfico | Bio optimizada → publicar → Meta Ads |
| Diferenciador sin explotar | "Auditoría" en textos pero invisible en video | Serie de reels de auditoría |
| Siguiendo 1,297 cuentas | Estrategia de follow-for-follow ineficaz | Limpiar ratio |

---

## PLAN ACTIVO — 90 DÍAS

### Fase 1 — Fundación (Semana 1-2)
- Bio optimizada · Foto con cara · Reel de presentación (fijado al top)
- Highlights con portadas · Link en bio → WhatsApp

### Fase 2 — Contenido (Semana 2-4)
- **Serie Auditoría:** 3 reels sobre el concepto único de Mario
- **Serie Historias:** 2 reels de casos reales anónimos
- **Serie Educación:** 2 carruseles (beneficios en vida · mitos)
- **Stories diarias:** 1 por día, 5 plantillas reutilizables

### Fase 3 — Captación (Mes 2)
- Landing page en VPS (`/var/www/cotizacion/`)
- Meta Ads Fase 1: $5-10/día awareness
- Meta Ads Fase 2: $15-20/día leads

### Frecuencia correcta
- 3-4 Reels/semana · 2 Carruseles/semana · 1 Story/día · 0 posts de texto solo

---

## TAREAS — ESTADO RÁPIDO

Leer `data/tasks_active.json` para estado actual (304 tokens).
Leer `data/tasks.json` solo si necesitas el detalle completo de una tarea (4,935 tokens).
Dashboard: http://localhost:3001

**Resumen actual:** 14 pendientes · 1 en progreso · 0 completadas
**En progreso:** Bio Instagram (TASK-D9A98A) — no tocar
**Más urgentes:** Foto de perfil (vence 30-May) · Portadas Highlights (vence 01-Jun) · REEL #1 (vence 02-Jun)

---

## SKILLS INSTALADAS

| Skill | Archivo | Activar cuando |
|-------|---------|----------------|
| ATLAS (Orquestador) | `agents/orchestrator.md` | Siempre — es el núcleo |
| Insurance Marketing | `agents/insurance_marketing_strategist.md` | Contenido · hooks · Meta Ads |
| Social Intelligence | `agents/social_intelligence.md` | Scraping · análisis competencia |
| Web Funnel Builder | `agents/web_funnel_builder.md` | Landing pages · web · hosting |
| SEO Intelligence | `agents/seo_intelligence.md` | Google · keywords · SEO local · GEO/AEO · aparecer en IA |

---

## INFRAESTRUCTURA TÉCNICA

| Componente | Estado | Ubicación |
|-----------|--------|-----------|
| Dashboard Kanban | ✅ Activo (systemd) | http://localhost:3001 |
| Servidor Flask | ✅ Systemd service | `systemctl status atlas-dashboard` |
| Tunnel API (3001) | ✅ Systemd service | `systemctl status atlas-tunnel-api` |
| Tunnel Web (80) | ✅ Systemd service | `systemctl status atlas-tunnel-web` |
| Instagram Session | ✅ Activa | `$INSTAGRAM_SESSION` |
| Cache perfiles | ✅ 3 perfiles | `cache/profiles/` |
| Anthropic API | ⏳ Pendiente | `$ANTHROPIC_API_KEY` |
| Landing page | ✅ v2.0 activa | `/var/www/cotizacion/index.html` |
| Facebook presencia | ⏳ Pendiente | Sin cuenta activa |
| CHECKPOINT vault | ✅ Activo | `vault/CHECKPOINT.md` |

---

## SEO — ESTADO ACTUAL (2026-05-29)

| Componente | Estado | Prioridad |
|-----------|--------|-----------|
| Google Business Profile | ⏳ Sin crear/optimizar | CRÍTICA |
| Schema markup en web | ⏳ Pendiente (web no activa aún) | ALTA |
| Keywords investigadas | ✅ Base completa en `references/keyword-database.md` | — |
| Visibilidad en ChatGPT/Perplexity | ⏳ Sin medir | ALTA |
| Reseñas en Google | ⏳ Pendiente | ALTA |
| Artículos SEO publicados | ⏳ 0 publicados | MEDIA |

**Keywords más valiosas ahora mismo:**
- "agente de seguros en español Houston" — baja competencia, alta intención
- "qué son los beneficios en vida seguro" — vacío en español, alto potencial GEO
- "seguro de vida final expense Texas" — mercado hispano poco saturado

---

## REFERENCIAS RÁPIDAS

| Recurso | Archivo |
|---------|---------|
| Hooks para latinos TX | `references/hook-patterns.md` |
| Formatos de contenido | `references/content-formats.md` |
| Hashtags por categoría | `references/hashtags.md` |
| Meta Ads specs | `references/meta-ads-specs.md` |
| Template HTML base | `references/html-template-base.md` |
| Fórmulas de copy | `references/copy-formulas.md` |
| Cloudflare setup | `references/cloudflare-setup.md` |
| Checklist UX | `references/ux-checklist.md` |
| Keywords database | `references/keyword-database.md` |
| Schema templates | `references/schema-templates.md` |
| Plan GEO/AEO 30 días | `references/geo-action-plan.md` |
| Google Business guía | `references/google-business-guide.md` |
| Templates reseñas | `references/review-request.md` |

---

## HISTORIAL DE SESIONES

| Fecha | Qué se hizo |
|-------|------------|
| 2026-05-28 | Setup inicial · scraping top 10 competidores · análisis 3 perfiles · 4 skills · dashboard Kanban PWA |
| 2026-05-29 | Tendencias mercado · naming ATLAS · atlas_index · skill SEO Intelligence · keyword database · GEO/AEO plan · auditoría y corrección del sistema |
| 2026-05-29 (s3) | Hook ATLAS tipo Jarvis configurado · 14 tareas actualizadas con nuevo contexto: hashtags #beneficiosenvidausa #auditordeseguros #finalexpenseinspanish · ángulo "no estar bien asesorado" en reels · META ADS segmentado por plataforma (Facebook 50-75 / IG 35-55) |
| 2026-05-29 (s5) | Rediseño landing v2.0 con skills nuevas (H1 nuevo · perfil arriba · sección Auditor · sección Cómo Funciona · stats 500+ familias) · Servicios systemd para Flask + 2 tunnels (autoarranque al reiniciar VPS) · vault/CHECKPOINT.md · scripts/atlas-status.sh |

## ARQUITECTURA LIMPIA (post-auditoría 2026-05-29)

**Regla de carga de ATLAS:**
```
Siempre:     atlas_index.md (~1,700 tokens)
Estado:      tasks_active.json (~300 tokens)  ← NO tasks.json completo
Skill:       1 archivo según intención (~1,000-1,500 tokens)
Referencia:  1 archivo según necesidad (~1,000-1,300 tokens)
─────────────────────────────────────────────────────
Sesión típica: ~4,300-5,000 tokens  (antes era ~9,000+)
```

**Archivos eliminados/archivados:** `prompts/` (→ `_archive/`) · subdirectorios vacíos de `data/seo/` y `strategy/`
**Archivos nuevos:** `tasks_active.json` · `results.json`
