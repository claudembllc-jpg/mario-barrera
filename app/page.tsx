"use client"
import { useState } from "react"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { Problema } from "@/components/Problema"
import { Objeciones } from "@/components/Objeciones"
import { Asesoria } from "@/components/Asesoria"
import { ComoFunciona } from "@/components/ComoFunciona"
import { Testimonios } from "@/components/Testimonios"
import { FAQ } from "@/components/FAQ"
import { CTAFinal } from "@/components/CTAFinal"
import { FormModal } from "@/components/FormModal"
import { StickyBar } from "@/components/StickyBar"

export default function Home() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Problema />
        <Objeciones />
        <Asesoria onOpenForm={() => setFormOpen(true)} />
        <ComoFunciona />
        <Testimonios />
        <FAQ />
        <CTAFinal onOpenForm={() => setFormOpen(true)} />
      </main>

      <footer className="bg-[#060C18] py-10 border-t border-white/5">
        <div className="max-w-[960px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[0.82rem] font-semibold text-white/55">
            Mario Barrera · <span className="text-[rgba(176,125,32,0.75)]">Asesor de Seguros</span> · Texas
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a href="tel:+18888561999" className="text-[0.78rem] text-white/30 hover:text-white/65 transition-colors">1-888-856-1999</a>
            <a href="sms:+18888561999" className="text-[0.78rem] text-white/30 hover:text-white/65 transition-colors">SMS</a>
            <a href="https://instagram.com/mariobarrera_agente" target="_blank" rel="noopener" className="text-[0.78rem] text-white/30 hover:text-white/65 transition-colors">@mariobarrera_agente</a>
          </div>
        </div>
        <p className="text-center text-[0.62rem] text-white/12 mt-5 px-5">
          Sujeto a aprobación. © 2026 Mario Barrera Group. Houston · Dallas · Austin · Texas
        </p>
      </footer>

      <FormModal open={formOpen} onClose={() => setFormOpen(false)} />
      <StickyBar onOpenForm={() => setFormOpen(true)} />
    </>
  )
}
