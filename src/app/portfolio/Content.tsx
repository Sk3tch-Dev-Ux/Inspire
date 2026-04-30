'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import PortfolioCard from '@/components/PortfolioCard';
import { PROJECTS, CATEGORIES, type ProjectCategory } from '@/lib/portfolio-data';

/**
 * /portfolio index — Phase 4.
 *
 * Hero, then a row of filter chips ("All", + each category from
 * CATEGORIES), then the grid of PortfolioCards filtered to the
 * active chip. Client component because the filter is interactive
 * (no need to round-trip to the server for a 9-item filter).
 *
 * Project counts are live — adding a Project to portfolio-data.ts
 * automatically updates the chip counts and the grid.
 */

type Filter = 'All' | ProjectCategory;

export default function PortfolioContent() {
  const [active, setActive] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === active);
  }, [active]);

  // Per-chip counts so users see how many projects exist in each
  // category without clicking through.
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: PROJECTS.length };
    for (const c of CATEGORIES) {
      map[c] = PROJECTS.filter((p) => p.category === c).length;
    }
    return map;
  }, []);

  const filters: Filter[] = ['All', ...CATEGORIES];

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
            <span className="text-flame">Portfolio</span>
          </nav>

          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="spec-tag w-fit">recent work</span>
            <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-bone">
              Real projects, <span className="gradient-text">real outcomes</span>.
            </h1>
            <p className="text-lg text-mute leading-relaxed">
              Every entry has a brief, what got built, and what happened
              after. No before-and-after templates, no inflated metrics —
              just receipts.
            </p>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <section className="sticky top-0 z-30 border-b border-steel/60 bg-ink/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-flame bg-flame text-ink'
                      : 'border-steel bg-carbon text-bone hover:border-flame/50 hover:text-flame'
                  }`}
                >
                  {f}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] font-mono font-semibold ${
                      isActive ? 'bg-ink/20 text-ink' : 'bg-ink text-mute'
                    }`}
                  >
                    {counts[f] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="border-b border-steel/60 bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-mute">
              No projects in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <PortfolioCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  category={p.category}
                  outcome={p.outcome}
                  imageUrl={p.imageUrl}
                  liveUrl={p.liveUrl}
                  techStack={p.techStack}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Got a project that&rsquo;d{' '}
            <span className="gradient-text">fit here</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-mute">
            Quote within 24 hours. Most projects start the same week.
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
