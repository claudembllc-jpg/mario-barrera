"use client"
import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Phone, MessageSquare, CheckCircle2, Star } from "lucide-react"

const chips = ["Sin compromiso", "En español", "100% gratis", "Desde $30/mes"]

export function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -60])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[92svh] flex flex-col items-center justify-center text-center overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 bg-[var(--cream)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(27,58,107,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(176,125,32,0.07),transparent)]" />

      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(var(--navy) 1px, transparent 1px), linear-gradient(90deg, var(--navy) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 px-5 pt-28 pb-16 flex flex-col items-center max-w-[960px] mx-auto w-full">

        {/* Perfil pill premium */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
          className="flex items-center gap-3 mb-7 relative"
        >
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-[var(--line)] rounded-full px-4 py-2 shadow-[0_4px_24px_rgba(27,58,107,0.12)]">
            <div className="relative">
              <img
                src="/mario-real.jpg"
                alt="Mario Barrera"
                className="w-11 h-11 rounded-full object-cover border-2 border-[var(--gold)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Mario+Barrera&background=1B3A6B&color=fff" }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[var(--green)] border-2 border-white" />
            </div>
            <div className="text-left">
              <p className="text-[0.82rem] font-bold text-[var(--ink)] leading-tight">Mario Barrera</p>
              <p className="text-[0.68rem] text-[var(--mid)]">Asesor de Seguros · 15 años en Texas</p>
            </div>
            <div className="w-px h-7 bg-[var(--line)] mx-1" />
            <div className="flex items-center gap-1.5 pr-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]" />
              </span>
              <span className="text-[0.65rem] font-bold text-[var(--green)]">Disponible hoy</span>
            </div>
          </div>
        </motion.div>

        {/* Rating social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center gap-2 mb-5"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[var(--gold)] text-[var(--gold)]" />
            ))}
          </div>
          <span className="text-[0.75rem] font-semibold text-[var(--body)]">+500 familias protegidas en Texas</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[var(--gold)] mb-4"
        >
          Houston · Dallas · Austin · Texas
        </motion.p>

        {/* H1 con gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.21, 1.02, 0.73, 1] }}
          className="text-[clamp(2.2rem,7vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] mb-5 max-w-[780px]"
        >
          <span className="text-[var(--ink)]">¿Alguien te explicó<br />bien tu seguro?</span>
          <br />
          <span
            style={{
              backgroundImage: "linear-gradient(135deg, var(--navy) 0%, #2B5AA8 50%, var(--gold) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Yo sí lo hago.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-[1.1rem] text-[var(--body)] leading-[1.7] max-w-[460px] mb-10"
        >
          Reviso lo que tienes — en español, sin presiones y sin costo.
          Te digo si estás bien protegido o qué necesitas cambiar.
        </motion.p>

        {/* CTA principal — teléfono grande */}
        <motion.a
          href="tel:+18888561999"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.42, duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group relative flex items-center gap-4 mb-5"
        >
          <div className="absolute inset-0 rounded-2xl bg-[var(--navy)]/15 blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div className="relative flex items-center gap-4 bg-white border-2 border-[var(--line)] hover:border-[var(--navy)]/40 rounded-2xl px-8 py-4 shadow-[0_8px_32px_rgba(27,58,107,0.12)] hover:shadow-[0_12px_48px_rgba(27,58,107,0.2)] transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[var(--navy)] flex items-center justify-center shadow-[0_4px_12px_rgba(27,58,107,0.3)]">
              <Phone size={22} className="text-white" />
            </div>
            <div className="text-left">
              <p className="text-[0.65rem] font-bold tracking-[0.08em] uppercase text-[var(--mid)] mb-0.5">Llama gratis ahora</p>
              <p className="text-[clamp(1.5rem,4vw,2.2rem)] font-extrabold text-[var(--navy)] tracking-[-0.03em] leading-none">1-888-856-1999</p>
            </div>
          </div>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[0.8rem] text-[var(--faint)] mb-3"
        >
          o si prefieres texto:
        </motion.p>

        <motion.a
          href="sms:+18888561999?body=Hola Mario, vi tu página y quiero una asesoría gratuita."
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.53, duration: 0.5 }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 text-[0.95rem] font-bold text-[var(--navy)] bg-[var(--navy-lt)] border-2 border-transparent hover:border-[var(--navy)]/30 px-6 py-3 rounded-xl transition-all mb-10"
        >
          <MessageSquare size={17} />
          Enviar SMS a Mario
        </motion.a>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.58, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {chips.map((chip) => (
            <span key={chip} className="flex items-center gap-2 text-[0.78rem] font-medium text-[var(--body)]">
              <CheckCircle2 size={14} className="text-[var(--green)]" />
              {chip}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[var(--faint)]">Baja</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--line)] to-transparent"
        />
      </motion.div>
    </section>
  )
}
