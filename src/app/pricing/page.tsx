import type { Metadata } from 'next';
import PricingContent from './Content';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent, honest pricing for professional PC assembly. No hidden fees, no parts markup — just expert building services.',
};

export default function PricingPage() {
  return <PricingContent />;
}
