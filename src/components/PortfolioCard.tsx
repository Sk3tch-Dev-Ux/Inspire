import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

/**
 * PortfolioCard — Phase 1 brand primitive.
 *
 * Surfaces a single past project on /portfolio (and the homepage
 * "recent work" strip). Visual recipe: cover image fills the top
 * with an orange-tinted hover glow, category chip floats over the
 * top-left, title + outcome blurb sit on a carbon strip below.
 *
 * The whole card is a Link to /portfolio/[slug] so phones get one
 * big tap target. If `liveUrl` is provided, an external-link
 * indicator renders top-right (so customers can join a Discord
 * server, view a live site, etc.) — uses stopPropagation so the
 * external link doesn't fight the card link.
 */

export interface PortfolioCardProps {
  /** URL slug under /portfolio/. */
  slug: string;
  /** Project title — short, descriptive. */
  title: string;
  /** Category label. Renders as the spec-tag chip. */
  category: 'Discord Bot' | 'Discord Layout' | 'Website' | 'Rust' | 'DayZ' | 'FiveM' | string;
  /** Outcome blurb — what the customer got out of it. ~140 chars. */
  outcome: string;
  /** Public-facing image — first screenshot, before/after composite, etc. */
  imageUrl: string;
  /** Optional external link (Discord invite, live site URL, etc.) */
  liveUrl?: string;
  /** Optional tech-stack tags to render as chips along the bottom. */
  techStack?: string[];
  className?: string;
}

export default function PortfolioCard({
  slug,
  title,
  category,
  outcome,
  imageUrl,
  liveUrl,
  techStack,
  className = '',
}: PortfolioCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-steel bg-carbon transition-all hover:-translate-y-1 hover:border-flame hover:shadow-[0_14px_30px_rgba(255,107,26,0.10)] ${className}`}
    >
      {/* Cover image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Image
          src={imageUrl}
          alt={`${title} — ${category} project`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Bottom gradient so the category chip + image edge read cleanly */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />

        {/* Category chip top-left */}
        <span className="absolute left-3 top-3 spec-tag bg-ink/80 backdrop-blur-sm">
          {category}
        </span>

        {/* External link indicator top-right */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/80 text-bone backdrop-blur-sm transition-colors hover:bg-flame hover:text-ink"
            aria-label={`Open ${title} live`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-bold text-bone group-hover:text-flame transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-mute">{outcome}</p>

        {techStack && techStack.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] text-mute"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
