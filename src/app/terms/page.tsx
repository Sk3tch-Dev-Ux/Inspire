import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Inspire PC terms of service. Terms and conditions for using our PC building and repair services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-4">
          <span className="gradient-text">Terms of Service</span>
        </h1>
        <p className="text-silver mb-12">Last updated: March 2026</p>

        <div className="space-y-8 text-pearl/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Services</h2>
            <p className="text-silver">
              Inspire PC provides custom PC building, troubleshooting, repair, and upgrade services. By placing an order, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Orders & Payment</h2>
            <ul className="list-disc list-inside text-silver space-y-2">
              <li>All prices are listed in USD and are subject to change without notice.</li>
              <li>Payment is required before work begins on your build or repair.</li>
              <li>Orders may be cancelled within 24 hours of placement for a full refund.</li>
              <li>After work has begun, cancellations may be subject to a service fee.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Parts & Components</h2>
            <ul className="list-disc list-inside text-silver space-y-2">
              <li>Customers are responsible for purchasing and shipping their own parts unless using our Budget Build Planning service.</li>
              <li>We are not responsible for defective or DOA (Dead on Arrival) parts. We will assist with manufacturer RMA processes.</li>
              <li>Parts must be new and in original packaging unless otherwise agreed upon.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Warranty</h2>
            <p className="text-silver">
              Our workmanship warranty covers assembly and labor defects. Standard warranty is 30 days from completion. Extended warranty options are available at additional cost. See our{' '}
              <a href="/warranty" className="text-electric hover:underline">Warranty page</a>{' '}
              for full coverage details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Shipping</h2>
            <ul className="list-disc list-inside text-silver space-y-2">
              <li>Customers are responsible for shipping parts to our facility.</li>
              <li>Return shipping of completed builds is the customer&apos;s responsibility unless otherwise arranged.</li>
              <li>We take reasonable care in packaging but are not liable for shipping damage by carriers.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Limitation of Liability</h2>
            <p className="text-silver">
              Inspire PC&apos;s total liability shall not exceed the amount paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-pearl mb-3">Contact</h2>
            <p className="text-silver">
              Questions about these terms? Contact us at{' '}
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
