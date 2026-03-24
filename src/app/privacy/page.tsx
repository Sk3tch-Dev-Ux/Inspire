import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Inspire PC privacy policy. How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-4">
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p className="text-silver mb-12">Last updated: March 2026</p>

        <div className="space-y-8 text-pearl/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Information We Collect</h2>
            <p className="text-silver">
              When you use our services, we collect information you provide directly, including your name, email address, phone number, shipping address, and order details. We also collect payment information through our secure payment processor, Stripe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">How We Use Your Information</h2>
            <p className="text-silver">We use your information to:</p>
            <ul className="list-disc list-inside text-silver mt-2 space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your order status</li>
              <li>Provide customer support</li>
              <li>Send order confirmations and updates</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Payment Processing</h2>
            <p className="text-silver">
              All payment processing is handled by Stripe. We do not store your credit card information on our servers. Stripe&apos;s privacy policy governs their handling of your payment data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Data Security</h2>
            <p className="text-silver">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Third-Party Services</h2>
            <p className="text-silver">
              We use third-party services for payment processing (Stripe) and email communications (Resend). These services have their own privacy policies governing their use of your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Your Rights</h2>
            <p className="text-silver">
              You may request access to, correction of, or deletion of your personal data by contacting us at support@inspirepc.com. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Contact</h2>
            <p className="text-silver">
              Questions about this policy? Contact us at{' '}
              <a href="mailto:support@inspirepc.com" className="text-electric hover:underline">
                support@inspirepc.com
              </a>{' '}
              or call (330) 314-8860.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
