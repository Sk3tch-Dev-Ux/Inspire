import type { Metadata } from 'next';
import ServicesContent from './Content';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Discord bots, Discord layouts, custom websites, and game scripts (Rust, DayZ, FiveM). Hourly rates posted publicly. Quotes within 24 hours.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
