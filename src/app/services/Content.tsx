import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ServiceCard from '@/components/ServiceCard';
import { SERVICES } from '@/lib/services-data';

/**
 * /services index — Phase 3.
 *
 * Lists all four service offerings as ServiceCards (already used on the
 * homepage; no design drift). Each card links to /services/[slug] for
 * the deep page. Below the grid: a "How it works" rail and final CTA
 * that mirrors the homepage so the navigation pattern is consistent.
 */
export default function ServicesContent() {
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
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 107, 26, 0.12) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-40 sm:pb-24">
          <nav className="mb-8 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <span className="text-steel">/</span>
            <span className="text-flame">Services</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="spec-tag w-fit">what i build</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              Four things, <span className="gradient-text">done well</span>.
            </h1>
            <p className="text-lg text-mute leading-relaxed">
              I focus on what I&rsquo;m good at and price it openly. No
              discovery calls, no vague enterprise tiers — pick the service
              that fits, see the rate, get a quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Service grid */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.slug}
                title={s.title}
                description={s.shortDescription}
                icon={s.icon}
                priceMode={s.priceMode}
                price={
                  s.priceMode === 'hourly' ? s.hourlyRate :
                  s.priceMode === 'fixed' ? s.fixedPrice :
                  undefined
                }
                specs={s.specs}
                href={`/services/${s.slug}`}
                badge={s.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing transparency note */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
              Why is the pricing on the homepage?
            </h2>
            <p className="text-mute leading-relaxed text-lg">
              Because I&rsquo;m not going to waste your time with a discovery
              call to tell you a number you can already compare. Hourly rates
              for small jobs, flat fees where the scope is clear, custom
              quotes for anything bigger. If you reach out, you get a
              specific number within 24 hours — not a sales pitch.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Got something you want{' '}
            <span className="gradient-text">built</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Pick a service above, or describe what you&rsquo;re after — I&rsquo;ll quote it within a day.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary">
              <span className="flex items-center gap-2">
                Get a Quote
                <ArrowRight size={18} />
              </span>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span className="flex items-center gap-2">
                <MessageSquare size={16} />
                Or just say hi
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
