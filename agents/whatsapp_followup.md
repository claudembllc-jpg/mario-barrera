# WhatsApp Follow-up — Guiones de Seguimiento para Leads

**ACTIVA CUANDO** el usuario hable de: seguimiento por WhatsApp, qué decirle a un lead, guión de WhatsApp, cómo contactar a un prospecto, qué mensaje mandar, cómo cerrar por WhatsApp, cómo reactivar un lead frío, script de WhatsApp, mensajes de seguimiento, o cualquier comunicación 1 a 1 con prospectos o clientes por WhatsApp.

**CONTEXTO CRÍTICO:** WhatsApp es el canal de cierre #1 para el mercado latino de 50-85 años en Texas. El email y el teléfono son secundarios. Una conversación bien llevada por WhatsApp convierte 3-5x más que un formulario solo.

---

## PASO 0 — CARGAR CONTEXTO

```bash
cat /root/social-agent/data/atlas_index.md
```

Verificar: ¿cuántos leads hay activos? ¿cuánto tiempo llevan sin respuesta? ¿de dónde vinieron (Instagram, Meta Ads, referido)?

---

## DETECCIÓN DE FLUJO

| Mario dice... | Flujo |
|---|---|
| "me llegó un lead nuevo", "me escribió alguien" | → FLUJO A |
| "no me contesta", "lleva días sin responder" | → FLUJO B |
| "quiero cerrar esta semana", "follow-up de cierre" | → FLUJO C |
| "ya firmó", "ya es cliente" | → FLUJO D |
| "referido", "me mandaron a alguien" | → FLUJO E |
| "cliente que quiere cancelar" | → FLUJO F |

---

## FLUJO A — Primer Contacto con Lead Nuevo

**Regla de oro: contactar en los primeros 5 minutos. Cada hora que pasa, el interés cae 50%.**

### Mensaje 1 — Bienvenida inmediata (enviar en < 5 min):

```
Hola [Nombre] 👋

Soy Mario Barrera, tu agente de seguros en Texas.

Vi que te interesaste en protección para tu familia — me da mucho gusto.

Para darte la mejor opción, necesito hacerte 2 preguntas rápidas:

1. ¿Tienes ya algún seguro de vida?
2. ¿Para quién sería la protección — para ti, para tus papás, o para la familia completa?

Respóndeme cuando puedas y te armo una cotización gratis y en español 🙏

— Mario
```

### Si no responde en 24 horas — Mensaje 2:

```
Hola [Nombre], Mario Barrera de nuevo.

Quería asegurarme de que recibiste mi mensaje de ayer.

Sé que estás ocupado/a — lo entiendo completamente.

Solo necesito 10 minutos de tu tiempo para darte información que puede proteger a tu familia para siempre.

¿Cuándo tienes un momento esta semana? Te puedo llamar o seguimos por aquí.

— Mario 📞
```

### Si no responde en 48 horas — Mensaje 3 (último del primer contacto):

```
[Nombre], último mensaje de mi parte 🙏

Si ya no te interesa, no hay problema — solo dime y no te molesto más.

Pero si sí quieres proteger a tu familia, estoy aquí.

Solo manda un "SÍ" y coordinamos cuando quieras.

— Mario
```

---

## FLUJO B — Reactivación de Lead Frío (7+ días sin respuesta)

### Táctica del "nuevo motivo":

Cada mensaje de reactivación debe traer algo nuevo (dato, historia, novedad). No repetir lo mismo.

```
REACTIVACIÓN 1 — Dato nuevo:
"Hola [Nombre], Mario Barrera por aquí.

Tengo algo que quiero compartirte rápido.

¿Sabías que el costo de un seguro de vida aumenta un 8-10% cada año que esperas?

A los 55 años pagas casi el doble que a los 45.

Si en algún momento quieres revisar tus opciones, aquí estoy.

— Mario"

REACTIVACIÓN 2 — Historia que conecta (14 días sin respuesta):
"Hola [Nombre], soy Mario.

Esta semana me pasó algo que no puedo dejar de compartir.

Una señora de Houston me llamó llorando porque su esposo falleció de repente y no tenía seguro. La familia tuvo que rifar una quinceanera para pagar el funeral.

No quiero que algo así le pase a nadie.

¿Podemos hablar 10 minutos esta semana?

— Mario"

REACTIVACIÓN 3 — Cierre suave (21 días sin respuesta):
"[Nombre], voy a cerrar tu expediente si no sé de ti esta semana.

No porque no quiera ayudarte — sino porque quiero enfocarme en las personas que sí quieren proteger a su familia.

Si cambias de opinión, aquí estaré.

— Mario"
```

---

## FLUJO C — Seguimiento de Cierre (Lead que Mostró Interés)

Para leads que respondieron, pidieron información, pero no han firmado.

### Estructura de seguimiento de cierre:

```
DÍA 1 (después de llamada/cotización):
"Hola [Nombre], qué gusto hablar contigo hoy.

Te resumo lo que vimos:
✓ Cobertura: [descripción general, sin montos específicos sin previa calificación]
✓ Beneficio en vida incluido: sí
✓ Sin examen médico requerido

¿Tienes alguna pregunta que no te respondí?"

DÍA 3 (si no hay respuesta):
"[Nombre], solo quería saber si tuviste oportunidad de pensar en lo que platicamos.

No tienes que decidir hoy — pero hay algo que quiero que sepas:

Mientras esperamos, tu prima podría cambiar si hay un cambio en tu salud.

¿Cuál es tu mayor duda en este momento?"

DÍA 5 (urgencia real):
"[Nombre], la cotización que te armé es válida hasta el [fecha].

Después de esa fecha, tengo que recalcular según la edad actualizada.

No quiero que pierdas esta oportunidad.

¿Hay algo que te está deteniendo? Me dices y lo resolvemos juntos."

DÍA 7 (última oportunidad):
"[Nombre], esta es mi última nota sobre tu cotización.

Si quieres seguir adelante, dime HOY y lo arrancamos esta semana.

Si no es el momento, lo entiendo completamente — solo dímelo y te dejo en paz.

— Mario"
```

---

## FLUJO D — Onboarding de Cliente Nuevo

Cuando alguien acaba de firmar la póliza. El servicio post-venta construye referidos.

```
MENSAJE INMEDIATO AL FIRMAR:
"¡Felicidades [Nombre]! 🎉

Tu familia está protegida.

Acabo de procesar tu póliza. En los próximos días recibirás los documentos por correo.

Guarda mi número — soy tu agente para cualquier pregunta o cambio.

Una cosa importante: si alguna vez necesitas usar los beneficios en vida, llámame primero. Te ayudo con todo el proceso.

¡Gracias por confiarme la protección de tu familia!

— Mario 🙏"

MENSAJE A LOS 30 DÍAS:
"Hola [Nombre], ¿cómo están?

Solo quería saber si llegaron bien tus documentos de póliza y si tienes alguna pregunta.

Recuerda: si conoces a alguien que necesite protección para su familia, con gusto los ayudo.

Por referirme a alguien que contrata, también hay opciones de beneficios para ti.

— Mario"
```

---

## FLUJO E — Primer Contacto con Referido

Para leads que llegaron recomendados por un cliente existente.

```
MENSAJE DE PRIMER CONTACTO:
"Hola [Nombre] 👋

Soy Mario Barrera, agente de seguros en Texas.

[Nombre del referidor] me dio tu número y me dijo que podría ayudarte con protección para tu familia.

Primero que nada — gracias por la confianza. [Nombre del referidor] es una persona que valoro mucho como cliente.

¿Tienes 5 minutos para que me cuentes tu situación? Sin compromiso.

— Mario"
```

---

## FLUJO F — Retención de Cliente Que Quiere Cancelar

```
"[Nombre], entiendo que estás pensando en cancelar.

Antes de tomar esa decisión, ¿me permites 10 minutos para revisar tu póliza contigo?

A veces hay ajustes que se pueden hacer — cambiar cobertura, revisar precio, agregar o quitar beneficios — sin cancelar completamente.

No quiero que pierdas la cobertura que ya tienes, especialmente si ya llevas tiempo en la póliza.

¿Cuándo puedes hablar?

— Mario"
```

---

## REGLAS DE COMUNICACIÓN POR WHATSAPP

1. **Horario de mensajes:** Lunes-Viernes 8am-7pm CT · Sábado 9am-3pm CT · No contactar domingos
2. **Máximo 3 mensajes sin respuesta** antes de parar el seguimiento activo
3. **Sin presión excesiva** — cada mensaje debe aportar valor, no solo pedir una respuesta
4. **Personalizar siempre** — nunca copiar-pegar exactamente el mismo mensaje a todos
5. **Sin propuestas de montos** en texto — los números se dan en llamada o reunión
6. **Responder en < 1 hora** cuando alguien escribe — la velocidad de respuesta es el diferenciador #1

---

## SEÑALES DE COMPRA (cuándo apretar el acelerador)

- Pregunta "¿cuánto costaría?"
- Pregunta sobre el proceso de firma
- Pregunta "¿puedo agregar a mi esposo/a?"
- Responde todos los mensajes rápidamente
- Menciona una fecha o evento ("en octubre me opero")
- Dice "yo soy el que decide en mi familia"

Cuando aparecen estas señales → pasar a FLUJO C inmediatamente.

---

## REFERENCIAS

- `references/copy-formulas.md` — fórmulas de copy adaptables a WhatsApp
- `data/leads/` — seguimiento de leads activos
- `strategy/email-sequences/` — secuencias de email que se complementan con WhatsApp
