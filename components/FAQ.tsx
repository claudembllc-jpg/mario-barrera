"use client"
import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const faqs = [
  { q: "¿Tengo que comprar algo para que me asesores?", a: "No. La asesoría y la cotización son 100% gratis y sin compromiso. Si al final no necesitas nada, te lo digo. Mi trabajo es darte claridad." },
  { q: "¿Puedo tener seguro si soy mayor de 65 años?", a: "Sí. Los planes de final expense están diseñados para personas de 50 a 85 años. La edad no es un obstáculo — es justo el mercado que trabajo." },
  { q: "¿Cuánto cuesta un seguro de gastos finales en Texas?", a: "Entre $30 y $100 al mes para personas de 50 a 85 años. Un funeral en Texas cuesta entre $9,000 y $12,000 — esta cobertura protege a tu familia de ese gasto." },
  { q: "¿Qué son los beneficios en vida?", a: "Son coberturas que te permiten recibir dinero mientras estás vivo — si te diagnostican cáncer, infarto u otra enfermedad grave. No es un préstamo: es parte del beneficio de tu póliza." },
  { q: "¿Puedo tener seguro aunque tenga diabetes o presión alta?", a: "Sí. Los planes de final expense no requieren examen médico completo. Están disponibles incluso con diabetes, presión alta u otras condiciones pre-existentes." },
  { q: "¿Necesito número de seguro social o documentos?", a: "Depende del tipo de póliza. Hay opciones para familias en diferentes situaciones migratorias en Texas. Lo revisamos juntos con total confidencialidad." },
]

export function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-24 bg-[var(--warm-alt)]" ref={ref}>
      <div className="max-w-[960px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[var(--gold)] mb-3 block">Preguntas frecuentes</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
            Lo que quieres saber<br />
            <span className="text-[var(--navy)]">antes de llamar.</span>
          </h2>
        </motion.div>

        <div className="max-w-[700px] mx-auto">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="border-t-2 border-[var(--line)] last:border-b-2"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
              >
                <span className="text-[1rem] font-semibold text-[var(--ink)] leading-snug">{f.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 min-w-7 rounded-full bg-[var(--line)] flex items-center justify-center text-[var(--mid)] shrink-0"
                >
                  <Plus size={14} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-[0.95rem] text-[var(--body)] leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
