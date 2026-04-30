import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Code2,
  Gamepad2,
  LayoutDashboard,
  CheckCircle,
  ChevronRight,
  MessageSquare,
  Clock,
  Wallet,
  Receipt,
  Calculator,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

/**
 * /pricing — Phase 5.
 *
 * The brand-pillar page. "Predictable pricing posted publicly" is one
 * of the four pillars in BRAND.md, so this surface has to carry it
 * alone — no hedging, no "starting at" weasel-words on top items.
 *
 * Sections:
 *   1. Hero — pricing manifesto
 *   2. Hourly rates table — direct $X/hr for each service category
 *   3. Fixed-fee packages — flat-fee offerings where scope is known
 *   4. Custom quote callout — when to skip the hourly path
 *   5. How billing works — payment terms, no-surprise commitments
 *   6. FAQ specific to pricing concerns
 *   7. CTA
 */

const HOURLY_TIERS = [
  {
    title: 'Discord Bots',
    icon: Bot,
    rate: 60,
    serviceSlug: 'discord-bots',
    typicalRange: '$200 – $1,500',
    description:
      'Most bot builds take 4–25 hours. Small command additions to existing bots: 1–4 hours.',
  },
  {
    title: 'Custom Websites',
    icon: Code2,
    rate: 75,
    serviceSlug: 'web',
    typicalRange: '$1,500 – $4,000',
    description:
      'Marketing sites: typically fixed-fee. Web apps with auth/DB/payments: hourly because scope grows.',
  },
  {
    title: 'Game Scripts',
    icon: Gamepad2,
    rate: 80,
    serviceSlug: 'game-scripts',
    typicalRange: '$400 – $2,000',
    description:
      'Niche skill, 15% premium over web. Rust, DayZ, FiveM. Larger custom mods quoted as projects.',
  },
];

const FIXED_PACKAGES = [
  {
    title: 'Discord Server Setup',
    icon: LayoutDashboard,
    price: 300,
    serviceSlug: 'discord-layouts',
    deliveryTime: '1 day',
    includes: [
      'Audit of existing server (or clean-slate build)',
      '8+ categories, 40+ channels, full role hierarchy',
      'Welcome flow with rules-acceptance gating',
      'Ticket system configured (Tickets.bot or similar)',
      'Pre-configured moderation bots (Carl-bot / Dyno / MEE6)',
      'Handoff doc for training your moderators',
    ],
  },
  {
    title: 'Marketing Website',
    icon: Code2,
    price: 1800,
    serviceSlug: 'web',
    deliveryTime: '1 week',
    includes: [
      'Up to 6 pages (home, about, services, contact, etc.)',
      'Mobile-responsive, Lighthouse 90+',
      'Custom design — no template-feel',
      'SEO baseline (meta tags, OG images, JSON-LD)',
      'Deploy + domain setup (Vercel free tier or your VPS)',
      '2 weeks of post-launch tweaks included',
    ],
    badge: 'POPULAR',
  },
  {
    title: 'Discord Server Audit',
    icon: Receipt,
    price: 60,
    serviceSlug: 'discord-layouts',
    deliveryTime: '1 hour',
    includes: [
      '1-hour written audit of your existing Discord',
      'Specific recommendations for structure, roles, perms',
      'Bot-stack review with replacement suggestions',
      'Welcome flow + onboarding analysis',
      'No rebuild — DIY-friendly findings, take it from there',
    ],
  },
];

const billingPoints = [
  {
    icon: Clock,
    title: 'Track time honestly',
    description:
      "Hourly time logged in 15-minute increments. I don't pad. If a 1-hour estimate finishes in 40 minutes, you pay for 40 minutes.",
  },
  {
    icon: Wallet,
    title: 'Pay on delivery',
    description:
      "Most projects: invoice when shipped, pay within 14 days. Stripe (card) or direct deposit. No upfront deposits for sub-$1,500 jobs.",
  },
  {
    icon: Calculator,
    title: 'Quotes never grow silently',
    description:
      "If a project is going over the original estimate by more than 20%, I stop and tell you before continuing. No 'oh by the way, I'm at $4,000 now.'",
  },
];

const PRICING_FAQ = [
  {
    question: 'Do you charge for the initial quote?',
    answer:
      "No. Quotes are free, every time, within 24 hours of you reaching out. If the project doesn't make sense for me to take, I'll tell you that for free too — and usually point you to someone who's a better fit.",
  },
  {
    question: 'What if my project goes over the original estimate?',
    answer:
      "If we're approaching 120% of the quoted amount, I stop and tell you. You decide whether to keep going (with a new estimate), descope, or wrap. You never get a surprise bill at the end.",
  },
  {
    question: 'Do you do retainers?',
    answer:
      "Yes — for ongoing maintenance: $40/mo per game-script (covers game-update compatibility), $200/mo for web app maintenance (up to 3 hours of changes + on-call for breakages), or $15/mo bot hosting if you want me to run it on my VPS.",
  },
  {
    question: 'How does payment work for hourly billing?',
    answer:
      "Two patterns: (1) For shorter engagements (<20 hrs), invoice on delivery. (2) For ongoing work, weekly invoices every Friday for hours logged that week, payable within 7 days.",
  },
  {
    question: 'Refunds?',
    answer:
      "If something I delivered doesn't work as we agreed and I can't fix it within a reasonable window, I'll refund. This basically never comes up — projects ship working — but the answer is yes, refund.",
  },
  {
    question: 'Stripe? Crypto? Bank transfer?',
    answer:
      "Stripe (any card) and direct bank transfer (ACH/wire) for everyone. Crypto (BTC/ETH/USDC) on request — happy to use it but the rate locks at the time of invoice.",
  },
];

export default function PricingContent() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-steel/60 bg-ink">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-50"
          style={{ backgroundSize: '32px 32px' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 107, 26, 0.14) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <nav className="mb-8 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <span className="text-steel">/</span>
            <span className="text-flame">Pricing</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="spec-tag w-fit">no discovery calls</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              The price is <span className="gradient-text">on the page</span>.
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed">
              Hourly rates for everything I build. Fixed fees where the scope
              is clear. Custom quotes within 24 hours for anything bigger.
              No "schedule a call to learn more." No "tier 1, tier 2,
              enterprise." Just numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Hourly rates */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">hourly</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Hourly rates by category.
              </h2>
              <p className="section-subtitle">
                Best for small features, bug fixes, audits, and exploratory
                work where scope is fluid. Time tracked in 15-minute
                increments — you don&rsquo;t pay for full hours when 40
                minutes finished the job.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOURLY_TIERS.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.title}
                  href={`/services/${t.serviceSlug}`}
                  className="card group flex flex-col gap-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-ink">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-bone group-hover:text-flame transition-colors">
                      {t.title}
                    </h3>
                  </div>

                  <div>
                    <div className="font-display text-5xl font-bold text-flame leading-none">
                      ${t.rate}
                      <span className="text-2xl text-mute font-medium ml-1">
                        /hr
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-mute leading-relaxed">
                    {t.description}
                  </p>

                  <div className="border-t border-steel pt-4">
                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute mb-1">
                      Typical project
                    </div>
                    <div className="font-mono text-base font-semibold text-bone">
                      {t.typicalRange}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fixed-fee packages */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">fixed-fee packages</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Known-quantity outcomes, flat fee.
              </h2>
              <p className="section-subtitle">
                When the scope is clear up front, hourly billing is just
                paperwork. These flat-fee packages let you pay one number
                for one outcome.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FIXED_PACKAGES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="relative rounded-2xl border border-steel bg-carbon p-6 flex flex-col gap-5 hover:border-flame transition-colors"
                >
                  {p.badge && (
                    <span className="absolute right-5 top-5 spec-tag">
                      {p.badge}
                    </span>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-flame/10 text-flame">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-bone">
                      {p.title}
                    </h3>
                  </div>

                  <div>
                    <div className="font-display text-5xl font-bold text-flame leading-none">
                      ${p.price.toLocaleString()}
                    </div>
                    <div className="mt-2 text-xs uppercase tracking-[0.2em] text-mute">
                      Delivers in {p.deliveryTime}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5 text-sm">
                    {p.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={16}
                          className="text-flame mt-0.5 flex-shrink-0"
                          strokeWidth={2}
                        />
                        <span className="text-bone leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 border-t border-steel">
                    <Link
                      href="/quote"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-flame-glow transition-colors"
                    >
                      Get this package
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Custom quote callout */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-2xl border-2 border-flame/30 bg-flame/5 p-8 sm:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-flame text-ink">
                <Calculator size={20} strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bone">
                Custom quote
              </h2>
            </div>
            <p className="text-mute leading-relaxed text-lg">
              For larger projects — multi-month engagements, custom game
              modes, full multi-bot networks, or anything that doesn&rsquo;t
              fit a category above — I quote a flat fee or a per-milestone
              fee after a 15-minute call.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="spec-tag">turnaround: 24 hours</span>
              <span className="spec-tag">no fee for the quote</span>
              <span className="spec-tag">no obligation</span>
            </div>
            <div className="mt-2">
              <Link href="/quote" className="btn-primary w-fit">
                <span className="flex items-center gap-2">
                  Request a Custom Quote
                  <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How billing works */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3 text-center">
              <span className="spec-tag mx-auto w-fit">how billing works</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Three commitments. No exceptions.
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {billingPoints.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-xl border border-steel bg-carbon p-6 flex flex-col gap-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-flame/10 text-flame">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-bone">
                    {b.title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">faq</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Pricing questions, answered.
              </h2>
            </div>
          </AnimatedSection>
          <div className="flex flex-col gap-4">
            {PRICING_FAQ.map((q, i) => (
              <details
                key={i}
                className="group rounded-xl border border-steel bg-carbon p-5 transition-colors hover:border-flame/50"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="font-semibold text-bone">{q.question}</span>
                  <ChevronRight
                    size={20}
                    className="text-flame mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90"
                  />
                </summary>
                <p className="mt-3 text-mute leading-relaxed">{q.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Ready to get a{' '}
            <span className="gradient-text">specific number</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Quote within 24 hours. If it doesn&rsquo;t fit, I&rsquo;ll tell
            you immediately. No "fill out this form for a personalized
            consultation."
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary">
              <span className="flex items-center gap-2">
                Get a Quote
                <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/services" className="btn-secondary">
              <span className="flex items-center gap-2">
                <MessageSquare size={16} />
                See What I Build
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
