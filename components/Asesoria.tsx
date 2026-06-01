"use client"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, TrendingUp } from "lucide-react"

const checks = [
  "Reviso TODAS tus pólizas — del trabajo y personales",
  "Identifico huecos, coberturas duplicadas y lo que pagas de más",
  "Si ya tienes buena cobertura, te lo confirmo — sin venderte nada",
  "Gratis, en español y sin ningún compromiso",
]

const mockRows = [
  { label: "Seguro del trabajo",        status: "warn", txt: "Hueco detectado" },
  { label: "Cobertura por fallecimiento",status: "bad",  txt: "Insuficiente" },
  { label: "Beneficios en vida",         status: "bad",  txt: "No tiene" },
  { label: "Sin examen médico",          status: "ok",   txt: "Disponible" },
  { label: "Final Expense desde $30/mes",status: "ok",   txt: "Califica" },
]

const badge: Record<string, string> = {
  ok:   "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  warn: "bg-amber-400/15 text-amber-300 border border-amber-400/20",
  bad:  "bg-red-500/15 text-red-400 border border-red-500/20",
}
const dot: Record<string, string> = {
  ok: "bg-emerald-400", warn: "bg-amber-400", bad: "bg-red-400",
}

interface AsesoriaProps { onOpenForm: () => void }

export function Asesoria({ onOpenForm }: AsesoriaProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="relative py-16 sm:py-28 overflow-hidden" ref={ref}>
      {/* Background con gradiente sofisticado */}
      <div className="absolute inset-0 bg-[#080C14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_50%,rgba(27,58,107,0.35),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(176,125,32,0.08),transparent)]" />
      {/* Líneas de grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[960px] mx-auto px-5">
        <div className="grid sm:grid-cols-2 gap-14 sm:gap-20 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.08em] uppercase text-[#F0C060] border border-[#F0C060]/25 bg-[#F0C060]/5 px-3.5 py-1.5 rounded-full mb-6">
              <TrendingUp size={12} />
              Diferente a los demás agentes
            </div>
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white mb-5">
              Primero reviso<br />lo que tienes.<br />
              Luego te{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #F0C060 0%, #E8A020 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                asesoro.
              </span>
            </h2>
            <p className="text-[0.97rem] text-white/50 leading-[1.75] mb-8">
              Cualquier agente te vende algo. Yo primero reviso lo que ya tienes.
              Si está bien, te lo digo. Si tiene huecos, también.
            </p>
            <ul className="space-y-0">
              {checks.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex gap-3.5 py-4 border-t border-white/[0.06] last:border-b items-start"
                >
                  <div className="w-5 h-5 min-w-5 rounded-full bg-[#F0C060]/15 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 size={11} className="text-[#F0C060]" />
                  </div>
                  <p className="text-[0.92rem] text-white/65 leading-relaxed">{c}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Mock card premium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative"
          >
            {/* Glow detrás */}
            <div className="absolute -inset-4 bg-[var(--navy)]/20 rounded-3xl blur-2xl" />

            <div className="relative bg-white/[0.05] border border-white/10 rounded-3xl p-7 backdrop-blur-sm">
              {/* Header del card */}
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/[0.08]">
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-white/25">Revisión de cobertura</p>
                  <p className="text-[0.92rem] font-bold text-white mt-1">Análisis personalizado</p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[0.62rem] font-bold text-emerald-400">Gratis</span>
                </div>
              </div>

              {/* Filas */}
              <div className="space-y-2.5 mb-6">
                {mockRows.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl px-4 py-3 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot[r.status]}`} />
                      <span className="text-[0.85rem] font-medium text-white/65">{r.label}</span>
                    </div>
                    <span className={`text-[0.62rem] font-bold px-2.5 py-1 rounded-full ${badge[r.status]}`}>{r.txt}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={onOpenForm}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative overflow-hidden bg-gradient-to-r from-[var(--gold)] to-[#D4960A] text-white font-extrabold text-[0.95rem] py-4 rounded-xl shadow-[0_4px_20px_rgba(176,125,32,0.35)] hover:shadow-[0_6px_28px_rgba(176,125,32,0.5)] transition-shadow cursor-pointer"
              >
                <span className="relative">Revisar mi situación — gratis</span>
              </motion.button>

              <p className="text-center text-[0.62rem] text-white/20 mt-3">Sin compromiso · En español</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
