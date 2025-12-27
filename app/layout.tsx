import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tu Nombre - Full-Stack Developer Portfolio',
  description: 'Desarrollador Full-Stack especializado en React, Next.js, TypeScript y Node.js. Creando experiencias web excepcionales.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

