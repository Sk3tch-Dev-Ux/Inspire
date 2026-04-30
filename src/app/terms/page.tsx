import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Inspire Development terms of service. Terms governing custom Discord bot, web, and game-script development engagements.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="section-title mb-4">
          <span className="gradient-text">Terms of Service</span>
        </h1>
        <p className="text-mute mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-bone/90 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Services</h2>
            <p className="text-mute">
              Inspire Development provides custom software development services,
              including Discord bots, Discord server layouts, websites and web
              apps, and game scripts (Rust, DayZ, FiveM). Engagements are billed
              hourly, on a fixed-fee basis, or via custom quote depending on
              scope. Engaging us — whether through a quote request, contract,
              or written confirmation — constitutes acceptance of these terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Quotes & Engagement</h2>
            <ul className="list-disc list-inside text-mute space-y-2">
              <li>Quotes are valid for 30 days from issue and assume the scope agreed at the time of writing.</li>
              <li>Material scope changes after work has begun are billed as additional hours or via a revised fixed fee.</li>
              <li>For projects over $500, a 50% deposit is typically required before work begins; the remainder is due on delivery.</li>
              <li>Hourly engagements are billed weekly or at project milestones, whichever is sooner.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Revisions & Acceptance</h2>
            <ul className="list-disc list-inside text-mute space-y-2">
              <li>Fixed-fee projects include a defined number of revision rounds — usually two — within the agreed scope.</li>
              <li>Revisions outside the original scope are billed at the standard hourly rate.</li>
              <li>Deliverables are considered accepted once you sign off in writing or 7 days after delivery, whichever is sooner.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Intellectual Property</h2>
            <p className="text-mute">
              Once payment for a project is complete, you own the source code
              and assets we deliver for that project. We retain the right to
              reuse generic, non-proprietary patterns and helper code in
              future work, and to feature finished projects in our portfolio
              unless you request otherwise in writing.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Hosting, Keys & Third-Party Services</h2>
            <ul className="list-disc list-inside text-mute space-y-2">
              <li>You are responsible for hosting fees, domain registration, and any third-party API costs (Discord, Stripe, OpenAI, etc.).</li>
              <li>API keys, bot tokens, and credentials remain your property; we will rotate or hand them over on request.</li>
              <li>We will recommend hosting and stack choices but the final decision and account ownership is yours.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Support After Delivery</h2>
            <p className="text-mute">
              Each project includes a brief post-delivery support window —
              typically 7 to 14 days — for fixing bugs in the delivered
              scope. Beyond that window, ongoing maintenance and feature work
              is billed at the standard hourly rate or under a separate
              retainer.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Limitation of Liability</h2>
            <p className="text-mute">
              Inspire Development&apos;s total liability for any project shall
              not exceed the amount paid for that project. We are not liable
              for indirect, incidental, or consequential damages, lost
              profits, or third-party service outages.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-bone mb-3">Contact</h2>
            <p className="text-mute">
              Questions about these terms? Reach out at{' '}
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
