import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import {
  PROJECTS,
  getProject,
} from '@/lib/portfolio-data';

/**
 * /portfolio/[slug] — Inspire Development case study.
 *
 * Generated statically at build time for every project in PROJECTS.
 * dynamicParams = false so unknown slugs 404 cleanly (no fall-through
 * to a confusing dynamic miss).
 *
 * Layout follows the buyer's mental model:
 *   1. Hero with cover image
 *   2. Sidebar with date / duration / budget / live link / tech stack
 *   3. Brief — what the client wanted
 *   4. Solution — what got built
 *   5. Outcome — what happened after
 *   6. Other projects (cross-sell, by-category preference)
 *   7. CTA
 *
 * Plus JSON-LD CreativeWork + BreadcrumbList for richer search results.
 */

const SITE_URL = 'https://inspirepc.com';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.outcome,
    alternates: { canonical: `/portfolio/${slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/portfolio/${slug}`,
      siteName: 'Inspire Development',
      title: `${project.title} — ${project.category}`,
      description: project.outcome,
      images: [
        { url: project.imageUrl, width: 1280, height: 800, alt: project.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.outcome,
      images: [project.imageUrl],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const otherProjects = PROJECTS.filter((p) => p.slug !== slug)
    // Same-category projects rank higher so the cross-sell feels relevant
    .sort((a, b) => {
      if (a.category === project.category && b.category !== project.category) return -1;
      if (a.category !== project.category && b.category === project.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.outcome,
    creator: {
      '@type': 'ProfessionalService',
      name: 'Inspire Development',
      url: SITE_URL,
    },
    image: `${SITE_URL}${project.imageUrl}`,
    url: `${SITE_URL}/portfolio/${slug}`,
    dateCreated: project.completedAt,
    keywords: project.techStack.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/portfolio/${slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — cover-image-first */}
      <section className="relative border-b border-steel/60 bg-ink">
        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-12 sm:pt-36">
          <nav className="mb-6 flex items-center gap-2 text-sm text-mute">
            <Link href="/" className="hover:text-flame transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-steel" />
            <Link href="/portfolio" className="hover:text-flame transition-colors">
              Portfolio
            </Link>
            <ChevronRight size={14} className="text-steel" />
            <span className="text-flame">{project.title}</span>
          </nav>

          <div className="mb-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="spec-tag">⚡ {project.category}</span>
              <span
                className={`spec-tag ${
                  project.status === 'shipped'
                    ? 'border-flame/40 bg-flame/10 text-flame'
                    : project.status === 'soft-launch'
                    ? 'border-flame/30 bg-flame/5 text-flame-glow'
                    : 'border-steel bg-carbon text-mute'
                }`}
              >
                {project.status === 'shipped'
                  ? 'shipped'
                  : project.status === 'soft-launch'
                  ? 'soft-launch'
                  : 'in development'}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-bone max-w-4xl">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-mute leading-relaxed max-w-3xl">
              {project.outcome}
            </p>
          </div>

          {/* Cover image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-steel bg-carbon">
            <Image
              src={project.imageUrl}
              alt={`${project.title} — ${project.category}`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Body — copy + sidebar */}
      <section className="border-b border-steel/60 bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Long-form copy */}
          <div className="lg:col-span-2 flex flex-col gap-12">
            <CaseStudyBlock label="brief" title="What the client wanted" paragraphs={project.brief} />
            <CaseStudyBlock
              label="solution"
              title="What got built"
              paragraphs={project.solution}
            />
            <CaseStudyBlock
              label="outcome"
              title="What happened next"
              paragraphs={project.outcomeDetails}
            />
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-steel bg-carbon p-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute mb-3">
                Project facts
              </div>
              <dl className="flex flex-col gap-3 text-sm">
                <Row icon={Calendar} label="Completed" value={project.completedAt} />
                <Row icon={Clock} label="Duration" value={project.duration} />
                <Row icon={DollarSign} label="Budget" value={project.budget} />
              </dl>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-flame/30 bg-flame/5 p-5 transition-colors hover:bg-flame/10"
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-flame mb-2">
                  See it live
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-bone truncate">{project.liveUrl}</span>
                  <ExternalLink size={16} className="text-flame flex-shrink-0 ml-2" />
                </div>
              </a>
            )}

            <div className="rounded-xl border border-steel bg-carbon p-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-mute mb-3">
                Tech stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="spec-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <section className="border-b border-steel/60 bg-carbon/30 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex flex-col gap-3">
                <span className="spec-tag w-fit">other projects</span>
                <h2 className="font-display text-3xl font-bold text-bone">
                  More work like this.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-flame hover:text-flame-glow transition-colors"
              >
                See all
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-steel bg-carbon hover:border-flame transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute left-3 top-3 spec-tag bg-ink/80 backdrop-blur-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-bold text-bone group-hover:text-flame transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-mute leading-relaxed">{p.outcome}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="section-title text-bone">
            Want something{' '}
            <span className="gradient-text">like this</span>?
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

function CaseStudyBlock({
  label,
  title,
  paragraphs,
}: {
  label: string;
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="spec-tag w-fit">{label}</span>
      <h2 className="font-display text-3xl font-bold text-bone">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-mute leading-relaxed text-lg">
          {p}
        </p>
      ))}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-flame mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
          {label}
        </div>
        <div className="text-bone mt-0.5">{value}</div>
      </div>
    </div>
  );
}
