import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Asesor de Seguros en Español Texas | Mario Barrera — Asesoría Gratis",
  description: "Mario Barrera, asesor de seguros de vida en español en Houston, Dallas y Austin Texas. Final expense desde $30/mes. Sin examen médico. Llama o SMS: 1-888-856-1999.",
  keywords: "agente de seguros en español Houston, seguro de vida final expense Texas, asesor seguros hispano Dallas",
  openGraph: {
    title: "Asesor de Seguros en Español Texas | Mario Barrera",
    description: "15 años protegiendo familias latinas en Texas. Final expense desde $30/mes. Asesoría gratis.",
    locale: "es_US",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Houston, Texas" />
      </head>
      <body style={{ fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
