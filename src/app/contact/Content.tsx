'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Clock,
  ArrowRight,
} from 'lucide-react';

/**
 * /contact — Phase 7.
 *
 * Two paths to reach me, ranked by preference for this audience:
 *   1. Discord (most natural for this customer profile)
 *   2. Email (works for those who don't live in Discord)
 *   3. Form (for people who don't have either ready)
 *
 * The form POSTs to /api/contact (same backend the old PC site used —
 * we keep the wiring, replace the framing). Success / error states
 * inline below the submit button so the user never wonders what
 * happened.
 */

const CONTACT_CHANNELS = [
  {
    icon: MessageSquare,
    title: 'Discord (preferred)',
    value: 'discord.gg/inspire-dev',
    href: 'https://discord.gg/inspire-dev',
    description:
      'Server has a #hire-me channel — DM me there. Replies within 4 hours during business days.',
    primary: true,
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@inspirepc.com',
    href: 'mailto:hello@inspirepc.com',
    description:
      "Best for documents, longer briefs, or when Discord isn't your thing. Same response window.",
  },
  {
    icon: Clock,
    title: 'Office hours',
    value: 'Mon — Fri, 9 AM – 6 PM ET',
    description:
      "I check messages outside hours but won't quote work or commit to scope until next business day.",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const SUBJECT_OPTIONS = [
  'Discord bot',
  'Discord server setup',
  'Marketing website',
  'Web app',
  'Rust script / mod',
  'DayZ script / mod',
  'FiveM resource',
  "I'm not sure yet",
];

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setStatusMessage(
          data.error || 'Failed to send. Try Discord or email instead.'
        );
        setLoading(false);
        return;
      }

      setStatus('success');
      setStatusMessage(
        data.message ||
          "Got it — replying within 4 hours during business days."
      );
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
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

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <nav className="mb-8 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <span className="text-steel">/</span>
            <span className="text-flame">Contact</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="spec-tag w-fit">replies within 4 hours</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              Three ways to{' '}
              <span className="gradient-text">reach me</span>.
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed">
              Discord, email, or the form below. Whichever works for you. If
              you&rsquo;re asking for a quote, the form below routes
              straight into my queue with the right metadata so I can
              respond faster.
            </p>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="border-b border-steel/60 bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONTACT_CHANNELS.map((c) => {
              const Icon = c.icon;
              const Tag = c.href ? 'a' : 'div';
              return (
                <Tag
                  key={c.title}
                  {...(c.href ? { href: c.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`group rounded-xl border p-6 flex flex-col gap-4 transition-all ${
                    c.primary
                      ? 'border-flame/30 bg-flame/5 hover:border-flame hover:bg-flame/10'
                      : 'border-steel bg-carbon hover:border-flame/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${c.primary ? 'bg-flame text-ink' : 'bg-flame/10 text-flame'}`}>
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-bone">
                      {c.title}
                    </h3>
                  </div>
                  <div className="font-mono text-sm font-semibold text-flame break-all">
                    {c.value}
                  </div>
                  <p className="text-sm text-mute leading-relaxed">{c.description}</p>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 flex flex-col gap-3">
            <span className="spec-tag w-fit">quick contact</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone">
              Or use the form.
            </h2>
            <p className="text-mute leading-relaxed">
              Routes to the same inbox as the email above, but with project
              type tagged so quotes turn around faster.
            </p>
          </div>

          {/* Live status region — announced to screen readers when the
              submit result lands. role="status" is polite; "alert" is
              reserved for the error state so it interrupts. */}
          {status === 'success' && (
            <div
              id="contact-form-status"
              role="status"
              aria-live="polite"
              className="mb-6 flex items-start gap-3 rounded-xl border-2 border-green-500/30 bg-green-500/10 p-4 text-bone"
            >
              <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{statusMessage}</span>
            </div>
          )}
          {status === 'error' && (
            <div
              id="contact-form-status"
              role="alert"
              aria-live="assertive"
              className="mb-6 flex items-start gap-3 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-4 text-bone"
            >
              <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{statusMessage}</span>
            </div>
          )}

          <form
            onSubmit={submit}
            className="flex flex-col gap-5"
            aria-describedby={status !== 'idle' ? 'contact-form-status' : undefined}
            noValidate={false}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-semibold text-bone">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input-field"
                  placeholder="Whatever you want me to call you"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm font-semibold text-bone">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className="text-sm font-semibold text-bone">
                Project type
              </label>
              <select
                id="contact-subject"
                required
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="input-field"
              >
                <option value="">Pick one…</option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm font-semibold text-bone">
                What you&rsquo;re after
              </label>
              <textarea
                id="contact-message"
                required
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="input-field"
                rows={6}
                placeholder="Half-baked ideas welcome. The more detail you give, the better the quote."
              />
              <p className="text-xs text-mute">
                Discord server links, Loom recordings, screenshots — paste
                them right into the message. I&rsquo;ll work with whatever
                you send.
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              <span className="flex items-center gap-2">
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                {loading ? 'Sending…' : 'Send Message'}
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* CTA — push to Discord as primary */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bone mb-4">
            Already on{' '}
            <span className="gradient-text">Discord</span>?
          </h2>
          <p className="mx-auto max-w-xl text-mute mb-8 leading-relaxed">
            Most of my clients prefer DM&rsquo;ing me directly there. Drop in
            and ping me — same response window, less email.
          </p>
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
        </div>
      </section>
    </div>
  );
}
