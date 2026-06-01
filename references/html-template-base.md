# Template HTML Base — Mobile-First Landing Page

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[DESCRIPCIÓN SEO 150 chars]">
  <title>[TÍTULO DE LA PÁGINA]</title>

  <!-- OG para redes sociales -->
  <meta property="og:title" content="[TÍTULO]">
  <meta property="og:description" content="[DESCRIPCIÓN]">
  <meta property="og:image" content="brand/assets/og-image.jpg">
  <meta property="og:type" content="website">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="brand/assets/favicon.png">

  <!-- Fuente Google (Inter — legible, moderna, gratis) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/main.css">
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <div class="container">
      <img src="brand/assets/logo.png" alt="[NOMBRE NEGOCIO]" class="logo" width="140" height="40">
      <!-- Sin nav en pure landing — elimina fugas -->
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <p class="trust-badge">⭐⭐⭐⭐⭐ [SOCIAL PROOF CORTO]</p>
      <h1>[RESULTADO QUE OBTIENE EL CLIENTE] sin [OBSTÁCULO O MIEDO]</h1>
      <p class="subheadline">Para [AUDIENCIA ESPECÍFICA] en [UBICACIÓN] que quiere [BENEFICIO]</p>
      <a href="#contacto" class="btn-primary">[VERBO] + [BENEFICIO] — Sin compromiso</a>
      <p class="friction-reducer">✓ Sin compromiso &nbsp;·&nbsp; ✓ Respondo en menos de 1 hora &nbsp;·&nbsp; ✓ En español</p>
    </div>
  </section>

  <!-- PROBLEMA -->
  <section class="problem">
    <div class="container">
      <h2>¿Te identificas con alguna de estas situaciones?</h2>
      <ul class="pain-list">
        <li>😟 [DOLOR 1 del cliente]</li>
        <li>😟 [DOLOR 2 del cliente]</li>
        <li>😟 [DOLOR 3 del cliente]</li>
      </ul>
      <p class="problem-bridge">Si dijiste que sí a alguna de estas, <strong>estás en el lugar correcto.</strong></p>
    </div>
  </section>

  <!-- SOLUCIÓN / BENEFICIOS -->
  <section class="solution">
    <div class="container">
      <h2>[QUÉ OFRECES — orientado al beneficio]</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <span class="benefit-icon">✅</span>
          <h3>[BENEFICIO 1]</h3>
          <p>[Descripción breve — 1 línea]</p>
        </div>
        <div class="benefit-card">
          <span class="benefit-icon">✅</span>
          <h3>[BENEFICIO 2]</h3>
          <p>[Descripción breve]</p>
        </div>
        <div class="benefit-card">
          <span class="benefit-icon">✅</span>
          <h3>[BENEFICIO 3]</h3>
          <p>[Descripción breve]</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PRUEBA SOCIAL / TESTIMONIOS -->
  <section class="proof">
    <div class="container">
      <h2>Lo que dicen nuestros clientes</h2>
      <div class="testimonials-grid">
        <div class="testimonial">
          <p>"[TESTIMONIO REAL — 2-3 oraciones específicas]"</p>
          <cite>— [Nombre], [Ciudad]</cite>
        </div>
        <div class="testimonial">
          <p>"[TESTIMONIO REAL]"</p>
          <cite>— [Nombre], [Ciudad]</cite>
        </div>
      </div>
      <!-- Números si los tienes -->
      <div class="stats-row">
        <div class="stat"><strong>[X]+</strong><span>[Métrica]</span></div>
        <div class="stat"><strong>[X]</strong><span>[Métrica]</span></div>
        <div class="stat"><strong>[X] años</strong><span>de experiencia</span></div>
      </div>
    </div>
  </section>

  <!-- CTA #2 -->
  <section class="cta-mid">
    <div class="container">
      <h2>[VARIACIÓN DEL HEADLINE DEL HERO]</h2>
      <a href="#contacto" class="btn-primary">[CTA CON VARIACIÓN]</a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="faq">
    <div class="container">
      <h2>Preguntas frecuentes</h2>
      <div class="faq-list">
        <details class="faq-item">
          <summary>[PREGUNTA / OBJECIÓN 1]</summary>
          <p>[Respuesta directa y tranquilizadora]</p>
        </details>
        <details class="faq-item">
          <summary>[PREGUNTA / OBJECIÓN 2]</summary>
          <p>[Respuesta]</p>
        </details>
        <details class="faq-item">
          <summary>[PREGUNTA / OBJECIÓN 3]</summary>
          <p>[Respuesta]</p>
        </details>
      </div>
    </div>
  </section>

  <!-- FORMULARIO / CTA FINAL -->
  <section class="contact" id="contacto">
    <div class="container">
      <h2>[HEADLINE DE CIERRE — con urgencia o garantía]</h2>
      <p class="contact-sub">[SUBHEADLINE — reducir fricción]</p>
      <form class="lead-form" action="#" method="POST">
        <input type="text" name="nombre" placeholder="Tu nombre" required>
        <input type="tel" name="whatsapp" placeholder="Tu WhatsApp" required>
        <!-- Campo de calificación opcional -->
        <select name="tiene_seguro">
          <option value="" disabled selected>¿Tienes seguro actualmente?</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
          <option value="no-se">No estoy seguro</option>
        </select>
        <button type="submit" class="btn-primary">Quiero mi cotización gratis →</button>
      </form>
      <p class="friction-reducer">✓ Sin compromiso · ✓ Te contactamos en menos de 1 hora</p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <img src="brand/assets/logo-white.png" alt="[NOMBRE]" class="logo-footer" width="120">
      <p>[NOMBRE NEGOCIO] · [CIUDAD, ESTADO]</p>
      <p>
        <a href="tel:[TELÉFONO]">[TELÉFONO]</a> ·
        <a href="https://wa.me/[NÚMERO]">WhatsApp</a> ·
        <a href="https://instagram.com/[HANDLE]">Instagram</a>
      </p>
      <p class="legal">Sujeto a aprobación. Términos y condiciones aplican. © [AÑO] [NOMBRE]</p>
    </div>
  </footer>

  <!-- BOTÓN WHATSAPP FLOTANTE -->
  <a href="https://wa.me/[NÚMERO]?text=[MENSAJE CODIFICADO]"
     class="whatsapp-float" target="_blank" aria-label="WhatsApp">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>

  <script src="js/main.js"></script>
</body>
</html>
```
