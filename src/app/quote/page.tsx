import type { Metadata } from 'next';
import QuoteContent from './Content';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Pick a service, describe what you want, get a real number within 24 hours. No discovery calls, no sales pitch.',
  alternates: { canonical: '/quote' },
};

export default function QuotePage() {
  return <QuoteContent />;
}
