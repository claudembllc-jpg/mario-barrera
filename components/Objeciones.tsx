"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const obj = [
  { ico: "🎂", q: "¿No soy muy mayor para un seguro?",        a: "Cubrimos de 50 a 85 años. La edad no es problema.",               color: "from-orange-50 to-amber-50",   border: "border-orange-200/60" },
  { ico: "🏥", q: "¿Y si tengo diabetes o presión alta?",     a: "Sin examen médico. Calificas aunque tengas condiciones.",          color: "from-blue-50 to-indigo-50",    border: "border-blue-200/60" },
  { ico: "💵", q: "¿Puedo pagar un seguro?",                  a: "Desde $30 al mes — menos que una pizza a la semana.",              color: "from-emerald-50 to-green-50",  border: "border-emerald-200/60" },
  { ico: "📋", q: "¿Es complicado entender esto?",            a: "Te explico todo en español, con calma y sin tecnicismos.",          color: "from-purple-50 to-violet-50",  border: "border-purple-200/60" },
]

export function Objeciones() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="py-16 sm:py-24 bg-[var(--cream)]" ref={ref}>
      <div className="max-w-[960px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[var(--gold)] mb-3 block">Tus preguntas más comunes</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
            Sí calificas.<br />
            <span className="text-[var(--navy)]">Sí puedo ayudarte.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {obj.map((o, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative bg-gradient-to-br ${o.color} border ${o.border} rounded-2xl p-6 text-center overflow-hidden cursor-default`}
            >
              {/* Glow corner */}
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/40 blur-xl" />

              <div className="relative">
                <div className="text-4xl mb-4 leading-none">{o.ico}</div>
                <p className="text-[0.8rem] font-medium text-[var(--mid)] mb-3 leading-snug italic">"{o.q}"</p>
                <div className="w-8 h-0.5 bg-[var(--gold)]/40 mx-auto mb-3 rounded-full" />
                <p className="text-[0.97rem] font-bold text-[var(--navy)] leading-snug">{o.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
