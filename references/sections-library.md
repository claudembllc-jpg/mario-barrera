# Librería de Secciones — Copiar y Pegar
**Secciones HTML + CSS pre-construidas para landing pages**

---

## SECCIÓN: TRUST BAR (barra de confianza)

```html
<div class="trust-bar">
  <span>✓ 15 años de experiencia</span>
  <span>✓ +500 familias protegidas</span>
  <span>✓ Atención en español</span>
  <span>✓ Houston · Dallas · Austin</span>
</div>

<style>
.trust-bar {
  background: var(--color-primary);
  color: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
```

---

## SECCIÓN: HERO CON GRADIENTE

```html
<section class="hero">
  <div class="container">
    <p class="badge">🛡️ Agente certificado en Texas</p>
    <h1>Protege a tu familia hoy<br>sin examen médico</h1>
    <p class="sub">Para familias latinas en Texas que quieren tranquilidad financiera desde $30/mes</p>
    <a href="#contacto" class="btn-primary">Quiero mi cotización gratis →</a>
    <p class="no-risk">✓ Sin compromiso · ✓ En español · ✓ Respondo hoy</p>
  </div>
</section>

<style>
.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  padding: 4rem 1.5rem;
  text-align: center;
}
.hero h1 { font-size: clamp(1.8rem, 5vw, 3rem); font-weight: 800; margin: 1rem 0; line-height: 1.2; }
.hero .sub { font-size: 1.1rem; opacity: 0.9; max-width: 500px; margin: 0 auto 2rem; }
.badge { background: rgba(255,255,255,0.2); display: inline-block; padding: 0.4rem 1rem; border-radius: 99px; font-size: 0.875rem; }
.no-risk { font-size: 0.8rem; opacity: 0.75; margin-top: 1rem; }
</style>
```

---

## SECCIÓN: BENEFICIOS EN CARDS

```html
<section class="benefits">
  <div class="container">
    <h2>¿Por qué elegir a Mario Barrera?</h2>
    <div class="cards">
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>Beneficios en vida</h3>
        <p>Accede a tu dinero si sufres una enfermedad grave — sin esperar al fallecimiento</p>
      </div>
      <div class="card">
        <div class="card-icon">💬</div>
        <h3>Todo en español</h3>
        <p>Sin letra pequeña complicada. Te explico cada detalle en tu idioma</p>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Aprobación rápida</h3>
        <p>Sin examen médico completo. Cobertura activa en días, no semanas</p>
      </div>
      <div class="card">
        <div class="card-icon">🎯</div>
        <h3>15 años de experiencia</h3>
        <p>Cientos de familias latinas en Texas confían en Mario para proteger su futuro</p>
      </div>
    </div>
  </div>
</section>

<style>
.benefits { padding: 3rem 1.5rem; background: var(--color-bg-soft); }
.benefits h2 { text-align: center; font-size: clamp(1.4rem, 4vw, 2rem); margin-bottom: 2rem; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
.card { background: white; border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm); }
.card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
.card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--color-primary); }
.card p { font-size: 0.9rem; color: var(--color-text-light); line-height: 1.5; }
</style>
```

---

## SECCIÓN: TESTIMONIO DESTACADO

```html
<section class="testimonial-featured">
  <div class="container">
    <blockquote>
      <p>"Yo pensaba que por ser trabajadora independiente no podía tener seguro. Mario me explicó todo en español, sin presiones. En 15 minutos ya tenía mi cobertura. Ahora duermo tranquila."</p>
      <cite>
        <strong>Rosa M.</strong>
        <span>Limpiadora de casas · Houston, TX</span>
      </cite>
    </blockquote>
  </div>
</section>

<style>
.testimonial-featured { padding: 3rem 1.5rem; background: var(--color-primary); color: white; text-align: center; }
.testimonial-featured blockquote { max-width: 600px; margin: 0 auto; }
.testimonial-featured p { font-size: 1.2rem; font-style: italic; line-height: 1.6; margin-bottom: 1.5rem; }
.testimonial-featured cite { font-style: normal; }
.testimonial-featured cite strong { display: block; font-size: 1rem; font-weight: 700; }
.testimonial-featured cite span { font-size: 0.85rem; opacity: 0.8; }
</style>
```

---

## SECCIÓN: FORMULARIO DE LEAD

```html
<section class="lead-section" id="contacto">
  <div class="container">
    <h2>Cotización gratis — Sin compromiso</h2>
    <p class="form-sub">Te contactamos en menos de 1 hora. En español.</p>
    <form class="form" id="leadForm">
      <div class="form-group">
        <label for="nombre">Tu nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Juan García" required>
      </div>
      <div class="form-group">
        <label for="whatsapp">Tu WhatsApp</label>
        <input type="tel" id="whatsapp" name="whatsapp" placeholder="+1 (713) 000-0000" required>
      </div>
      <div class="form-group">
        <label for="situacion">¿Tienes seguro actualmente?</label>
        <select id="situacion" name="situacion">
          <option value="" disabled selected>Selecciona una opción</option>
          <option value="no">No tengo seguro</option>
          <option value="si-quiero-revisar">Sí, pero quiero revisarlo</option>
          <option value="no-se">No estoy seguro</option>
        </select>
      </div>
      <button type="submit" class="btn-primary btn-full">
        Quiero mi cotización gratis →
      </button>
      <p class="form-disclaimer">✓ Sin compromiso · ✓ Confidencial · ✓ En español</p>
    </form>
  </div>
</section>

<style>
.lead-section { padding: 3rem 1.5rem; }
.lead-section h2 { text-align: center; font-size: clamp(1.4rem, 4vw, 2rem); margin-bottom: 0.5rem; }
.form-sub { text-align: center; color: var(--color-text-light); margin-bottom: 2rem; }
.form { max-width: 480px; margin: 0 auto; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.4rem; }
.form-group input,
.form-group select {
  width: 100%; padding: 0.85rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 1rem; font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;
}
.form-group input:focus,
.form-group select:focus { outline: none; border-color: var(--color-primary); }
.btn-full { width: 100%; margin-top: 0.5rem; }
.form-disclaimer { text-align: center; font-size: 0.8rem; color: var(--color-text-light); margin-top: 0.75rem; }
</style>
```

---

## CSS GLOBAL (main.css base)

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-main);
  font-size: var(--size-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* Botón primario */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--btn-height);
  padding: 0 2rem;
  background: var(--color-primary);
  color: white;
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  font-family: inherit;
  border: none;
  border-radius: var(--btn-radius);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
}
.btn-primary:active { transform: translateY(0); }

/* Header */
.header {
  padding: 1rem 0;
  background: white;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header .container { display: flex; align-items: center; justify-content: space-between; }
.logo { height: 40px; width: auto; }

/* Footer */
.footer {
  background: var(--color-text);
  color: rgba(255,255,255,0.8);
  text-align: center;
  padding: 2.5rem 1.5rem;
  font-size: 0.85rem;
}
.footer a { color: rgba(255,255,255,0.7); }
.footer .logo-footer { margin-bottom: 1rem; filter: brightness(0) invert(1); }
.footer p { margin: 0.35rem 0; }
.legal { font-size: 0.75rem; opacity: 0.6; margin-top: 1rem !important; }

/* Responsive helpers */
@media (max-width: 640px) {
  .hide-mobile { display: none; }
}
@media (min-width: 641px) {
  .hide-desktop { display: none; }
}
```
