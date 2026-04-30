import type { Metadata } from 'next';
import ContactContent from './Content';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Discord (preferred), email, or the form below. Replies within 4 hours during business days. Quotes within 24 hours.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
