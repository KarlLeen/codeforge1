import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CodeForge - Decentralized Hackathon Platform',
  description: 'Discover, participate, and organize hackathons on a decentralized platform powered by IPFS',
  keywords: ['hackathon', 'blockchain', 'IPFS', 'decentralized', 'coding', 'competition'],
  authors: [{ name: 'CodeForge Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
