# SEO Intelligence — Google + Búsquedas de IA

**ACTIVA CUANDO** el usuario hable de: aparecer en Google, palabras clave, keyword research, SEO, meta tags, schema, Google My Business, aparecer en ChatGPT o Perplexity, tráfico orgánico, SEO local, posicionamiento en buscadores, cómo me encuentran en internet, o cualquier tema de visibilidad online.

**SIEMPRE explorar el sistema antes de recomendar.**

---

## PASO 0 — CARGAR CONTEXTO + EXPLORAR

```bash
cat /root/social-agent/data/atlas_index.md
echo "---"
ls /var/www/ 2>/dev/null
find /var/www -name "index.html" 2>/dev/null | head -5
ls /root/social-agent/data/seo/ 2>/dev/null
```

---

## LAS 3 CAPAS (trabajar las tres en paralelo)

```
CAPA 1 — SEO TRADICIONAL  → Posiciones orgánicas en Google
CAPA 2 — SEO LOCAL        → Google Maps + búsquedas "[servicio] + [ciudad]"
CAPA 3 — GEO/AEO          → ChatGPT · Perplexity · Google AI · Claude
```

---

## FLUJO A — KEYWORDS

Base completa ya disponible: `references/keyword-database.md`

**Top keywords de mayor oportunidad ahora mismo (baja competencia + alta intención):**
- `agente de seguros en español Houston` — transaccional, baja competencia
- `qué son los beneficios en vida seguro` — informacional, vacío en español, alto GEO
- `seguro de vida final expense Texas` — transaccional, mercado hispano poco saturado
- `auditor de seguros Texas` — posicionamiento único de Mario, cero competencia

Para nueva investigación: documentar en `data/seo/keywords/research-YYYY-MM-DD.md`

---

## FLUJO B — SEO ON-PAGE

Para cada landing page activa, agregar al `<head>`:

```html
<title>Seguro de Vida en Houston TX | Mario Barrera — Agente en Español</title>
<meta name="description" content="Agente de seguros de vida en Houston que habla español. Cotización gratis de seguro de vida y final expense para familias latinas en Texas. Sin compromiso.">
<link rel="canonical" href="https://[DOMINIO]/"/>
<meta name="geo.region" content="US-TX">
<meta name="geo.placename" content="Houston, Texas">
<meta property="og:locale" content="es_US">
```

Schema JSON-LD completo: `references/schema-templates.md`

**Estructura H1/H2 obligatoria:**
```
H1 (una sola): "Agente de Seguros de Vida en Houston que Habla Español"
H2: "¿Por qué las familias latinas en Texas necesitan un seguro de vida?"
H2: "Seguros de Vida y Final Expense — ¿Cuál es la diferencia?"
H2: "Preguntas frecuentes sobre seguros de vida en español"
```

Guardar parche en: `data/seo/patches/[proyecto]-seo.html`

---

## FLUJO C — SEO LOCAL (Google Maps)

Guía completa: `references/google-business-guide.md`

**Estado actual:** Google Business sin crear/optimizar — prioridad crítica.

**Checklist mínimo:**
- [ ] Nombre: `Mario Barrera — Agente de Seguros de Vida | Texas`
- [ ] Categoría: `Insurance agency` + `Life insurance agency`
- [ ] Descripción 750 chars con: "seguros de vida", "español", "Houston", "familias latinas", "final expense", "beneficios en vida"
- [ ] Fotos: logo + foto profesional + 5 fotos de trabajo
- [ ] 1 publicación semanal con keywords
- [ ] Meta: 10+ reseñas 4.5+ estrellas

Templates de solicitud de reseñas: `references/review-request.md`

---

## FLUJO D — GEO/AEO (Aparecer en IAs)

Plan completo de 30 días: `references/geo-action-plan.md`

**Reglas esenciales de escritura para ser citado por IA:**

1. **Respuesta directa al inicio:**
```
✅ "Un seguro final expense en Texas cuesta $30-$100/mes para personas de 50-80 años."
```

2. **Datos con fuente** (aumentan 35% las citas):
```
✅ "El 54% de los hispanos en USA no tiene seguro de vida (LIMRA, 2024)"
✅ "Funeral promedio en Texas: $9,000-$12,000 (NFDA, 2024)"
```

3. **E-E-A-T en cada página:**
```
✅ Número de licencia de agente en Texas
✅ "15 años de experiencia"
✅ Testimonios con nombre y ciudad
```

**Test de visibilidad IA** (cada 2 semanas — buscar en ChatGPT y Perplexity):
```
"agente de seguros de vida en español en Houston Texas"
"qué son los beneficios en vida seguro de vida"
"cuánto cuesta seguro de vida final expense Texas"
```

Guardar resultados en: `data/seo/geo/visibility-YYYY-MM-DD.md`

---

## FLUJO E — CONTENIDO SEO

**Artículos prioritarios (crear en orden):**
1. "¿Cuánto Cuesta un Seguro de Vida Final Expense en Texas? — Guía 2025"
2. "¿Qué son los Beneficios en Vida? — Explicado para Familias Latinas"
3. "Agente de Seguros en Houston que Habla Español — Mario Barrera"
4. "Diferencia entre Seguro del Trabajo y Seguro Personal en Texas"
5. "¿Se Puede Tener Seguro de Vida sin SSN en Texas?"

**Estructura de cada artículo:**
- H1: responde la pregunta exacta (keyword long tail)
- Párrafo 1: respuesta directa (Answer-First para GEO)
- Datos con fuente
- H2 por subtemas
- FAQ section (mínimo 3 preguntas)
- CTA final

Guardar en: `data/seo/content/articles/`

---

## REFERENCIAS

- `references/keyword-database.md` — base completa de keywords
- `references/schema-templates.md` — schema JSON-LD listo para copiar
- `references/geo-action-plan.md` — plan 30 días para aparecer en IAs
- `references/google-business-guide.md` — guía Google Business Profile
- `references/review-request.md` — templates solicitud de reseñas
