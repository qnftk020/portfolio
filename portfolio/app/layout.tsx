import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yeonghwan Shin (Simon) — HCI Researcher',
  description:
    'Portfolio of Yeonghwan Shin (Simon) — HCI researcher specializing in AI-based experience design, Human-AI Interaction, and BCI-based emotion analysis.',
  keywords: ['HCI', 'UX Research', 'Human-AI Interaction', 'BCI', 'Design Engineering'],
  openGraph: {
    title: 'Yeonghwan Shin (Simon)',
    description: 'HCI Researcher · AI Experience Design · Human-AI Interaction',
    type: 'website',
  },
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
