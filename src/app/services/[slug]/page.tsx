import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { SERVICES, getService, formatPrice } from '@/lib/services-data';

/**
 * /services/[slug] — Inspire Development service detail.
 *
 * Generated statically at build time for every entry in SERVICES.
 * Adding a new service = appending to the SERVICES array; the page
 * lights up automatically without any per-service code.
 *
 * Section flow:
 *   1. Hero — breadcrumb, title, short description, dual CTA
 *   2. Long-form description + sidebar (price, tech stack)
 *   3. What's included (feature list)
 *   4. How it works (process steps)
 *   5. Other services (cross-sell)
 *   6. FAQ
 *   7. Final CTA + JSON-LD Service schema
 */

const SITE_URL = 'https://inspirepc.com';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Service Not Found' };

  const title = `${service.title} — Inspire Development`;
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/services/${slug}`,
      siteName: 'Inspire Development',
      title,
      description: service.shortDescription,
      images: [{ url: '/og-banner.svg', width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3);

  // JSON-LD Service schema for richer search snippets.
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription.join(' '),
    serviceType: service.title,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Inspire Development',
      url: SITE_URL,
    },
    url: `${SITE_URL}/services/${slug}`,
    ...(service.priceMode === 'hourly' && service.hourlyRate
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: service.hourlyRate,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: service.hourlyRate,
              priceCurrency: 'USD',
              unitCode: 'HUR',
            },
          },
        }
      : service.priceMode === 'fixed' && service.fixedPrice
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: service.fixedPrice,
            },
          }
        : {}),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${SITE_URL}/services/${slug}` },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 sm:pt-36 sm:pb-24">
          <nav className="mb-8 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-steel" />
            <Link href="/services" className="hover:text-flame transition-colors">
              Services
            </Link>
            <ChevronRight size={14} className="text-steel" />
            <span className="text-flame">{service.title}</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-flame/10 text-flame">
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed">
              {service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-primary">
                <span className="flex items-center gap-2">
                  Get a Quote
                  <ArrowRight size={18} />
                </span>
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                See Recent Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Long-form + sidebar */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Long-form copy */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="font-display text-3xl font-bold text-bone">
              About this service
            </h2>
            {service.longDescription.map((p, i) => (
              <p key={i} className="text-mute leading-relaxed text-lg">
                {p}
              </p>
            ))}
          </div>

          {/* Sidebar — pricing + tech stack */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-steel bg-carbon p-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute">
                {service.priceMode === 'custom' ? 'Bigger projects' : 'Starting at'}
              </div>
              <div className="mt-2 font-display text-4xl font-bold text-flame">
                {formatPrice(service)}
              </div>
              <p className="mt-3 text-sm text-mute leading-relaxed">
                {service.priceExplainer}
              </p>
            </div>

            <div className="rounded-xl border border-steel bg-carbon p-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute mb-3">
                Tech stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.techStack.map((tech) => (
                  <span key={tech} className="spec-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* What's included */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-3">
            <span className="spec-tag w-fit">what&rsquo;s included</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
              Every project ships with this baseline.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  className="text-flame flex-shrink-0 mt-0.5"
                  strokeWidth={1.75}
                />
                <span className="text-bone leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <span className="spec-tag mx-auto w-fit">process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
              Three steps. No sales pitch.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.process.map((s) => (
              <div
                key={s.step}
                className="relative rounded-xl border border-steel bg-carbon p-6"
              >
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-flame text-ink font-mono text-xs font-bold">
                  {s.step}
                </div>
                <h3 className="font-display text-xl font-bold text-bone mb-2 mt-4">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 flex flex-col gap-3">
            <span className="spec-tag w-fit">faq</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
              Common questions.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {service.faq.map((q, i) => (
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

      {/* Other services */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-3">
            <span className="spec-tag w-fit">other services</span>
            <h2 className="font-display text-3xl font-bold text-bone">
              Need something different?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherServices.map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-xl border border-steel bg-carbon p-6 hover:border-flame hover:-translate-y-1 transition-all"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-flame/10 text-flame group-hover:bg-flame group-hover:text-ink transition-colors">
                    <OtherIcon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-bone group-hover:text-flame transition-colors mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-mute leading-relaxed mb-4">
                    {s.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-flame">
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Ready to build{' '}
            <span className="gradient-text">{service.title.toLowerCase()}</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Quote within 24 hours, every time. If I can&rsquo;t take the job,
            I&rsquo;ll tell you immediately and point you somewhere that can.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-primary">
              <span className="flex items-center gap-2">
                Start a Project
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
