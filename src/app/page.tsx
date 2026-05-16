import type { Metadata } from 'next';
import HomeContent from './Content';

export const metadata: Metadata = {
  // Title is intentionally short — the root layout's title.template applies
  // " | Inspire Development" to every other route, but the homepage is the
  // brand surface, so we let layout.tsx's default title speak for it.
  description:
    'Discord bots, custom websites, and game scripts built by a solo developer. Plus three in-house products: Clan Ops, Citadel, and Citadel Cloud. Hourly rates posted publicly, quotes within 24 hours.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <HomeContent />;
}
