# Email Marketing — Secuencias de Nurturing para Leads

**ACTIVA CUANDO** el usuario hable de: emails, correos a leads, secuencia de emails, automatización de correos, follow-up por email, newsletter, drip campaign, lista de emails, GoHighLevel, Mailchimp, nutrir leads, o cualquier tema de comunicación por correo electrónico con prospectos.

---

## PASO 0 — CARGAR CONTEXTO

```bash
cat /root/social-agent/data/atlas_index.md
```

Con eso tienes: estado del funnel, cuántos leads hay, de dónde vienen, y qué secuencias existen. No cargar nada más hasta necesitarlo.

---

## DETECCIÓN DE FLUJO

| Mario dice... | Flujo |
|---|---|
| "qué les mando a los leads", "correos de seguimiento" | → FLUJO A |
| "secuencia de bienvenida", "primer email" | → FLUJO B |
| "leads que no contestan", "reactivar" | → FLUJO C |
| "newsletter", "lista mensual", "mantener contacto" | → FLUJO D |
| "automatizar", "CRM", "GoHighLevel" | → FLUJO E |

---

## FLUJO A — Diagnóstico Rápido

Antes de escribir emails, verificar:

1. ¿De dónde vienen los leads? (landing page, Meta Ads, referidos, Instagram DM)
2. ¿Qué información se capturó? (nombre, teléfono, email, ¿tienen seguro?)
3. ¿Cuánto tiempo llevan sin respuesta?
4. ¿Hay CRM activo? (GoHighLevel, Mailchimp, otro)

Si no hay emails capturados de los leads → ir a FLUJO E para integrar captura de email en el formulario de landing.

---

## FLUJO B — Secuencia de Bienvenida (Leads Nuevos)

Para leads que acaban de entrar al funnel desde la landing page o Meta Ads.

**Secuencia estándar: 5 emails en 7 días**

```
EMAIL 1 — Inmediato (dentro de 5 minutos de registrarse)
ASUNTO: "Hola [Nombre], tu cotización está lista 🇲🇽"
OBJETIVO: Confirmar que recibieron el lead + primera impresión cálida
CONTENIDO:
- Saludo personal con nombre
- Confirmar que Mario los va a contactar pronto
- Breve presentación de Mario (15 años, Texas, español)
- WhatsApp directo para que ellos puedan iniciar: wa.me/18888561999
- 1 dato de valor: "El 54% de familias latinas en USA no tiene seguro"

EMAIL 2 — Día 1 (24 horas después)
ASUNTO: "Una pregunta importante para tu familia, [Nombre]"
OBJETIVO: Activar la palanca emocional, mantener el interés
CONTENIDO:
- Pregunta directa: "¿Qué pasaría con tu familia si hoy no puedes volver a casa?"
- 3 consecuencias de no tener seguro (concretas, sin drama excesivo)
- Diferenciador: "Yo no solo vendo seguros — soy tu auditor"
- CTA: "Responde este correo con tus preguntas o escríbeme al WhatsApp"

EMAIL 3 — Día 3
ASUNTO: "Lo que nadie te explicó sobre los beneficios en vida"
OBJETIVO: Educar + diferenciar a Mario de otros agentes
CONTENIDO:
- Explicar beneficios en vida en términos simples (se cobra en vida, no solo al morir)
- Historia corta anónima de cliente que usó su seguro en una emergencia médica
- Por qué Mario es "auditor" y no solo vendedor
- CTA: "¿Quieres saber si tu seguro actual tiene estos beneficios?"

EMAIL 4 — Día 5
ASUNTO: "Respuesta a la pregunta más común"
OBJETIVO: Eliminar la objeción más frecuente
CONTENIDO:
- Objeción #1: "No califico porque soy trabajador independiente"
- Respuesta directa: sí califican, explicar cómo
- Objeción #2: "Es muy caro"
- Respuesta: rango de precio real vs. costo de NO tener seguro
- CTA directo: "Agenda tu consulta de 15 minutos — gratis y en español"

EMAIL 5 — Día 7
ASUNTO: "Última nota de Mario antes de cerrar tu expediente 📋"
OBJETIVO: Urgencia suave + reactivación final
CONTENIDO:
- Reconocer que han estado ocupados (sin culpar)
- "Voy a cerrar tu expediente si no sé de ti en 48 horas"
- Recordar el valor de lo que perdería: "Tu familia sin protección"
- CTA final con opciones múltiples: WhatsApp, email, llamada, DM Instagram
```

**Output:** Guardar secuencia en `strategy/email-sequences/bienvenida-leads.md`

---

## FLUJO C — Reactivación de Leads Fríos

Para leads que no respondieron en 14+ días.

```
EMAIL DE REACTIVACIÓN — Asunto: "¿Sigo siendo tu agente, [Nombre]?"

ESTRUCTURA:
- Reconocer el silencio sin culpar: "Sé que estás ocupado/a..."
- Recordar por qué se registraron (si se sabe el origen)
- 1 nuevo dato de valor que no habían recibido antes
- Urgencia real: "Cada año que pasa, el costo del seguro aumenta"
- CTA muy simple: "Solo responde SÍ si todavía quieres información"

SEGUIMIENTO SI NO RESPONDEN AL EMAIL:
→ Pasar a WhatsApp follow-up (ver skill whatsapp_followup.md)
→ Si tampoco responden al WhatsApp → marcar como inactivo por 90 días
→ A los 90 días: enviar 1 email de "temporada" (ej: inicio de año, mes de la familia)
```

---

## FLUJO D — Newsletter Mensual

Para mantener el contacto con leads y clientes que no están listos aún.

**Estructura del newsletter mensual:**

```
ASUNTO: "💬 Noticias de Mario — [Mes] [Año]"

SECCIONES (en orden):
1. Nota personal (3-4 líneas): algo que pasó este mes, humanización
2. Consejo del mes (1 tip de seguros, práctico y en español)
3. Historia del mes (caso real anónimo o testimonio)
4. Novedad del sector (cambio en regulaciones TX, nuevo beneficio disponible)
5. Recordatorio de CTA: "¿Aún no tienes tu cotización?"
6. Dato sorprendente: estadística del mes

FRECUENCIA: 1 vez al mes, mismo día (ej: primer martes)
LONGITUD: Máximo 300 palabras + imágenes
TONO: Como carta de vecino de confianza, no boletín corporativo
```

---

## FLUJO E — Integración con CRM

Si Mario usa GoHighLevel (GHL) o está considerándolo:

**Configuración de automatización básica:**

```
Trigger 1: Nuevo lead desde landing → Secuencia bienvenida (Flujo B)
Trigger 2: Lead no abre emails en 7 días → Secuencia reactivación (Flujo C)
Trigger 3: Lead responde → Notificación a Mario por WhatsApp
Trigger 4: Cliente cierra póliza → Agregar a lista "clientes" + newsletter mensual

Pipeline en CRM:
Nuevo lead → Contactado → En proceso → Cerrado/Póliza activa | Sin interés
```

**Si NO hay CRM:**
→ Usar plantillas de email en Gmail con etiquetas por estado del lead
→ Hoja de seguimiento en `data/leads/leads-activos.md`

---

## REGLAS DE COMPLIANCE PARA EMAILS DE SEGUROS

1. **No prometer montos específicos** sin agregar "sujeto a aprobación y calificación"
2. **No spam** — todo lead debe haberse registrado voluntariamente
3. **Dar opción de baja** en cada email (requerido por CAN-SPAM)
4. **No comprar listas** de emails — solo leads propios
5. **Identificarse siempre** como agente de seguros con licencia en Texas

---

## MÉTRICAS CLAVE DE EMAIL MARKETING

| Métrica | Objetivo | Alerta (por debajo de) |
|---|---|---|
| Tasa de apertura | > 35% | < 20% |
| Tasa de clic (CTR) | > 5% | < 2% |
| Tasa de respuesta | > 10% | < 3% |
| Tasa de baja | < 1% | > 2% (revisar relevancia) |

---

## REFERENCIAS

- `references/copy-formulas.md` — fórmulas de copy para emails
- `strategy/email-sequences/` — secuencias guardadas
- `data/leads/` — base de leads activos
