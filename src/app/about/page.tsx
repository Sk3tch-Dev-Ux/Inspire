import type { Metadata } from 'next';
import AboutContent from './Content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'I build Discord bots, websites, and game scripts for community owners and server admins. Solo developer, six years in, posting hourly rates publicly.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutContent />;
}
