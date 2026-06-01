"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageCircle, Shield, Users, ArrowRight } from "lucide-react"

const pasos = [
  {
    n: "01",
    Icon: MessageCircle,
    title: "Me llamas o mandas un SMS",
    body: "Llamas al 1-888-856-1999 o mandas un texto. Me dices cómo estás y qué te preocupa. 10-15 minutos, sin compromiso.",
    tag: "Gratis · En español",
    color: "from-blue-500/10 to-indigo-500/10",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    n: "02",
    Icon: Shield,
    title: "Revisamos tu cobertura juntos",
    body: "Reviso lo que ya tienes. Identifico huecos y beneficios que quizás no conoces. Todo en español, con calma.",
    tag: "Análisis completo",
    color: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-500/10 text-amber-500",
  },
  {
    n: "03",
    Icon: Users,
    title: "Tu familia queda protegida",
    body: "Si necesitas algo, te presento opciones desde $30 al mes. Si ya estás bien cubierto, te lo confirmo. Tú decides.",
    tag: "Desde $30/mes",
    color: "from-emerald-500/10 to-green-500/10",
    iconBg: "bg-emerald-500/10 text-emerald-500",
  },
]

export function ComoFunciona() {
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
          <span className="text-[0.68rem] font-bold tracking-[0.1em] uppercase text-[var(--gold)] mb-3 block">El proceso</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--ink)]">
            Tres pasos simples<br />
            para proteger a <span className="text-[var(--navy)]">tu familia.</span>
          </h2>
          <p className="text-[0.97rem] text-[var(--body)] mt-4 max-w-[480px] mx-auto">
            Sin papeleo. Sin exámenes médicos. Sin esperar semanas.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea conectora desktop */}
          <div className="hidden sm:block absolute top-16 left-[calc(33.3%-12px)] right-[calc(33.3%-12px)] h-0.5 bg-gradient-to-r from-[var(--line)] via-[var(--line-dk)] to-[var(--line)]" />

          <div className="grid sm:grid-cols-3 gap-5">
            {pasos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.55 }}
                className="relative"
              >
                <div className={`relative bg-gradient-to-br ${p.color} bg-white border border-[var(--line)] rounded-2xl p-7 h-full`}>
                  {/* Número flotante */}
                  <div className="absolute -top-3.5 left-7 bg-white border border-[var(--line)] rounded-full px-3 py-0.5">
                    <span className="text-[0.65rem] font-extrabold tracking-[0.06em] text-[var(--gold)]">{p.n}</span>
                  </div>

                  {/* Ícono */}
                  <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center mt-3 mb-5`}>
                    <p.Icon size={22} />
                  </div>

                  <p className="text-[1rem] font-bold text-[var(--ink)] mb-3 leading-snug">{p.title}</p>
                  <p className="text-[0.88rem] text-[var(--body)] leading-[1.7] mb-5">{p.body}</p>

                  <span className="inline-flex items-center gap-1.5 text-[0.62rem] font-bold tracking-[0.07em] uppercase text-[var(--gold)] border border-[var(--gold)]/30 bg-[var(--gold-lt)] px-2.5 py-1 rounded-full">
                    {p.tag}
                  </span>

                  {/* Flecha entre pasos */}
                  {i < pasos.length - 1 && (
                    <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-[var(--line)] items-center justify-center z-10">
                      <ArrowRight size={11} className="text-[var(--mid)]" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
