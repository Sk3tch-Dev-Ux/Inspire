import type { Metadata } from 'next';
import LoginContent from './Content';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Inspire PC account to track orders and get support.',
};

export default function LoginPage() {
  return <LoginContent />;
}
