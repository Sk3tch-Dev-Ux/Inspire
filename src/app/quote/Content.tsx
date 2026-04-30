'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bot,
  Code2,
  Gamepad2,
  LayoutDashboard,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

/**
 * /quote — Phase 8.
 *
 * A guided single-page quote request. Submits to /api/contact with a
 * structured subject + message so quotes route correctly. No
 * multi-step wizard — every field is on screen at once because this
 * audience prefers seeing the whole form to filling out one question
 * at a time.
 *
 * Sections:
 *   1. Service picker — 4 radio cards (Discord Bots, Discord Layouts,
 *      Web, Game Scripts). Hover/active states show the currently-
 *      selected service.
 *   2. Engagement type — hourly / fixed package / custom quote.
 *      Default flips based on the selected service (Discord Layouts
 *      → fixed; everything else → hourly).
 *   3. Project description — textarea with a budget + timeline pair.
 *   4. Contact info — name + email.
 *   5. Submit — POSTs structured data to /api/contact, shows success
 *      state inline.
 */

interface ServiceOption {
  slug: string;
  title: string;
  icon: LucideIcon;
  defaultMode: EngagementMode;
  hint: string;
}

type EngagementMode = 'hourly' | 'fixed' | 'custom';

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    slug: 'discord-bots',
    title: 'Discord Bots',
    icon: Bot,
    defaultMode: 'hourly',
    hint: '$60/hr · typical $200–$1,500',
  },
  {
    slug: 'discord-layouts',
    title: 'Discord Layouts',
    icon: LayoutDashboard,
    defaultMode: 'fixed',
    hint: '$300 fixed · 1-day delivery',
  },
  {
    slug: 'web',
    title: 'Custom Websites',
    icon: Code2,
    defaultMode: 'hourly',
    hint: '$75/hr · marketing site $1,500',
  },
  {
    slug: 'game-scripts',
    title: 'Game Scripts',
    icon: Gamepad2,
    defaultMode: 'hourly',
    hint: '$80/hr · Rust · DayZ · FiveM',
  },
];

const ENGAGEMENT_LABELS: Record<EngagementMode, { title: string; description: string }> = {
  hourly: {
    title: 'Hourly',
    description: 'Smaller jobs, audits, tweaks. 15-min increments. No upfront deposit below $1,500.',
  },
  fixed: {
    title: 'Fixed-fee package',
    description: 'Known scope, one number. Best for Discord layouts, marketing sites, audits.',
  },
  custom: {
    title: 'Custom quote',
    description: 'Bigger scope — multi-month, multi-bot networks, custom game modes. 24h turnaround.',
  },
};

const TIMELINE_OPTIONS = [
  'ASAP — within a week',
  '2–4 weeks',
  '1–2 months',
  'Flexible / no rush',
];

interface FormState {
  service: string;
  mode: EngagementMode;
  name: string;
  email: string;
  description: string;
  budget: string;
  timeline: string;
}

export default function QuoteContent() {
  const [form, setForm] = useState<FormState>({
    service: '',
    mode: 'hourly',
    name: '',
    email: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // When the operator picks a service, snap the engagement mode to a
  // sensible default for that service. They can still flip it manually.
  function pickService(s: ServiceOption) {
    setForm((prev) => ({
      ...prev,
      service: s.slug,
      mode: s.defaultMode,
    }));
  }

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Pre-build the payload so we send a structured, indexable message
  // through the existing /api/contact endpoint. Subject encodes the
  // service + mode so I can sort the inbox at a glance.
  const buildPayload = useMemo(() => {
    const service = SERVICE_OPTIONS.find((s) => s.slug === form.service);
    const subject = service
      ? `Quote · ${service.title} · ${ENGAGEMENT_LABELS[form.mode].title}`
      : 'Quote · (no service picked)';

    const lines = [
      `Service: ${service?.title || '—'}`,
      `Engagement: ${ENGAGEMENT_LABELS[form.mode].title}`,
      `Budget: ${form.budget || '—'}`,
      `Timeline: ${form.timeline || '—'}`,
      '',
      '— Description —',
      form.description || '(none provided)',
    ];

    return { subject, message: lines.join('\n') };
  }, [form]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('idle');

    if (!form.service) {
      setStatus('error');
      setStatusMessage('Pick a service first.');
      return;
    }
    if (!form.description.trim()) {
      setStatus('error');
      setStatusMessage('A short description goes a long way. Anything is fine — half-baked is welcome.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: buildPayload.subject,
          message: buildPayload.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to send. Try Discord or email instead.');
        setLoading(false);
        return;
      }

      setStatus('success');
      setStatusMessage(
        data.message ||
          "Got it — quote within 24 hours. Check spam in case it lands there."
      );
      setForm({
        service: '',
        mode: 'hourly',
        name: '',
        email: '',
        description: '',
        budget: '',
        timeline: '',
      });
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Try Discord or email instead.');
    } finally {
      setLoading(false);
    }
  }

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

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-12 sm:pt-40 sm:pb-16">
          <nav className="mb-8 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <span className="text-steel">/</span>
            <span className="text-flame">Get a Quote</span>
          </nav>

          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="spec-tag w-fit">free · 24-hour turnaround</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              Tell me what you want{' '}
              <span className="gradient-text">built</span>.
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed">
              No discovery call, no sales pitch. Pick a service, describe
              the work, get a real number within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-steel/60 bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Status banners */}
          {status === 'success' && (
            <div className="mb-6 rounded-xl border-2 border-green-500/30 bg-green-500/10 p-5 text-bone">
              <div className="flex items-start gap-3">
                <CheckCircle size={22} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Quote request sent.</h3>
                  <p className="text-mute">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4 text-bone">
              <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-10">
            {/* Step 1 — Service picker */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="spec-tag mb-2 inline-flex">step 1</span>
                <h2 className="font-display text-2xl font-bold text-bone mt-2">
                  What do you want built?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((s) => {
                  const Icon = s.icon;
                  const active = form.service === s.slug;
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      onClick={() => pickService(s)}
                      className={`flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                        active
                          ? 'border-flame bg-flame/5 shadow-[0_0_24px_rgba(255,107,26,0.15)]'
                          : 'border-steel bg-carbon hover:border-flame/50'
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-lg flex-shrink-0 ${
                          active ? 'bg-flame text-ink' : 'bg-flame/10 text-flame'
                        }`}
                      >
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display font-bold text-bone mb-1">
                          {s.title}
                        </div>
                        <div className="font-mono text-xs text-mute">{s.hint}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 — Engagement mode */}
            {form.service && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="spec-tag mb-2 inline-flex">step 2</span>
                  <h2 className="font-display text-2xl font-bold text-bone mt-2">
                    How do you want it priced?
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['hourly', 'fixed', 'custom'] as const).map((mode) => {
                    const active = form.mode === mode;
                    const meta = ENGAGEMENT_LABELS[mode];
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => update('mode', mode)}
                        className={`rounded-xl border-2 p-4 text-left transition-all ${
                          active
                            ? 'border-flame bg-flame/5'
                            : 'border-steel bg-carbon hover:border-flame/50'
                        }`}
                      >
                        <div className="font-display font-bold text-bone mb-1.5">
                          {meta.title}
                        </div>
                        <div className="text-xs text-mute leading-relaxed">
                          {meta.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3 — Description */}
            {form.service && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="spec-tag mb-2 inline-flex">step 3</span>
                  <h2 className="font-display text-2xl font-bold text-bone mt-2">
                    Describe the work.
                  </h2>
                </div>

                <textarea
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  className="input-field"
                  rows={7}
                  placeholder="Half-baked is fine. Bring screenshots, Discord links, Loom recordings, your messy doc — paste them in. The more I have, the faster I quote."
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quote-budget" className="text-sm font-semibold text-bone">
                      Budget hint <span className="font-normal text-mute">(optional)</span>
                    </label>
                    <input
                      id="quote-budget"
                      type="text"
                      value={form.budget}
                      onChange={(e) => update('budget', e.target.value)}
                      className="input-field"
                      placeholder='e.g. "under $1,000" or "flexible"'
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quote-timeline" className="text-sm font-semibold text-bone">
                      Timeline <span className="font-normal text-mute">(optional)</span>
                    </label>
                    <select
                      id="quote-timeline"
                      value={form.timeline}
                      onChange={(e) => update('timeline', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Pick one…</option>
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — Contact */}
            {form.service && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="spec-tag mb-2 inline-flex">step 4</span>
                  <h2 className="font-display text-2xl font-bold text-bone mt-2">
                    Where should I send the quote?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quote-name" className="text-sm font-semibold text-bone">
                      Name
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="input-field"
                      placeholder="Whatever I should call you"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quote-email" className="text-sm font-semibold text-bone">
                      Email
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            {form.service && (
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between border-t border-steel pt-6">
                <p className="text-xs text-mute leading-relaxed max-w-sm">
                  By submitting, you agree to me reaching out via the email
                  you provide. No newsletter spam, no sales sequences — one
                  quote, one conversation.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {loading ? 'Sending…' : 'Send Quote Request'}
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Alternative CTA — Discord-first */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
            Or just{' '}
            <span className="gradient-text">DM me</span>.
          </h2>
          <p className="mx-auto max-w-xl text-mute mb-8 leading-relaxed">
            Most quote conversations end up on Discord anyway. If you&rsquo;d
            rather skip the form, jump straight to the server.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://discord.gg/inspire-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              <span className="flex items-center gap-2">
                <MessageSquare size={18} />
                Join the Discord
                <ArrowRight size={16} />
              </span>
            </a>
            <Link href="/contact" className="btn-secondary">
              Other contact methods
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
