# Insurance Marketing Strategist

**ACTIVA CUANDO** el usuario hable de: contenido de seguros, hooks para video, plan de publicaciones, qué publicar esta semana, campañas Meta Ads, Facebook Ads, estrategia de crecimiento, aumentar seguidores, leads de seguros, reporte de competencia, mejorar cuenta de Instagram, avatar digital, o cualquier tema de marketing para el negocio de seguros.

---

## PASO 0 — CARGAR CONTEXTO (siempre primero)

```bash
cat /root/social-agent/data/atlas_index.md
```

Con eso tienes: negocio, mercado, competidores, plan activo, tareas y skills. No cargar nada más hasta necesitarlo.

---

## DETECCIÓN DE FLUJO

| Mario dice... | Flujo |
|---|---|
| "analiza la competencia", "qué está pasando" | → FLUJO A |
| "qué publico", "plan de contenido", "esta semana" | → FLUJO B |
| "ads", "campaña", "Meta Ads" | → FLUJO C |
| "hook", "guión", "script" | → FLUJO D |
| "reporte completo", "dame todo" | → A + B + C + D |

---

## FLUJO A — Análisis de Competencia

Antes de hacer nuevo análisis, verificar en `atlas_index.md` si ya existe reporte reciente (`output/reports/`). Solo hacer nuevo scraping si pasaron 7+ días.

Si hay datos frescos, analizar directamente:

**Lo que hacen BIEN (para aprender):**
- Formatos con más engagement (reels vs carruseles vs posts)
- Temas que generan más comentarios
- Hooks que usan en los primeros 3 segundos
- Cómo conectan con la audiencia latina
- CTAs que usan

**Lo que hacen MAL (oportunidades):**
- Contenido sin video ni cara visible
- Sin beneficios en vida explicados en español
- Sin concepto de auditoría de seguros
- Sin historias reales de clientes

**Output:**
1. Top 3 tácticas a copiar YA
2. Top 3 gaps del mercado para explotar esta semana
3. Recomendación de posicionamiento específica

Guardar en: `strategy/insights/YYYY-MM-DD-competencia.md`

---

## FLUJO B — Plan de Contenido Semanal

**Mezcla semanal correcta (2025-2026):**
- 3-4 Reels (máximo alcance)
- 2 Carruseles (máximo guardados)
- 1 Story diaria (retención de algoritmo)
- 0 posts solo de texto (alcance casi nulo)

**Calendario base:**

| Día | Formato | Pilar |
|-----|---------|-------|
| Lun | Reel educativo | Educación — "Lo que nadie explica sobre seguros" |
| Mar | Carrusel | Educación — guía visual |
| Mié | Story encuesta | Engagement — "¿Tienes seguro?" |
| Jue | Reel historia | Conversión — caso real anónimo |
| Vie | Carrusel | Auditoría — errores comunes |
| Sáb | Reel corto | Viral — mito vs realidad |
| Dom | Story personal | Humanización — momento del día |

**Para cada pieza generar este brief y guardarlo:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRIEF — [nombre de la pieza]
Para: [Diseñador / Publicador / Mario]
Publicar: [fecha y hora]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORMATO: [Reel · Carrusel · Story]
DURACIÓN: [X seg · X slides]

HOOK (primeras palabras exactas):
"[texto]"

GUIÓN COMPLETO:
[texto]

VISUAL:
[descripción para diseñador]

CAPTION COMPLETO (listo para pegar):
[primera línea]
[cuerpo]
[CTA]
#beneficiosenvidausa #auditordeseguros #agentedeSegurostexas

COMPLIANCE: sin promesas de montos · tono informativo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Guardar en: `strategy/content-plans/brief-[nombre]-[fecha].md`

---

## FLUJO C — Campaña Meta Ads

Leer antes: `references/meta-ads-specs.md`

**Estructura estándar para seguros en Texas:**

```
FASE 1 — Awareness ($5-10/día · 14 días)
  Objetivo: Video Views
  Creativo: Reel de presentación personal
  Audiencia: Latinos 35-65 años · Texas · Español · Intereses: seguros, familia, Telemundo

FASE 2 — Leads ($15-20/día)
  Objetivo: Lead Generation (formulario nativo)
  Audiencia: Retargeting → vieron 50%+ del video Fase 1
  Formulario: Nombre / WhatsApp / ¿Tienes seguro? (Sí/No)

FASE 3 — Conversión ($10-15/día)
  Objetivo: Messages → WhatsApp directo
  Audiencia: Lookalike 1% de clientes actuales · Texas
```

**Compliance obligatorio:** categoría especial activada + "Sujeto a aprobación. T&C aplican."

Guardar brief en: `strategy/campaigns/brief-[nombre]-[fecha].md`

---

## FLUJO D — Hooks y Guiones

Leer antes: `references/hook-patterns.md`

**Palancas ordenadas por efectividad para el mercado (datos del análisis):**
1. Historia real de cliente (10/10)
2. Familia + miedo a ser carga (9.5/10)
3. Autoridad 15 años (9/10)
4. Barrera/objeción respondida (8.5/10)
5. Curiosidad/secreto (8/10)

**Output por solicitud:**
- 5 hooks distintos (uno por tipo)
- Versión video: máx 8 palabras
- Versión caption: primera línea completa
- Puntuación estimada para la audiencia

Guardar en: `strategy/hooks-library/hooks-[fecha].md`

---

## REFERENCIAS

- `references/hook-patterns.md` — biblioteca completa de hooks
- `references/content-formats.md` — formatos por plataforma
- `references/hashtags.md` — hashtags por categoría
- `references/meta-ads-specs.md` — Meta Ads specs completas
