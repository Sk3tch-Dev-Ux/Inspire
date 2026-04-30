import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Inspire Development privacy policy. How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-4">
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p className="text-mute mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-bone/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Information We Collect</h2>
            <p className="text-mute">
              When you contact us or request a quote, we collect the
              information you provide — typically name, email, optional phone
              or Discord handle, and the project details you share. If a
              project moves to invoicing, we also collect billing information
              through our payment processor.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">How We Use Your Information</h2>
            <p className="text-mute">We use your information to:</p>
            <ul className="list-disc list-inside text-mute mt-2 space-y-1">
              <li>Respond to your quote requests and project inquiries.</li>
              <li>Build and deliver the work you&apos;ve engaged us for.</li>
              <li>Send project updates, invoices, and receipts.</li>
              <li>Improve our services and the site.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Payment Processing</h2>
            <p className="text-mute">
              Payment processing is handled by Stripe. We do not store credit
              card numbers on our servers. Stripe&apos;s privacy policy
              governs how they handle your payment data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Data Security</h2>
            <p className="text-mute">
              We use reasonable security measures to protect your information.
              No internet transmission is 100% secure, but we follow standard
              practices: HTTPS, hashed passwords, restricted admin access, and
              minimal data retention.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Third-Party Services</h2>
            <p className="text-mute">
              We use third-party services for payments (Stripe), transactional
              email (Resend), and authentication (Discord, Google). Each has
              its own privacy policy governing how they handle your data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Your Rights</h2>
            <p className="text-mute">
              You may request access to, correction of, or deletion of your
              personal data by emailing{' '}
              <a href="mailto:hello@inspirepc.com" className="text-flame hover:underline">
                hello@inspirepc.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Contact</h2>
            <p className="text-mute">
              Questions about this policy? Reach out at{' '}
              <a href="mailto:hello@inspirepc.com" className="text-flame hover:underline">
                hello@inspirepc.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
