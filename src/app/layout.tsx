import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import AuthProvider from '@/components/AuthProvider';

// Body sans — workhorse, neutral on dark backgrounds.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Display headings — geometric and slightly technical.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Mono — used for spec tags, code, and the "Discord bot · Rust mod"
// terminal-flavored chips that anchor the brand visually.
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Inspire Development — Discord bots, custom websites, and game scripts',
    template: '%s | Inspire Development',
  },
  description:
    'Built by a developer, for developers and community owners. Discord bots, server layouts, websites, and custom scripts for Rust, DayZ, and FiveM. Hourly rates posted publicly. Custom quotes within 24 hours.',
  metadataBase: new URL('https://inspirepc.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Inspire Development — Discord, web, and game scripts',
    description:
      'Discord bots, server layouts, custom websites, and game scripts for Rust, DayZ, and FiveM. Hourly rates posted publicly.',
    url: 'https://inspirepc.com',
    siteName: 'Inspire Development',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspire Development',
    description:
      'Discord bots, websites, and game scripts. Built by a developer who plays the games.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Structured data — ProfessionalService is more accurate than the
// LocalBusiness/PC-shop schema we had before. Service catalog enumerates
// the new offerings so search rich-results can surface them.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Inspire Development',
  description:
    'Discord bots, server layouts, websites, and custom game scripts for Rust, DayZ, and FiveM.',
  url: 'https://inspirepc.com',
  email: 'hello@inspirepc.com',
  priceRange: '$$',
  serviceType: [
    'Discord Bot Development',
    'Discord Server Setup',
    'Custom Website Development',
    'Rust Game Scripting',
    'DayZ Mod Development',
    'FiveM Resource Development',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ink antialiased">
        <AuthProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-flame focus:text-ink focus:rounded-lg focus:font-semibold focus:text-sm"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
