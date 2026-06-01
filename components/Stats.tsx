"use client"
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { end: 15, suffix: "+", label: "Años ayudando familias en Texas", prefix: "" },
  { end: 500, suffix: "+", label: "Familias protegidas", prefix: "" },
  { end: 30, suffix: "", label: "Cobertura desde $30 al mes", prefix: "$" },
  { end: 85, suffix: "", label: "Edad máxima de cobertura", prefix: "" },
]

function Counter({ end, prefix, suffix, inView }: { end: number; prefix: string; suffix: string; inView: boolean }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, end])

  return (
    <span className="block text-[2.6rem] font-extrabold tracking-[-0.05em] text-white leading-none tabular-nums">
      {prefix}{val}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <div className="relative bg-[var(--navy)] overflow-hidden" ref={ref}>
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative max-w-[960px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-[rgba(255,255,255,0.08)] divide-y-[1px] sm:divide-y-0 sm:divide-x-[1px]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="py-9 px-6 text-center group"
            >
              <Counter end={s.end} prefix={s.prefix} suffix={s.suffix} inView={inView} />
              <span className="block text-[0.72rem] font-medium text-white/45 mt-2 leading-snug">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
