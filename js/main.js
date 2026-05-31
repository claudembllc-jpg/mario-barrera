'use strict';

/* ── Scroll animations (IntersectionObserver) ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

/* ── Header scroll effect ── */
const header = document.getElementById('header');
if (header) {
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.transform = y > lastY && y > 80 ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, { passive: true });
}

/* ── Smooth scroll para anclas internas ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── FAQ: cerrar otros al abrir uno ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
    }
  });
});

/* ── Formulario de leads ── */
const form   = document.getElementById('leadForm');
const submit = document.getElementById('submitBtn');

if (form) {
  /* Formateo automático del teléfono */
  const telInput = document.getElementById('whatsapp');
  if (telInput) {
    telInput.addEventListener('input', () => {
      let v = telInput.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 7) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
      else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
      else if (v.length >= 1) v = `(${v}`;
      telInput.value = v;
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (submit) {
      submit.classList.add('loading');
      submit.disabled = true;
    }

    const nombre      = document.getElementById('nombre').value.trim();
    const whatsapp    = document.getElementById('whatsapp').value.trim();
    const ciudad      = document.getElementById('ciudad').value;
    const tieneSeguro = document.getElementById('tiene_seguro').value;

    const ciudadLabel = { houston:'Houston', dallas:'Dallas', austin:'Austin', otra:'Texas' }[ciudad] || 'Texas';
    const seguroLabel = {
      no:         'No tengo seguro de vida.',
      si_trabajo: 'Tengo el seguro del trabajo.',
      si_propio:  'Tengo un seguro propio.',
      no_se:      'No sé bien qué cobertura tengo.'
    }[tieneSeguro] || '';

    const msg = `Hola Mario, soy ${nombre} de ${ciudadLabel}. Vi tu página y me interesa una cotización gratuita. ${seguroLabel} ¿Cuándo podemos hablar?`.trim();

    /* Guardar en localStorage */
    try {
      const leads = JSON.parse(localStorage.getItem('mb_leads') || '[]');
      leads.push({ nombre, whatsapp, ciudad, tieneSeguro, ts: new Date().toISOString() });
      localStorage.setItem('mb_leads', JSON.stringify(leads));
    } catch (_) {}

    /* Redirigir a página de gracias y abrir WhatsApp */
    setTimeout(() => {
      window.open(`https://wa.me/18888561999?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      window.location.href = 'gracias.html';
    }, 600);
  });
}
