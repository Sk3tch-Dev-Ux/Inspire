import type { Metadata } from 'next';
import OrderContent from './Content';

export const metadata: Metadata = {
  title: 'Book a Build',
  description: 'Order your custom PC build from Inspire. Choose your service, add extras, and get started with professional assembly.',
};

export default function OrderPage() {
  return <OrderContent />;
}
