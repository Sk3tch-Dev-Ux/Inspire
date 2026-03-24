import type { Metadata } from 'next';
import TroubleshootingContent from './Content';

export const metadata: Metadata = {
  title: 'Troubleshooting & Repairs',
  description: 'Professional PC diagnostics, troubleshooting, and repair services. We fix hardware issues, software problems, and optimize performance.',
};

export default function TroubleshootingPage() {
  return <TroubleshootingContent />;
}
