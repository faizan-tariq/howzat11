import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Howzat11 - Build Your Dream XI',
  description: 'Select your playing 11 before every match. A game-like experience for cricket fans.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen stadium-bg text-white antialiased">
        <div className="stadium-lights" />
        {children}
      </body>
    </html>
  )
}
