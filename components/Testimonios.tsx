"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

const testimonios = [
  {
    txt: "Yo pensaba que no podía tener seguro por la presión alta y mis años. Mario me revisó todo en español y en 20 minutos tenía mi cobertura. Ahora sé que mis hijos estarán bien.",
    name: "Rosa M.",
    age: "64 años",
    city: "Houston, Texas",
    highlight: "en 20 minutos tenía mi cobertura",
  },
  {
    txt: "Tenía el seguro del trabajo y creía que era suficiente. Mario me mostró que si me despedían lo perdía todo. Ahora tengo mi propio seguro con beneficios que puedo usar hoy mismo.",
    name: "Carlos V.",
    age: "58 años",
    city: "Dallas, Texas",
    highlight: "beneficios que puedo usar hoy mismo",
  },
  {
    txt: "Lo que más me gustó es que Mario no me vendió de inmediato. Primero revisó lo que ya tenía. Esa honestidad fue lo que me dio confianza para seguir adelante con él.",
    name: "Elena R.",
    age: "71 años",
    city: "Austin, Texas",
    highlight: "Esa honestidad fue lo que me dio confianza",
  },
]

export function Testimonios() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="py-16 sm:py-24 bg-[var(--warm-alt)]" ref={ref}>
      <div className="max-w-[960px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[var(--gold)] mb-3 block">Lo que dicen</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
            Familias que ya<br />
            <span className="text-[var(--navy)]">están tranquilas.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.13, duration: 0.55 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative bg-white border border-[var(--line)] rounded-3xl p-7 flex flex-col shadow-sm hover:shadow-xl hover:shadow-[var(--navy)]/8 transition-shadow duration-300"
            >
              {/* Comillas decorativas */}
              <div className="absolute top-5 right-6 opacity-10">
                <Quote size={40} className="text-[var(--navy)] fill-[var(--navy)]" />
              </div>

              {/* Estrellas */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Texto con highlight */}
              <p className="text-[0.95rem] text-[var(--body)] leading-[1.75] flex-1 mb-6">
                {t.txt.split(t.highlight).map((part, pi, arr) => (
                  <span key={pi}>
                    {part}
                    {pi < arr.length - 1 && (
                      <span className="font-bold text-[var(--navy)] bg-[var(--navy-lt)] px-1 rounded">{t.highlight}</span>
                    )}
                  </span>
                ))}
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 border-t border-[var(--line)] pt-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--navy)] to-[#2B5AA8] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[0.88rem] font-bold text-[var(--ink)]">{t.name} · {t.age}</p>
                  <p className="text-[0.72rem] text-[var(--mid)] mt-0.5">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
