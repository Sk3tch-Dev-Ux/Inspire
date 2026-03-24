import type { Metadata } from 'next';
import WarrantyContent from './Content';

export const metadata: Metadata = {
  title: 'Warranty',
  description: 'Learn about our workmanship warranty coverage for PC builds. Every build is backed by our commitment to quality assembly.',
};

export default function WarrantyPage() {
  return <WarrantyContent />;
}
