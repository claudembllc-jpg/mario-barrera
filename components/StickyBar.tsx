"use client"
import { Phone, MessageSquare } from "lucide-react"

interface StickyBarProps {
  onOpenForm: () => void
}

export function StickyBar({ onOpenForm }: StickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t-2 border-[var(--line)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] grid grid-cols-3 gap-2">
      <a
        href="tel:+18888561999"
        className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-[var(--navy-lt)] text-[var(--navy)] text-[0.6rem] font-extrabold uppercase tracking-wide min-h-[56px]"
      >
        <Phone size={18} />
        Llamar
      </a>
      <button
        onClick={onOpenForm}
        className="flex items-center justify-center py-2.5 rounded-2xl bg-[var(--navy)] text-white text-[0.72rem] font-extrabold min-h-[56px] cursor-pointer"
      >
        Asesoría gratis
      </button>
      <a
        href="sms:+18888561999?body=Hola Mario, quiero una asesoría gratuita."
        className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-[var(--gold-lt)] text-[var(--gold-dk)] text-[0.6rem] font-extrabold uppercase tracking-wide min-h-[56px]"
      >
        <MessageSquare size={18} />
        SMS
      </a>
    </div>
  )
}
