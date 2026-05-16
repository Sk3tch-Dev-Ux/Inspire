import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Code2,
  Gamepad2,
  LayoutDashboard,
  Terminal,
  CheckCircle,
  MessageSquare,
  Zap,
  Package,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import ServiceCard from '@/components/ServiceCard';
import PortfolioCard from '@/components/PortfolioCard';
import { getFeaturedProjects } from '@/lib/portfolio-data';

/**
 * Inspire Development — Homepage.
 *
 * Sections, top to bottom:
 *   1. Hero — positioning + dual CTA
 *   2. Trust strip — three honest credibility chips (years, in-house
 *      products shipping, response time). No invented headcount.
 *   3. In-house products — Clan Ops, Citadel, Citadel Cloud. These
 *      anchor the brand: they show what gets built, not just claimed.
 *   4. Services — 4 ServiceCards covering the four service pillars
 *   5. How it works — 3-step process for service engagements
 *   6. Final CTA — Discord invite + "Get a Quote"
 *
 * The homepage is a server component; interactive bits like the chat
 * widget live in the global layout. Animation wrappers (AnimatedSection)
 * provide reveal-on-scroll for sections.
 *
 * Testimonials were removed deliberately — every quote a freelance site
 * carries should be from a named, verifiable client. When real clients
 * agree to be quoted, this section comes back.
 */

const services = [
  {
    title: 'Discord Bots',
    description:
      'Custom commands, moderation, role management, music, ticketing, in-game integrations. Self-hosted on your infrastructure or mine.',
    icon: Bot,
    priceMode: 'hourly' as const,
    price: 60,
    specs: ['discord.js', 'TypeScript', 'self-hosted'],
    href: '/services/discord-bots',
    badge: 'POPULAR',
  },
  {
    title: 'Discord Layouts',
    description:
      'Full server setup or audit + redesign. Categories, channels, roles, permissions, welcome flows, ticket systems — done in a day.',
    icon: LayoutDashboard,
    priceMode: 'fixed' as const,
    price: 300,
    specs: ['1-day delivery', 'roles · perms', 'ticket system'],
    href: '/services/discord-layouts',
  },
  {
    title: 'Custom Websites',
    description:
      'Marketing sites, web apps, dashboards. Next.js, React, TypeScript, Tailwind. Built fast, deployed on day one, iterated weekly.',
    icon: Code2,
    priceMode: 'hourly' as const,
    price: 75,
    specs: ['Next.js', 'TypeScript', 'Tailwind'],
    href: '/services/web',
  },
  {
    title: 'Game Scripts',
    description:
      'Custom scripts and mods for Rust, DayZ, and FiveM. New game modes, server-side events, admin tools, economy systems.',
    icon: Gamepad2,
    priceMode: 'hourly' as const,
    price: 80,
    specs: ['Rust', 'DayZ', 'FiveM'],
    href: '/services/game-scripts',
  },
];

// Featured projects pulled from the shared portfolio catalog. Mark a
// project featured: true in src/lib/portfolio-data.ts to surface it
// here. The strip caps at the first 3 to keep the page proportions
// right.
const recentWork = getFeaturedProjects().slice(0, 3);

const processSteps = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Tell me what you need',
    description:
      'Discord DM, contact form, or jump on a 15-minute call. Bring screenshots, links, half-baked ideas — whatever you have.',
  },
  {
    step: '02',
    icon: Zap,
    title: 'Quote within 24 hours',
    description:
      'Hourly rate for small jobs, flat fee for known scope, custom estimate for bigger projects. No "discovery calls" or sales fluff.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Built and shipped',
    description:
      'Most projects start the same week. You see progress in your own Discord channel. Pay on completion, or weekly for ongoing work.',
  },
];

export default function HomeContent() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-steel/60 bg-ink">
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-50"
          style={{ backgroundSize: '32px 32px' }}
          aria-hidden="true"
        />
        {/* radial glow behind hero */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 107, 26, 0.15) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <div className="flex flex-col items-start gap-8">
            <span className="spec-tag">
              <Terminal size={12} />
              available · usually replies within 4 hours
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-bone max-w-4xl">
              Discord bots, websites, and game scripts —{' '}
              <span className="gradient-text">built by a developer who plays the games</span>.
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-mute leading-relaxed">
              Custom development for community owners and server admins.
              Hourly rates posted publicly. Quotes within 24 hours. Most
              projects start the same week.
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

        {/* Trust strip — three credibility chips at the bottom */}
        <div className="relative border-t border-steel/60 bg-carbon/40">
          <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-steel/50">
            {[
              { value: '6+', label: 'Years building Discord & game tooling' },
              { value: '3', label: 'In-house products in active development' },
              { value: '24h', label: 'Quote turnaround on every request' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-6 text-center">
                <div className="font-display text-3xl font-bold text-flame">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-mute">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────────── */}
      <section className="border-b border-steel/60 bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-12 flex flex-col gap-4">
              <span className="spec-tag w-fit">what i build</span>
              <h2 className="section-title text-bone">
                Four things, done well.
              </h2>
              <p className="section-subtitle">
                I focus on what I&rsquo;m good at. If you need something here,
                I&rsquo;m your developer. If you need something else,
                I&rsquo;ll tell you who does it better.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recent Work ──────────────────────────────────────── */}
      <section className="border-b border-steel/60 bg-carbon/30 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex flex-col gap-4">
                <span className="spec-tag w-fit">
                  <Package size={12} />
                  what i&rsquo;m shipping
                </span>
                <h2 className="section-title text-bone">
                  In-house products.
                </h2>
                <p className="section-subtitle max-w-2xl">
                  Three products I&rsquo;m building in parallel with client
                  work — the same primitives I keep ending up needing, turned
                  into things you can actually use.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-flame-glow transition-colors"
              >
                See all projects
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentWork.map((p) => (
              <PortfolioCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─────────────────────────────────────── */}
      <section className="border-b border-steel/60 bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-12 text-center">
              <span className="spec-tag">process</span>
              <h2 className="section-title text-bone mt-4">
                Three steps. No sales pitch.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative rounded-xl border border-steel bg-carbon p-6"
                >
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-flame text-ink font-mono text-xs font-bold">
                    {s.step}
                  </div>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-flame/10 text-flame mb-4">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-bone mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mute">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────── */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Got something you want{' '}
            <span className="gradient-text">built</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Quote within 24 hours, every time. If I can&rsquo;t take the job,
            I&rsquo;ll tell you immediately and point you to someone who can.
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
