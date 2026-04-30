import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

/**
 * ServiceCard — Phase 1 brand primitive.
 *
 * Used to advertise a service or service tier on the homepage,
 * /services index, and pricing pages. Three pricing modes:
 *
 *   priceMode="hourly"  → "$60/hr" suffix
 *   priceMode="fixed"   → "$300" suffix
 *   priceMode="custom"  → "Custom quote" pill instead of a number
 *
 * Design: dark carbon surface, orange accent line on the icon side
 * that brightens on hover, mono-font spec tags below the description
 * to anchor the technical brand voice. Full card is a link so the
 * whole surface is tappable on mobile.
 */

export interface ServiceCardProps {
  /** Heading — short, action-leading: "Discord Bots", "Rust Scripts". */
  title: string;
  /** One-sentence what-you-get summary. */
  description: string;
  /** Lucide icon for the corner badge. */
  icon: LucideIcon;
  /** Pricing mode + value. */
  priceMode: 'hourly' | 'fixed' | 'custom';
  /** Numeric price (ignored when priceMode === "custom"). */
  price?: number;
  /** Mono-style spec tags rendered as chips below the description. */
  specs?: string[];
  /** Where the card links to. */
  href: string;
  /** Optional "POPULAR" or "STARTING AT" badge top-right. */
  badge?: string;
  className?: string;
}

function formatPrice(mode: ServiceCardProps['priceMode'], price?: number): string {
  if (mode === 'custom') return 'Custom quote';
  const n = typeof price === 'number' ? `$${price}` : '$—';
  return mode === 'hourly' ? `${n}/hr` : n;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  priceMode,
  price,
  specs,
  href,
  badge,
  className = '',
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`card group relative flex flex-col gap-5 ${className}`}
    >
      {badge && (
        <span className="absolute right-5 top-5 spec-tag">{badge}</span>
      )}

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-flame/10 text-flame transition-colors group-hover:bg-flame group-hover:text-ink">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-2xl font-bold text-bone group-hover:text-flame transition-colors">
          {title}
        </h3>
      </div>

      <p className="text-mute leading-relaxed">{description}</p>

      {specs && specs.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {specs.map((spec) => (
            <span key={spec} className="spec-tag">
              {spec}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-steel pt-4">
        <div>
          <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-mute">
            {priceMode === 'custom' ? 'Bigger projects' : 'Starting at'}
          </span>
          <span className="font-display text-2xl font-bold text-bone">
            {formatPrice(priceMode, price)}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame">
          Learn more
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
