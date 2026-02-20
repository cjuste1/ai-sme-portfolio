import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chrystelle | AI SME - Turning Ideas into Real Business Outcomes',
  description: 'AI Subject Matter Expert specializing in industry-specific AI solutions. From AI tools to AI systems that drive measurable business results.',
  keywords: 'AI consultant, AI SME, AI implementation, AI strategy, business AI solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
