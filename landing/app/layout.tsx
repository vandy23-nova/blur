import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blur - Anonymous Photo Reveals for Gen Z',
  description: 'The viral social app where you blur, reveal, and connect. Anonymous photo sharing with polls and viral challenges.',
  keywords: ['blur', 'social app', 'gen z', 'anonymous', 'photo sharing', 'viral app'],
  authors: [{ name: 'Blur Team' }],
  openGraph: {
    title: 'Blur - Anonymous Photo Reveals for Gen Z',
    description: 'The viral social app where you blur, reveal, and connect. Anonymous photo sharing with polls and viral challenges.',
    type: 'website',
    url: 'https://blur.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blur App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blur - Anonymous Photo Reveals for Gen Z',
    description: 'The viral social app where you blur, reveal, and connect.',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  )
}
