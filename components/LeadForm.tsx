'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LeadFormProps {
  pageId?: number
}

export function LeadForm({ pageId = 1 }: LeadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          page_id: pageId,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({ nombre: '', email: '', telefono: '', ciudad: '' })
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Error al enviar el formulario')
      }
    } catch (err) {
      setError('Error de conexión. Intenta más tarde.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      {success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-green-lt text-green rounded-lg text-sm"
        >
          ✓ ¡Gracias! Te contactaremos pronto.
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-lt text-red rounded-lg text-sm"
        >
          ✗ {error}
        </motion.div>
      )}

      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          Nombre Completo *
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          placeholder="(512) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1">
          Ciudad (opcional)
        </label>
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
          placeholder="Austin, Dallas, Houston..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Enviando...' : 'Obtener Información Gratis'}
      </button>
    </motion.form>
  )
}
