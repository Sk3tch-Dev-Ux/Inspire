import type { Metadata } from 'next';
import ContactContent from './Content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Inspire for questions about our PC building, troubleshooting, and repair services. We\'d love to hear from you.',
};

export default function ContactPage() {
  return <ContactContent />;
}
