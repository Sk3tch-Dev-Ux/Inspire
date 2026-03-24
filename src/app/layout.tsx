import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    template: '%s | Inspire PC',
  },
  description: 'Professional PC building, troubleshooting, diagnostics, and upgrade services. You buy the parts, we build it right. Serving customers nationwide at inspirepc.com.',
  metadataBase: new URL('https://inspirepc.com'),
  openGraph: {
    title: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    description: 'Professional PC building, troubleshooting, diagnostics, and upgrade services. You buy the parts, we build it right.',
    url: 'https://inspirepc.com',
    siteName: 'Inspire PC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    description: 'Professional PC building, troubleshooting, diagnostics, and upgrade services.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Grotesk:wght@300..700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-midnight antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
