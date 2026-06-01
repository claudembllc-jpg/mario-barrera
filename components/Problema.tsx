"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle } from "lucide-react"

const problemas = [
  { txt: "El seguro del trabajo se cancela si te despiden — tu familia queda sin nada de un día para otro." },
  { txt: "Nadie te explicó los beneficios en vida: dinero que cobras hoy, no solo cuando fallezcas." },
  { txt: "Muchos creen que no califican por edad, salud o situación migratoria — y sí califican." },
  { txt: "Tu familia descubre los huecos de tu cobertura cuando más los necesita — y ya es tarde." },
]

export function Problema() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="py-16 sm:py-24 bg-[var(--cream)]" ref={ref}>
      <div className="max-w-[960px] mx-auto px-5">
        <div className="grid sm:grid-cols-2 gap-12 sm:gap-16 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[var(--gold)] mb-3 block">El problema real</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)] mb-4">
              Muchas familias tienen seguros que{" "}
              <span className="text-[var(--navy)]">no las protegen</span>{" "}
              cuando más lo necesitan.
            </h2>
            <p className="text-[1rem] text-[var(--body)] leading-relaxed mb-8">
              No es tu culpa. Nadie te hizo una revisión honesta. Eso cambia aquí.
            </p>
            <ul className="divide-y divide-[var(--line)]">
              {problemas.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                  className="flex gap-4 py-5 items-start"
                >
                  <div className="w-9 h-9 min-w-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mt-0.5 shrink-0">
                    <AlertTriangle size={16} className="text-[var(--red)]" />
                  </div>
                  <p className="text-[0.97rem] text-[var(--body)] leading-[1.65] pt-1">{p.txt}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative"
          >
            {/* Sombra de fondo decorativa */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--navy)]/10 to-[var(--gold)]/5 rounded-3xl blur-2xl" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/mario-real.jpg"
                alt="Mario Barrera — Asesor de Seguros Texas"
                className="w-full aspect-[4/5] object-cover block"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Mario+Barrera&size=800&background=1B3A6B&color=fff" }}
              />
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A]/85 via-transparent to-transparent" />

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <p className="text-[0.95rem] font-bold text-white leading-tight">Mario Barrera</p>
                  <p className="text-[0.72rem] text-white/55 mt-1">15 años asesorando familias en Texas</p>
                </div>
                <div className="flex items-center gap-1.5 bg-[var(--green)]/20 border border-[var(--green)]/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                  <span className="text-[0.62rem] font-bold text-[var(--green)]">Disponible hoy</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
