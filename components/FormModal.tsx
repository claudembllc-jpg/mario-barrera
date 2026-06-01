"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft, ArrowRight, Phone, MessageSquare, CheckCircle2 } from "lucide-react"

const STEPS = [
  { id: "nombre",    type: "text",  label: "Pregunta 1 de 4", q: "¿Cómo te llamas?",                           placeholder: "Tu nombre completo" },
  { id: "tel",       type: "tel",   label: "Pregunta 2 de 4", q: "¿A qué número te llamo\no mando un SMS?",    placeholder: "(713) 000-0000" },
]
const CARD_STEPS = [
  {
    id: "ciudad", label: "Pregunta 3 de 4",
    q: "¿En qué ciudad estás?",
    opts: ["Houston", "Dallas", "Austin", "Otra ciudad en Texas"],
  },
  {
    id: "situacion", label: "Pregunta 4 de 4",
    q: "¿Cómo está tu seguro ahora mismo?",
    opts: ["No tengo seguro", "Solo el del trabajo", "Tengo uno propio", "No sé bien lo que tengo"],
  },
]
const ALL_STEPS = [...STEPS.map(s => s.id), ...CARD_STEPS.map(s => s.id)]

interface FormModalProps {
  open: boolean
  onClose: () => void
}

export function FormModal({ open, onClose }: FormModalProps) {
  const [paso, setPaso] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({ nombre: "", tel: "", ciudad: "", situacion: "" })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) { setPaso(0); setDone(false) }
  }, [open])

  useEffect(() => {
    if (open && paso < 2) setTimeout(() => inputRef.current?.focus(), 400)
  }, [open, paso])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  const progress = done ? 100 : (paso / ALL_STEPS.length) * 100

  function canContinue() {
    if (paso === 0) return data.nombre.trim().length >= 2
    if (paso === 1) return data.tel.replace(/\D/g, "").length === 10
    return false
  }

  function formatTel(raw: string) {
    let v = raw.replace(/\D/g, "").slice(0, 10)
    if (v.length >= 7)      v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`
    else if (v.length >= 4) v = `(${v.slice(0,3)}) ${v.slice(3)}`
    else if (v.length)      v = `(${v}`
    return v
  }

  function next() {
    if (paso < ALL_STEPS.length - 1) setPaso(p => p + 1)
  }
  function prev() { setPaso(p => Math.max(0, p - 1)) }

  function selectCard(stepIdx: number, value: string) {
    const key = CARD_STEPS[stepIdx].id as keyof typeof data
    setData(d => ({ ...d, [key]: value }))
    if (stepIdx < CARD_STEPS.length - 1) {
      setTimeout(() => setPaso(STEPS.length + stepIdx + 1), 280)
    } else {
      setTimeout(() => setDone(true), 280)
    }
  }

  function getSMSLink() {
    const msg = encodeURIComponent(
      `Hola Mario, soy ${data.nombre} de ${data.ciudad}. Vi tu página y quiero una asesoría gratuita. Situación: ${data.situacion}. Mi número: ${data.tel}.`
    )
    return `sms:+18888561999?body=${msg}`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[var(--cream)] flex flex-col"
        >
          {/* Barra de progreso */}
          <div className="h-1.5 bg-[var(--line-dk)] shrink-0">
            <motion.div
              className="h-full bg-[var(--navy)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b-2 border-[var(--line)] shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src="/mario-real.jpg"
                alt="Mario"
                className="w-9 h-9 rounded-full object-cover border-2 border-[var(--gold)]"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=MB&background=1B3A6B&color=fff" }}
              />
              <span className="text-[0.88rem] font-bold text-[var(--ink)]">Mario Barrera · Asesor de Seguros</span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[var(--warm-alt)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--mid)] hover:bg-[var(--line)] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            <AnimatePresence mode="wait">
              {!done ? (
                <motion.div
                  key={`paso-${paso}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -28 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-center px-7 py-8 overflow-y-auto"
                >
                  {/* Steps de texto */}
                  {paso < STEPS.length && (() => {
                    const s = STEPS[paso]
                    return (
                      <>
                        <p className="text-[0.78rem] font-bold tracking-[0.06em] uppercase text-[var(--gold)] mb-2">{s.label}</p>
                        <h2 className="text-[clamp(1.5rem,5vw,2.2rem)] font-extrabold text-[var(--ink)] leading-[1.2] mb-8 whitespace-pre-line">{s.q}</h2>
                        <div className="bg-white border-[2.5px] border-[var(--line-dk)] focus-within:border-[var(--navy)] focus-within:shadow-[0_0_0_4px_rgba(27,58,107,0.1)] rounded-2xl px-5 transition-all mb-6">
                          <input
                            ref={inputRef}
                            type={s.type}
                            inputMode={s.type === "tel" ? "tel" : "text"}
                            autoComplete={s.type === "tel" ? "tel" : "given-name"}
                            placeholder={s.placeholder}
                            value={data[s.id as keyof typeof data]}
                            onChange={(e) => {
                              const val = s.type === "tel" ? formatTel(e.target.value) : e.target.value
                              setData(d => ({ ...d, [s.id]: val }))
                            }}
                            onKeyDown={(e) => { if (e.key === "Enter" && canContinue()) next() }}
                            className="w-full bg-transparent text-[1.5rem] font-semibold text-[var(--ink)] placeholder:text-[var(--faint)] placeholder:font-normal py-5 outline-none"
                          />
                        </div>
                        <motion.button
                          onClick={next}
                          disabled={!canContinue()}
                          whileHover={canContinue() ? { scale: 1.02 } : {}}
                          whileTap={canContinue() ? { scale: 0.98 } : {}}
                          className="inline-flex items-center gap-2 bg-[var(--navy)] disabled:opacity-30 hover:bg-[var(--navy-dk)] text-white font-extrabold text-[1rem] px-8 py-4 rounded-2xl shadow-lg shadow-[var(--navy)]/30 transition-colors cursor-pointer disabled:cursor-not-allowed"
                        >
                          Continuar <ArrowRight size={16} />
                        </motion.button>
                      </>
                    )
                  })()}

                  {/* Steps de cards */}
                  {paso >= STEPS.length && paso < ALL_STEPS.length && (() => {
                    const cs = CARD_STEPS[paso - STEPS.length]
                    const letters = ["A", "B", "C", "D"]
                    return (
                      <>
                        <p className="text-[0.78rem] font-bold tracking-[0.06em] uppercase text-[var(--gold)] mb-2">{cs.label}</p>
                        <h2 className="text-[clamp(1.5rem,5vw,2.2rem)] font-extrabold text-[var(--ink)] leading-[1.2] mb-8">{cs.q}</h2>
                        <div className="flex flex-col gap-3">
                          {cs.opts.map((opt, oi) => {
                            const selected = data[cs.id as keyof typeof data] === opt
                            return (
                              <motion.button
                                key={opt}
                                onClick={() => selectCard(paso - STEPS.length, opt)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-4 px-5 py-4 min-h-[64px] rounded-2xl border-2 text-left transition-all cursor-pointer ${
                                  selected
                                    ? "border-[var(--navy)] bg-[var(--navy-lt)] shadow-md"
                                    : "border-[var(--line-dk)] bg-white hover:border-[var(--navy)] hover:bg-[var(--navy-lt)]"
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 text-[0.72rem] font-extrabold transition-colors ${
                                  selected ? "bg-[var(--navy)] border-[var(--navy)] text-white" : "bg-[var(--warm-alt)] border-[var(--line-dk)] text-[var(--mid)]"
                                }`}>
                                  {letters[oi]}
                                </div>
                                <span className={`text-[1rem] font-semibold leading-snug transition-colors ${selected ? "text-[var(--navy)] font-bold" : "text-[var(--body)]"}`}>
                                  {opt}
                                </span>
                              </motion.button>
                            )
                          })}
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              ) : (
                // Pantalla de éxito
                <motion.div
                  key="exito"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center px-7 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-[var(--green-lt)] border-2 border-[var(--green)] flex items-center justify-center mb-8"
                  >
                    <CheckCircle2 size={36} className="text-[var(--green)]" />
                  </motion.div>
                  <h2 className="text-[2rem] font-extrabold text-[var(--ink)] mb-3">
                    ¡Listo, {data.nombre.split(" ")[0] || "amigo"}!
                  </h2>
                  <p className="text-[1rem] text-[var(--body)] leading-relaxed max-w-[320px] mb-10">
                    Recibí tu información. Te contactaré hoy mismo por llamada o SMS para revisar tu situación sin compromiso.
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-[300px]">
                    <a
                      href="tel:+18888561999"
                      className="flex items-center justify-center gap-2 bg-[var(--navy)] text-white font-extrabold text-[1rem] py-4 rounded-2xl shadow-lg shadow-[var(--navy)]/30 hover:bg-[var(--navy-dk)] transition-colors"
                    >
                      <Phone size={17} /> Llamar a Mario ahora
                    </a>
                    <a
                      href={getSMSLink()}
                      className="flex items-center justify-center gap-2 bg-[var(--gold-lt)] text-[var(--gold-dk)] border-2 border-[var(--gold)]/30 font-extrabold text-[1rem] py-4 rounded-2xl hover:bg-[#F0D890]/40 transition-colors"
                    >
                      <MessageSquare size={17} /> Mandar SMS ahora
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-[var(--line)] shrink-0">
            <span className="text-[0.72rem] text-[var(--mid)] font-medium">
              {done ? "Confidencial · En español · Sin compromiso" : `Paso ${paso + 1} de ${ALL_STEPS.length} · Confidencial`}
            </span>
            {!done && paso > 0 && (
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl bg-[var(--warm-alt)] border-2 border-[var(--line)] flex items-center justify-center text-[var(--mid)] hover:bg-[var(--line)] transition-colors cursor-pointer"
              >
                <ArrowLeft size={15} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
