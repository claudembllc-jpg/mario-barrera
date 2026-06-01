"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Phone, MessageSquare, ArrowRight, Shield } from "lucide-react"

interface CTAFinalProps { onOpenForm: () => void }

export function CTAFinal({ onOpenForm }: CTAFinalProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden text-center" ref={ref}>
      {/* Fondo navy con profundidad */}
      <div className="absolute inset-0 bg-[var(--navy)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(255,255,255,0.05),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative max-w-[960px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/70 text-[0.65rem] font-bold tracking-[0.08em] uppercase px-4 py-2 rounded-full mb-6">
            <Shield size={11} />
            15 años protegiendo familias en Texas
          </div>

          <h2 className="text-[clamp(2rem,5.5vw,3.8rem)] font-extrabold leading-[1.07] tracking-[-0.04em] text-white mb-5 max-w-[620px] mx-auto">
            Tu familia merece saber que está{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #F0C060 0%, #E8A020 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              protegida.
            </span>
          </h2>

          <p className="text-[1rem] text-white/50 leading-relaxed max-w-[420px] mx-auto mb-10">
            Asesoría gratis. En español. Con alguien que lleva 15 años siendo honesto con familias latinas en Texas.
          </p>

          {/* Teléfono grande */}
          <motion.a
            href="tel:+18888561999"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-4 bg-white/10 hover:bg-white/18 border-2 border-white/20 hover:border-white/40 rounded-2xl px-8 py-5 transition-all duration-300 mb-8 shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <Phone size={22} className="text-[#F0C060]" />
            </div>
            <div className="text-left">
              <p className="text-[0.65rem] font-bold tracking-[0.08em] uppercase text-white/40 mb-0.5">Llama gratis ahora</p>
              <p className="text-[clamp(1.4rem,4vw,2rem)] font-extrabold text-white tracking-[-0.03em] leading-none">1-888-856-1999</p>
            </div>
          </motion.a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.a
              href="sms:+18888561999?body=Hola Mario, vi tu página y quiero una asesoría gratuita."
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 text-[0.92rem] font-bold text-white bg-white/10 hover:bg-white/18 border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl transition-all"
            >
              <MessageSquare size={16} />
              Enviar SMS
            </motion.a>
            <motion.button
              onClick={onOpenForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2.5 text-[0.92rem] font-bold text-white bg-gradient-to-r from-[var(--gold)] to-[#D4960A] hover:brightness-110 px-6 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(176,125,32,0.4)] transition-all cursor-pointer"
            >
              <ArrowRight size={16} />
              Llenar formulario
            </motion.button>
          </div>

          <div className="flex gap-5 justify-center flex-wrap">
            {["Sin compromiso", "En español", "Gratis", "Respondo hoy"].map((t, i) => (
              <span key={t} className="flex items-center gap-1.5 text-[0.72rem] font-medium text-white/30">
                {i > 0 && <span className="text-white/15">·</span>}
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
