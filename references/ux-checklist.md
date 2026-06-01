# Checklist de Conversión — Antes de Publicar
**Revisar cada punto antes de hacer la landing pública**

---

## ESTRUCTURA Y CONTENIDO

- [ ] El CTA principal es visible sin hacer scroll en móvil
- [ ] Hay un solo CTA primario por sección (no dos botones compitiendo)
- [ ] El headline dice qué obtienes, no qué eres tú
- [ ] El subheadline especifica para quién es y en dónde
- [ ] Hay un reductor de fricción debajo del CTA ("sin compromiso", "en español")
- [ ] El formulario tiene máximo 4 campos
- [ ] Los testimonios son específicos (nombre, ciudad, resultado concreto)
- [ ] El FAQ responde las 3-5 objeciones más comunes del nicho
- [ ] El footer tiene teléfono, WhatsApp e Instagram visibles

## DISEÑO MÓVIL

- [ ] Texto mínimo 16px en móvil
- [ ] Botones mínimo 52px de alto
- [ ] Espacio entre elementos clickeables mínimo 8px
- [ ] No hay texto sobre imágenes sin contraste suficiente
- [ ] Las imágenes no deforman ni se cortan en móvil
- [ ] El formulario es fácil de llenar con el teclado móvil (tipo tel, type email)
- [ ] El botón de submit está visible sin tener que hacer scroll dentro del formulario

## VELOCIDAD

- [ ] Imágenes en formato WebP o JPG comprimido (máx 200KB por imagen)
- [ ] Google Fonts con `display=swap` para no bloquear render
- [ ] Sin librerías JS innecesarias (no jQuery si no se usa)
- [ ] CSS y JS minificados en producción

## CONVERSIÓN

- [ ] El botón flotante de WhatsApp está activo y con mensaje pre-llenado
- [ ] El número de teléfono es clickeable (`<a href="tel:...">`)
- [ ] El WhatsApp abre en app (`wa.me/[número]`)
- [ ] El mensaje pre-llenado de WhatsApp es específico y amable
- [ ] El CTA usa verbo de acción ("Quiero", "Cotizar", "Hablar", "Agendar")
- [ ] Hay urgencia o garantía en el CTA final

## COMPLIANCE (SEGUROS)

- [ ] Incluye "Sujeto a aprobación" en footer o cerca del formulario
- [ ] Incluye "Términos y condiciones aplican"
- [ ] No dice "garantizado" ni "100% aprobado" en ningún lugar
- [ ] No promete montos específicos sin disclaimer

## TÉCNICO

- [ ] La página carga sin errores en consola del navegador
- [ ] El formulario envía correctamente (o tiene acción configurada)
- [ ] El favicon está configurado
- [ ] Las meta tags OG están completas (para compartir en redes)
- [ ] La página se ve bien en Chrome mobile, Safari iOS y Chrome Android
- [ ] nginx/servidor está corriendo y no da error 502

## POST-PUBLICACIÓN

- [ ] Probado desde el teléfono del usuario (no solo en desktop)
- [ ] Probado desde red móvil 4G (no solo WiFi)
- [ ] URL externa accesible y compartida con el equipo
- [ ] Briefing guardado en `brand/briefing.md`
- [ ] Task actualizada en `data/tasks.json`
