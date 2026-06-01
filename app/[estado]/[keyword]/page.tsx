'use client'

import { LeadForm } from '@/components/LeadForm'
import { motion } from 'framer-motion'

interface PageProps {
  params: { estado: string; keyword: string }
}

export default function LandingPage({ params }: PageProps) {
  const { estado, keyword } = params
  const decodedKeyword = decodeURIComponent(keyword).replace(/-/g, ' ')

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-20 pb-12 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-navy mb-4 capitalize">
            {decodedKeyword} en {estado}
          </h1>
          <p className="text-xl text-body mb-8">
            Encuentra la mejor solución para tus necesidades locales
          </p>
        </div>
      </motion.section>

      {/* Content + Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-20 px-6"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-navy mb-4">
                ¿Por qué elegirnos?
              </h2>
              <ul className="space-y-3 text-body">
                <li>✓ Experiencia local en {estado}</li>
                <li>✓ Servicio personalizado</li>
                <li>✓ Disponibilidad 24/7</li>
                <li>✓ Garantía de satisfacción</li>
                <li>✓ Sin compromisos</li>
              </ul>
            </div>

            <div className="bg-navy-lt p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-navy mb-3">
                Próximos Pasos
              </h3>
              <ol className="space-y-2 text-body">
                <li>1. Completa el formulario →</li>
                <li>2. Te llamamos en 24 horas</li>
                <li>3. ¡Obtén tu cotización gratis!</li>
              </ol>
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center"
          >
            <div className="w-full">
              <h2 className="text-2xl font-bold text-ink mb-6">
                Información Gratis
              </h2>
              <LeadForm pageId={1} />
              <p className="text-xs text-faint text-center mt-4">
                Respetamos tu privacidad. Nunca compartimos tu información.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: '¿Cuál es el costo?',
                a: 'El costo varía según tus necesidades. Solicita una cotización gratis.',
              },
              {
                q: '¿Cuánto tarda?',
                a: 'Nuestro equipo te contactará en 24 horas.',
              },
              {
                q: '¿Hay garantía?',
                a: 'Sí, ofrecemos garantía de satisfacción al 100%.',
              },
              {
                q: '¿Sirven en todo {estado}?',
                a: `Sí, servimos a toda la región de ${estado}.`,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="bg-cream p-6 rounded-lg"
              >
                <h3 className="font-bold text-navy mb-2">{item.q}</h3>
                <p className="text-body text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Footer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-navy py-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para comenzar?
        </h2>
        <p className="mb-6 text-navy-lt">
          Llena el formulario arriba y obtén tu consulta gratis hoy mismo.
        </p>
        <a
          href="#form"
          className="inline-block bg-gold px-8 py-3 rounded-lg font-bold text-navy hover:bg-gold-dk transition-colors"
        >
          Solicitar Información
        </a>
      </motion.section>
    </main>
  )
}
