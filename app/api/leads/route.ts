import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, ciudad, page_id } = body

    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Enviar al dashboard
    const dashboardResponse = await fetch(
      `http://localhost:3001/api/leads/capture`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          ciudad: ciudad || null,
          page_id: page_id || 1,
          mensaje: `Lead capturado desde landing page`,
        }),
      }
    ).catch(() => null)

    if (!dashboardResponse?.ok) {
      console.error('Error enviando al dashboard')
    }

    // Retornar éxito al formulario
    return NextResponse.json(
      {
        success: true,
        message: '¡Gracias! Nos pondremos en contacto pronto.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Error procesando tu solicitud' },
      { status: 500 }
    )
  }
}
