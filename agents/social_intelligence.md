# Social Intelligence — Scraping y Análisis de Competencia

**ACTIVA CUANDO** el usuario hable de: analizar un perfil de Instagram, buscar competidores, ver qué está haciendo la competencia, scraping, tendencias en redes sociales, comparar cuentas, ranking de cuentas, qué perfil analizar, o cualquier solicitud de datos de Instagram/Facebook.

---

## PASO 0 — CARGAR CONTEXTO

```bash
cat /root/social-agent/data/atlas_index.md
echo "---"
ls /root/social-agent/cache/profiles/
ls /root/social-agent/output/reports/
```

Con eso sabes qué está en cache y qué reportes ya existen. **No hacer nuevo scraping si hay datos de menos de 7 días.**

---

## COMANDOS PRINCIPALES

```bash
# Analizar un perfil (requiere INSTAGRAM_SESSION)
python3 /root/social-agent/main.py analyze @username

# Solo scraping
INSTAGRAM_SESSION="..." python3 /root/social-agent/scripts/scrape_instagram.py username 10

# Comparar perfiles
python3 /root/social-agent/main.py compare @user1 @user2

# Ver perfiles en cache
python3 /root/social-agent/main.py list
```

**Sesión de Instagram:** `export INSTAGRAM_SESSION="[valor de la cookie sessionid]"`

Cómo obtenerlo: Instagram.com → DevTools → Application → Cookies → sessionid

---

## FLUJO DE ANÁLISIS

1. Verificar cache en `atlas_index.md` → ¿hay datos recientes?
2. Si no hay → scrapear con `scrape_instagram.py`
3. Limpiar con `clean_data.py`
4. Analizar patrones (ver sección ANÁLISIS)
5. Guardar reporte en `output/reports/analisis-[username]-[fecha].md`
6. **Actualizar `atlas_index.md`** con nuevo hallazgo relevante

---

## QUÉ ANALIZAR EN CADA PERFIL

**Técnico:**
- Seguidores / posts / ratio (seguidores ÷ posts)
- Formato dominante (reels vs posts vs carruseles)
- Frecuencia de publicación

**Estratégico:**
- Posicionamiento: ¿qué promesa hace su bio?
- ¿Usa cara visible y video?
- ¿Tiene contenido de reclutamiento de agentes?
- ¿Habla español o inglés?

**Creativo:**
- Hook de los posts con más engagement
- Temas que generan comentarios
- CTAs que usa

**Señales de oportunidad:**
- Qué temas NO cubre
- Qué formatos NO usa
- Qué audiencia NO atiende

---

## FORMATO DE REPORTE (guardar siempre)

```markdown
# Análisis @[username] — [fecha]

## Datos básicos
- Seguidores: X | Posts: X | Ratio: X
- Bio: [texto]
- Idioma: Español/Inglés

## Lo que hace bien (para aprender)
- [patrón con dato concreto]

## Lo que hace mal (oportunidad)
- [error con explicación]

## Oportunidades que deja libre
- [espacio sin cubrir]

## Hooks más efectivos detectados
- "[hook exacto]" — por qué funciona
```

---

## COMPETIDORES YA ANALIZADOS

Ver `data/competitors.json` para lista completa.

Perfiles en cache: `cache/profiles/`
Reportes existentes: `output/reports/`

**No re-scrapear sin razón** — consume sesión de Instagram y tiempo.

---

## LÍMITES DE SCRAPING

- Máximo 10 posts por perfil por análisis
- Esperar 0.8-1.2 segundos entre perfiles
- Si la sesión expira: obtener nuevo `sessionid` del navegador
- Instagram puede mostrar datos parciales sin login completo

---

## REFERENCIAS

- `prompts/analyze_profile.md` — prompt para análisis con Claude API
- `prompts/detect_hooks.md` — prompt para análisis de hooks
- `prompts/market_opportunities.md` — prompt para oportunidades
- `prompts/strategic_analysis.md` — prompt para análisis estratégico
