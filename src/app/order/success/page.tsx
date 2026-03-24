import type { Metadata } from 'next';
import OrderSuccessContent from './Content';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your build order has been submitted successfully. We\'ll be in touch within 24 hours.',
};

export default function OrderSuccessPage() {
  return <OrderSuccessContent />;
}
