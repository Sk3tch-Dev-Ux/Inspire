import type { Metadata } from 'next';
import PortfolioContent from './Content';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real Discord bots, server layouts, websites, and game scripts shipped for community owners and server admins. See what gets built.',
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
