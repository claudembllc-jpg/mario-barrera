"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 1.02, 0.73, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center transition-all duration-300",
        scrolled
          ? "bg-[var(--cream)]/95 backdrop-blur-md border-b border-[var(--line)] shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-[960px] mx-auto px-5 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/mario-real.jpg"
            alt="Mario"
            className={cn("w-8 h-8 rounded-full object-cover border-2 border-[var(--gold)] transition-all duration-300", scrolled ? "opacity-100" : "opacity-0")}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=MB&background=1B3A6B&color=fff&size=64" }}
          />
          <div>
            <p className="text-[0.82rem] font-bold text-[var(--ink)] leading-tight">Mario Barrera</p>
            <p className={cn("text-[0.65rem] text-[var(--mid)] transition-all duration-300", scrolled ? "opacity-100 max-h-4" : "opacity-0 max-h-0")}>
              Asesor de Seguros · Texas
            </p>
          </div>
        </div>
        <motion.a
          href="tel:+18888561999"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 text-[0.82rem] font-bold text-[var(--navy)] bg-[var(--navy-lt)] hover:bg-[#dde6f5] px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Phone size={14} />
          1-888-856-1999
        </motion.a>
      </div>
    </motion.nav>
  )
}
