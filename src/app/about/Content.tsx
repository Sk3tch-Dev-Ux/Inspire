import Link from 'next/link';
import {
  ArrowRight,
  MessageSquare,
  Code2,
  Bot,
  Gamepad2,
  Terminal,
  CheckCircle,
  XCircle,
  ChevronRight,
  Package,
  Server,
  Cloud,
} from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

/**
 * /about — Phase 6.
 *
 * Personal-brand page. The audience is Discord/server owners hiring a
 * solo dev — they want to know who they're hiring before they DM.
 *
 * Sections:
 *   1. Hero — first-person introduction
 *   2. Background — short bio with concrete experience markers
 *   3. What I do / don't do — honest scope, two-column compare
 *   4. Tools I actually use — tech stack with brief reasoning
 *   5. How I work — the operator playbook (response time, billing,
 *      handoff)
 *   6. CTA
 *
 * Tone: first person, lowercase OK, direct, no agency-speak.
 */

const TOOLS = [
  {
    category: 'Discord work',
    icon: Bot,
    items: [
      { name: 'discord.js', why: 'Default for new bots. TypeScript end-to-end.' },
      { name: 'discord.py', why: 'When you have an existing Python codebase.' },
      { name: 'Carl-bot, Tickets.bot, MEE6', why: 'Stock options when custom isn\'t needed.' },
    ],
  },
  {
    category: 'Web',
    icon: Code2,
    items: [
      { name: 'Next.js 15 + React 19', why: 'Default. App Router, server components.' },
      { name: 'TypeScript', why: 'Always. No "any" escape hatches.' },
      { name: 'Tailwind v4', why: 'No CSS-in-JS bloat, no MUI sameness.' },
      { name: 'Postgres', why: 'Default DB. SQLite for tiny apps.' },
    ],
  },
  {
    category: 'Game scripts',
    icon: Gamepad2,
    items: [
      { name: 'Oxide / uMod (Rust)', why: 'C# server-side plugins. No client mods.' },
      { name: 'Enscript (DayZ)', why: 'Server-side mods. Some client mods.' },
      { name: 'Lua + JS (FiveM)', why: 'ESX, QBCore-compatible resources.' },
    ],
  },
];

const DO_LIST = [
  'Discord bots — discord.js / discord.py — custom, hosted on your server or mine',
  'Discord layouts — full server setup, audit-and-rebuild, ticket systems',
  'Marketing websites — Next.js, Tailwind, Lighthouse 90+ baseline',
  'Web apps — auth (NextAuth + Discord OAuth), Stripe payments, Postgres',
  'Game scripts — Rust (Oxide/uMod), DayZ (Enscript), FiveM (Lua/JS)',
  'Discord ↔ game bridges — webhook integrations, role-gated whitelists',
];

const DONT_LIST = [
  "WordPress sites — don't do them, don't enjoy them, can refer you out",
  "Client-side Rust mods — they get you banned, no exceptions",
  'Standalone anti-cheats — extending existing ones is fine, building from scratch is a specialty',
  'Long-cycle agency engagements — I\'m solo, I deliver fast or not at all',
  '"AI startup" MVPs unless you have a real plan — I\'m not your $200/hr consultant',
];

const HOW_I_WORK = [
  {
    title: 'Response time',
    body: 'Replies within 4 hours during business days. Quotes within 24 hours, every time.',
  },
  {
    title: 'Communication',
    body:
      "Whatever channel works for you — Discord (preferred), email, SMS. I'll join your server during the project so you can ping me where the work is happening.",
  },
  {
    title: 'Billing',
    body:
      "Hourly tracked in 15-minute increments. Fixed fees where scope is known. Net-14 invoices via Stripe or ACH. No upfront deposits below $1,500.",
  },
  {
    title: 'Handoff',
    body:
      "Source code is yours. Documentation included. I won\'t hold deployments hostage — git access, env vars, hosting login: all transferred at delivery.",
  },
];

export default function AboutContent() {
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
            <span className="text-flame">About</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="spec-tag w-fit">
              <Terminal size={12} />
              hi · solo developer
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              I&rsquo;m the person who{' '}
              <span className="gradient-text">builds it</span>.
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed">
              Inspire Development is a one-person shop. When you hire me, you
              talk to me, you get code from me, and you get support from me.
              No project managers, no offshore handoffs, no ghost senior dev
              on the discovery call who never touches the actual work.
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 flex flex-col gap-6">
          <AnimatedSection>
            <span className="spec-tag w-fit mb-4">background</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-6">
              Six years in. Built for builders.
            </h2>
          </AnimatedSection>

          <p className="text-mute leading-relaxed text-lg">
            I started writing Discord bots in 2020 for a Rust server I helped
            run — the existing options were either too generic or too
            expensive. The bot grew, then someone asked me to make one for
            their server, then another. Six years later, between client
            work and the three in-house products I&rsquo;m shipping
            (Clan Ops, Citadel, Citadel Cloud), this is the full-time gig.
          </p>
          <p className="text-mute leading-relaxed text-lg">
            What I&rsquo;m good at is the intersection of game communities and
            custom dev work — the kind of project where you need someone who
            understands what a wipe is, why your DayZ trader can&rsquo;t be
            generic, what makes a Discord server actually feel like a
            community vs. a chat room.
          </p>
          <p className="text-mute leading-relaxed text-lg">
            I previously ran <em>Inspire PC</em> as a custom-build PC service.
            That business was fine, but it wasn&rsquo;t where my edge was. The
            pivot to development services lets me work on what I&rsquo;m
            measurably better at — and lets you work with someone who&rsquo;s
            playing the same games you are.
          </p>
        </div>
      </section>

      {/* Currently shipping */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">
                <Package size={12} />
                currently shipping
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Three products, in parallel with client work.
              </h2>
              <p className="section-subtitle max-w-2xl">
                Building these in the open. Each one started as a problem I
                kept solving for clients and decided to solve properly,
                once.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Bot,
                name: 'Clan Ops',
                status: 'Soft-launch',
                blurb:
                  'Discord bot for clan management — rosters, ranks, op scheduling with RSVPs, and a recruitment pipeline.',
                href: '/portfolio/clan-ops',
              },
              {
                icon: Server,
                name: 'Citadel',
                status: 'Soft-launch',
                blurb:
                  'Self-hosted game server management panel. One dashboard for Rust, DayZ, and FiveM — server controls, live logs, player tools.',
                href: '/portfolio/citadel',
              },
              {
                icon: Cloud,
                name: 'Citadel Cloud',
                status: 'In development',
                blurb:
                  'Hosted, multi-tenant Citadel. The same panel without the self-hosting step — for clans that just want it to work.',
                href: '/portfolio/citadel-cloud',
              },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.name}
                  href={p.href}
                  className="group flex flex-col gap-4 rounded-xl border border-steel bg-carbon p-6 transition-all hover:-translate-y-1 hover:border-flame hover:shadow-[0_14px_30px_rgba(255,107,26,0.10)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-flame/10 text-flame">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-display text-lg font-bold text-bone group-hover:text-flame transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-flame">
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-mute leading-relaxed">{p.blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame mt-auto">
                    Case study
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* What I do / don't do */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">honest scope</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                What I do, and what I don&rsquo;t.
              </h2>
              <p className="section-subtitle">
                Solo means narrow. I&rsquo;d rather be excellent at four
                things than mediocre at twelve.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-flame/30 bg-flame/5 p-6">
              <h3 className="font-display text-xl font-bold text-bone mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-flame" />
                What I do
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {DO_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-bone leading-relaxed">
                    <CheckCircle size={16} className="text-flame mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-steel bg-carbon p-6">
              <h3 className="font-display text-xl font-bold text-bone mb-4 flex items-center gap-2">
                <XCircle size={20} className="text-mute" />
                What I won&rsquo;t take
              </h3>
              <ul className="flex flex-col gap-3 text-sm">
                {DONT_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-mute leading-relaxed">
                    <XCircle size={16} className="text-steel mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">stack</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                Tools I actually use.
              </h2>
              <p className="section-subtitle">
                If you want a different stack, ask before you commit. I won&rsquo;t fake comfort with tools I&rsquo;m not fluent in.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TOOLS.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.category} className="rounded-xl border border-steel bg-carbon p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-flame/10 text-flame">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-bone">
                      {cat.category}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {cat.items.map((tool) => (
                      <li key={tool.name}>
                        <div className="font-mono text-sm font-semibold text-flame mb-1">
                          {tool.name}
                        </div>
                        <div className="text-xs text-mute leading-relaxed">
                          {tool.why}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="mb-10 flex flex-col gap-3">
              <span className="spec-tag w-fit">how i work</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
                The operator playbook.
              </h2>
              <p className="section-subtitle">
                Four commitments that don&rsquo;t change project to project.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HOW_I_WORK.map((item) => (
              <div key={item.title} className="rounded-xl border border-steel bg-carbon p-6">
                <h3 className="font-display text-xl font-bold text-bone mb-3 flex items-center gap-2">
                  <ChevronRight size={18} className="text-flame" />
                  {item.title}
                </h3>
                <p className="text-mute leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Want to{' '}
            <span className="gradient-text">talk</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Quote within 24 hours, free. If I&rsquo;m not the right fit
            I&rsquo;ll tell you immediately and point you somewhere that is.
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
                Just say hi
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
