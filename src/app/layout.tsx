import type { Metadata } from 'next';
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    template: '%s | Inspire PC',
  },
  description:
    'Professional PC building, troubleshooting, diagnostics, and upgrade services. You buy the parts, we build it right. Serving customers nationwide.',
  metadataBase: new URL('https://inspirepc.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    description:
      'Professional PC building, troubleshooting, diagnostics, and upgrade services. You buy the parts, we build it right.',
    url: 'https://inspirepc.com',
    siteName: 'Inspire PC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspire PC | Custom PC Building, Troubleshooting & Repairs',
    description:
      'Professional PC building, troubleshooting, diagnostics, and upgrade services.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Inspire PC',
  description:
    'Professional PC building, troubleshooting, diagnostics, and upgrade services.',
  url: 'https://inspirepc.com',
  telephone: '+13303148860',
  email: 'support@inspirepc.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Girard',
    addressRegion: 'OH',
    postalCode: '44420',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$',
  serviceType: [
    'Custom PC Building',
    'PC Troubleshooting',
    'PC Repair',
    'Hardware Diagnostics',
    'System Upgrades',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-midnight antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
