import React from "react"
import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'SkillBridge AI | Talent Optimization Agent',
  description: 'AI-driven internal workforce mobility and talent optimization platform for enterprise HR decision-support.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
