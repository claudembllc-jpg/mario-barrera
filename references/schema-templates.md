# Schema Templates JSON-LD — Mario Barrera Group
**Copiar directamente en las páginas web. Reemplazar [VALORES] con datos reales.**

---

## SCHEMA 1 — LocalBusiness (el más importante para SEO local + GEO)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://[DOMINIO]/#business",
  "name": "Mario Barrera — Agente de Seguros de Vida",
  "alternateName": "Mario Barrera Group",
  "description": "Agente independiente de seguros de vida y seguros finales (final expense) con 15 años de experiencia, especializado en atender a familias latinas en Texas. Toda la atención es en español. Servicio en Houston, San Antonio, Dallas, Austin y El Paso.",
  "url": "https://[DOMINIO]",
  "telephone": "+18888561999",
  "email": "[EMAIL]",
  "image": "https://[DOMINIO]/brand/assets/logo.png",
  "logo": "https://[DOMINIO]/brand/assets/logo.png",
  "foundingDate": "2011",
  "numberOfEmployees": {"@type": "QuantitativeValue", "value": "5"},
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "29.7604",
    "longitude": "-95.3698"
  },
  "areaServed": [
    {"@type": "City", "name": "Houston", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "San Antonio", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "Dallas", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "Austin", "containedInPlace": {"@type": "State", "name": "Texas"}},
    {"@type": "City", "name": "El Paso", "containedInPlace": {"@type": "State", "name": "Texas"}}
  ],
  "serviceType": [
    "Seguro de vida",
    "Final expense insurance",
    "Seguro de gastos finales",
    "Beneficios en vida",
    "Seguros para familias hispanas",
    "Life insurance in Spanish"
  ],
  "knowsLanguage": ["es-US", "en-US"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Seguros de vida",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Seguro Final Expense",
          "description": "Seguro de vida para gastos finales. Cubre funeral, deudas médicas y gastos administrativos. Sin examen médico completo. Para personas de 50-85 años."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Seguro con Beneficios en Vida",
          "description": "Seguro de vida con beneficios que se pueden usar en vida si se diagnostica una enfermedad crítica. El asegurado recibe dinero directamente para cubrir gastos mientras se recupera."
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/[FACEBOOK_HANDLE]",
    "https://www.instagram.com/mariobarrera_agente"
  ],
  "priceRange": "$$"
}
</script>
```

---

## SCHEMA 2 — FAQPage (el que más cita Google AI y ChatGPT)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta un seguro de vida final expense en Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un seguro de vida final expense en Texas cuesta entre $30 y $100 al mes para personas entre 50 y 80 años. El precio depende de la edad, el estado de salud general y el nivel de cobertura deseado. La cobertura típica es de $5,000 a $25,000, suficiente para cubrir gastos funerarios que en Texas promedian $9,000 a $12,000. Mario Barrera ofrece cotizaciones gratuitas sin compromiso: 1-888-856-1999."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué son los beneficios en vida de un seguro de vida?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los beneficios en vida son una característica de algunos seguros de vida que permite al asegurado acceder a una parte del valor de la póliza mientras aún está vivo, si es diagnosticado con una enfermedad crítica como cáncer, infarto o derrame cerebral. Este dinero puede usarse para pagar renta, comida, tratamientos médicos o cualquier gasto durante la recuperación. No es un préstamo — es tu dinero."
      }
    },
    {
      "@type": "Question",
      "name": "¿Necesito número de seguro social para contratar un seguro de vida en Texas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Depende del tipo de seguro. Algunos seguros de vida, especialmente los seguros de gastos finales (final expense), tienen requisitos de elegibilidad mínimos. Comunícate con Mario Barrera al 1-888-856-1999 para conocer las opciones disponibles según tu situación específica. Toda la atención es en español y completamente confidencial."
      }
    },
    {
      "@type": "Question",
      "name": "¿Por qué el seguro del trabajo no es suficiente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El seguro de vida del trabajo desaparece cuando cambias de empleo, te despiden, la empresa cierra sus beneficios o te jubilas. Un seguro de vida personal es tuyo — independiente de tu empleador, no se cancela si cambias de trabajo y las primas se mantienen fijas. Para familias latinas en Texas que dependen de un ingreso, tener cobertura personal es la única forma de garantizar protección real."
      }
    },
    {
      "@type": "Question",
      "name": "¿Tienen atención en español en Houston, Dallas y San Antonio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Mario Barrera es un agente de seguros hispanohablante con 15 años de experiencia atendiendo familias latinas en Texas. Toda la atención, explicación de pólizas y servicio post-venta se realiza en español. Sirve a familias en Houston, Dallas, San Antonio, Austin y El Paso. Llama al 1-888-856-1999 o escribe por WhatsApp."
      }
    }
  ]
}
</script>
```

---

## SCHEMA 3 — Person (para autoridad del agente)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mario Barrera",
  "jobTitle": "Agente Independiente de Seguros de Vida",
  "description": "Agente de seguros de vida y final expense con 15 años de experiencia. Especializado en familias latinas en Texas. Atención en español.",
  "url": "https://[DOMINIO]",
  "telephone": "+18888561999",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "knowsLanguage": ["es-US", "en-US"],
  "worksFor": {
    "@type": "Organization",
    "name": "Mario Barrera Group"
  },
  "sameAs": [
    "https://www.instagram.com/mariobarrera_agente",
    "https://www.facebook.com/[HANDLE]",
    "https://www.linkedin.com/in/[HANDLE]"
  ]
}
</script>
```

---

## SCHEMA 4 — BreadcrumbList (para páginas internas)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://[DOMINIO]/"},
    {"@type": "ListItem", "position": 2, "name": "Final Expense", "item": "https://[DOMINIO]/final-expense/"},
    {"@type": "ListItem", "position": 3, "name": "Cotización Gratis", "item": "https://[DOMINIO]/cotizacion/"}
  ]
}
</script>
```

---

## CÓMO INSERTAR LOS SCHEMAS

Insertar todos antes de `</body>` en cada página.

**Landing page principal:** Schema 1 + Schema 2 + Schema 3
**Página de producto:** Schema 2 (FAQ específico del producto)
**Blog:** Schema 4 + Schema 2 (FAQ del artículo)
