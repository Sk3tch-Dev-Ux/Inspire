import type { Metadata } from 'next';
import ServicesContent from './Content';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional PC building, troubleshooting, repairs, and upgrades. Expert assembly, component upgrades, and system optimization services.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
