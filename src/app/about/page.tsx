import type { Metadata } from 'next';
import AboutContent from './Content';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Inspire — our story, values, and mission to make professional PC building accessible to everyone.',
};

export default function AboutPage() {
  return <AboutContent />;
}
