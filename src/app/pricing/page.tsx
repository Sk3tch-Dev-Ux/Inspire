import type { Metadata } from 'next';
import PricingContent from './Content';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Hourly rates posted publicly. Fixed-fee packages where the scope is clear. Custom quotes within 24 hours for everything else. No discovery calls.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return <PricingContent />;
}
