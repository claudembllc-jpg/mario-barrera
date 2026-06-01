# Web Funnel Builder — Landing Pages & Embudos en VPS

**ACTIVA CUANDO** el usuario quiera: crear landing page, embudo de ventas, página web, captación de leads, formulario de contacto, publicar algo en internet desde el VPS, dominio provisional, subir logo, integrar WhatsApp, página mobile-first, o cualquier combinación de diseño web + conversión + hosting propio.

**SIEMPRE hacer briefing antes de escribir código.**

---

## PASO 0 — CARGAR CONTEXTO + EXPLORAR SISTEMA

```bash
cat /root/social-agent/data/atlas_index.md
echo "---"
ls /var/www/ 2>/dev/null
ss -tlnp 2>/dev/null | grep -E "80|443|3000|8080"
which nginx 2>/dev/null && nginx -v 2>&1
cloudflared --version 2>/dev/null
curl -s https://ipinfo.io/ip 2>/dev/null
```

---

## PASO 1 — BRIEFING (obligatorio antes de código)

```
1. ¿Para qué es la página? (campaña ads / marca personal / producto específico)
2. ¿Objetivo principal? (llamada / WhatsApp / formulario / cita / compra)
3. ¿Número o contacto destino?
4. ¿Agenda de citas? (Calendly u otro)
5. ¿Logo/colores de marca disponibles?
6. ¿Qué ofreces en 1-2 oraciones?
7. ¿Tienes testimonios o fotos?
```

Guardar en: `/var/www/[slug]/brand/briefing.md`

---

## PASO 2 — ESTRUCTURA DE PROYECTO

```bash
PROJECT=/var/www/[slug]
mkdir -p $PROJECT/{brand/assets,css,js,img}
```

---

## DESIGN SYSTEM — Variables CSS base

```css
:root {
  --color-primary: #1B3A6B;    /* navy — seguros Mario */
  --color-primary-dark: #122850;
  --color-accent: #C9A84C;     /* gold */
  --color-text: #1a1a2e;
  --color-bg: #ffffff;
  --color-bg-soft: #f8f9fa;
  --font-main: 'Inter', system-ui, sans-serif;
  --btn-height: 52px;
  --radius-md: 12px;
  --radius-full: 9999px;
}
```

---

## ANATOMÍA DE LANDING PAGE (orden obligatorio)

```
1. HEADER     → Logo (sin nav en pure landing)
2. HERO       → Headline + sub + CTA primario + friction reducer
3. PROBLEMA   → Agitar el dolor del cliente
4. SOLUCIÓN   → Beneficios (no características)
5. PRUEBA     → Testimonios + números
6. CTA #2     → Variación del copy
7. FAQ        → 3-5 objeciones respondidas
8. CTA #3     → Con urgencia/garantía
9. FOOTER     → Contacto + legal
```

**Reglas UX no negociables:**
- CTA visible sin scroll (above the fold)
- Botones mínimo 52px de alto
- Texto mínimo 16px en móvil
- Máx 4 campos en formulario
- Sin navbar en landing de campaña
- Botón WhatsApp flotante en TODOS los proyectos

**Hero structure:**
```html
<h1>[Resultado] sin [obstáculo/miedo]</h1>
<p>Para [audiencia] en [lugar] que quiere [beneficio]</p>
<a class="btn-primary">[Verbo] + [beneficio] — Gratis</a>
<p>✓ Sin compromiso · ✓ En español · ✓ Respondo hoy</p>
```

---

## TIPOS DE EMBUDO

| Tipo | Flujo | Usar cuando |
|------|-------|------------|
| A — Lead Magnet | Landing → Formulario → Gracias | Campañas ads |
| B — Agenda Cita | Landing → Calendario → Confirmación | Consultas |
| C — WhatsApp | Landing → wa.me/[número] directo | Contacto inmediato |
| D — Producto | Landing con urgencia → Formulario | Promos |

**Mensaje WhatsApp pre-llenado para Mario:**
```
https://wa.me/18888561999?text=Hola%20Mario%2C%20quiero%20mi%20cotizaci%C3%B3n%20gratis
```

---

## PUBLICACIÓN EN VPS

**Nginx (recomendado):**
```bash
cat > /etc/nginx/sites-available/[slug] << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/[slug];
    index index.html;
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    location / { try_files $uri $uri/ /index.html; }
}
EOF
ln -sf /etc/nginx/sites-available/[slug] /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

**URL externa (Cloudflare Tunnel):**
```bash
cloudflared tunnel --url http://localhost:80
```

---

## CHECKLIST ANTES DE PUBLICAR

Ver: `references/ux-checklist.md`

---

## REFERENCIAS

- `references/html-template-base.md` — Template HTML completo
- `references/sections-library.md` — Secciones pre-construidas + CSS base
- `references/cloudflare-setup.md` — Cloudflare Tunnel + dominio permanente
- `references/ux-checklist.md` — Checklist de conversión
- `references/copy-formulas.md` — Headlines, CTAs, copy para seguros
