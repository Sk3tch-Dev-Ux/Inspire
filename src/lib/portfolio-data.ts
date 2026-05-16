/**
 * Inspire Development — Portfolio catalog (single source of truth).
 *
 * Used by:
 *   - /portfolio/page.tsx (index with filter chips)
 *   - /portfolio/[slug]/page.tsx (case study deep pages)
 *   - Homepage Content.tsx (recent-work strip pulls `featured: true`)
 *
 * Adding a project: append a Project entry below. The slug becomes
 * /portfolio/<slug>; generateStaticParams in the dynamic page picks
 * up the new slug at build time. Mark `featured: true` to surface
 * on the homepage strip.
 *
 * Current catalog leads with the three in-house products that anchor
 * the studio's work: Clan Ops, Citadel, and Citadel Cloud. Each entry
 * is written honestly — these are in active development / soft-launch,
 * not retrofitted with invented "300+ players" metrics. Service work
 * case studies will get added as real client projects ship.
 */

export type ProjectCategory =
  | 'Product'
  | 'Discord Bot'
  | 'Discord Layout'
  | 'Website'
  | 'Rust'
  | 'DayZ'
  | 'FiveM';

export type ProjectStatus = 'shipped' | 'soft-launch' | 'in-development';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Where this project sits on the build → ship spectrum. */
  status: ProjectStatus;
  /** Card outcome blurb — ~140 chars, what got built and for whom. */
  outcome: string;
  /** Cover image used on cards + case study hero. */
  imageUrl: string;
  /** Mark true to render on the homepage Recent Work strip. */
  featured: boolean;
  /** Display date — "Apr 2026", "Q1 2026", or "In development". */
  completedAt: string;
  /** "5 days", "2 weeks", "Ongoing". */
  duration: string;
  /** "$1,200", "$60/hr × 18hr", or "In-house product". */
  budget: string;
  /** Live demo URL — Discord invite, hosted site. Optional. */
  liveUrl?: string;

  /** Case study sections — written as plain text paragraphs. */
  brief: string[];
  solution: string[];
  outcomeDetails: string[];

  /** Tech stack chips. */
  techStack: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: 'clan-ops',
    title: 'Clan Ops',
    category: 'Product',
    status: 'soft-launch',
    outcome:
      'Discord bot for clan management — rosters, ranks, op scheduling with RSVPs, and a recruitment pipeline. In active soft-launch.',
    imageUrl: '/images/portfolio/placeholder-1.svg',
    featured: true,
    completedAt: 'Soft-launch · 2026',
    duration: 'Ongoing',
    budget: 'In-house product',
    brief: [
      "Clan Ops is the bot I kept ending up rebuilding from scratch for every clan or community I worked with. Roster tracking, rank promotions, operation scheduling with RSVPs, and a clean recruitment pipeline — every clan needs the same primitives, and most stitch them together out of three or four mismatched bots.",
      "Goal: one bot that handles the core operations side of a clan or unit-style Discord, without the bloated feature creep that turns most 'community bots' into a UI nightmare.",
    ],
    solution: [
      "Roster & ranks: members are tracked as rows with rank, join date, and attendance. Officers can promote, demote, or mark inactive via slash commands; the audit trail is logged to a private channel so nothing gets lost.",
      "Op scheduling: officers post an operation with date, time, role slots, and notes. Members RSVP with reactions or a slash command; the bot pings the day-of and tracks who actually showed up vs. who flaked.",
      "Recruitment: applicants run a /apply flow that posts a structured embed into a recruitment channel. Officers vote, add notes, and the bot moves accepted applicants into the right roles and channels automatically.",
    ],
    outcomeDetails: [
      "Soft-launched with a handful of clans I personally know. Iteration is fast — I ship updates the same week a real officer surfaces a real complaint.",
      "Built specifically against the workflows of unit-style and milsim-adjacent clans, but the primitives transfer cleanly to any community that runs scheduled activities.",
      "Public release is gated on feedback from the soft-launch cohort. If you run a clan and want early access, drop into the Discord.",
    ],
    techStack: ['discord.js', 'TypeScript', 'Postgres', 'Node.js'],
  },
  {
    slug: 'citadel',
    title: 'Citadel',
    category: 'Product',
    status: 'soft-launch',
    outcome:
      'Self-hosted game server management panel. One dashboard for Rust, DayZ, and FiveM — server controls, live logs, player tools.',
    imageUrl: '/images/portfolio/placeholder-rust.svg',
    featured: true,
    completedAt: 'Soft-launch · 2026',
    duration: 'Ongoing',
    budget: 'In-house product',
    brief: [
      "Citadel is the panel I always wished existed when I was running game servers. Most off-the-shelf options are either built around a single game (and fall over when you add a second), or they're priced like enterprise software for what's effectively a glorified service-restart UI.",
      "Self-hosted, multi-game, no per-seat pricing, no telemetry, no upsells. Drop it on the same box as your servers and run.",
    ],
    solution: [
      "Web dashboard built in Next.js + TypeScript with a Postgres backing store. Server processes are managed through a thin agent that talks to the dashboard over an authenticated socket — start, stop, restart, hot-reload configs, tail logs in real time.",
      "Player tools: live player list with kick / ban / mute, search across historical sessions, and an audit log so admins can see who issued which command.",
      "Game-aware modules: Rust (Oxide plugin sync, wipe scheduling), DayZ (mod load order, server logs), FiveM (resource manager, txAdmin compatibility) — same UI, game-specific guts under the hood.",
    ],
    outcomeDetails: [
      "Running on my own infrastructure and a small group of soft-launch testers. Stable enough that I use it daily; rough enough that public release is still gated on a few more sharp edges.",
      "Architecture is intentionally boring: Next.js + Postgres + a Go-flavored Node agent. No exotic dependencies, no SaaS vendor lock-in, no surprise infrastructure costs.",
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Postgres', 'Node.js', 'WebSockets'],
  },
  {
    slug: 'citadel-cloud',
    title: 'Citadel Cloud',
    category: 'Product',
    status: 'in-development',
    outcome:
      'Hosted, multi-tenant version of Citadel. For people who want the panel without standing up their own infrastructure.',
    imageUrl: '/images/portfolio/placeholder-web.svg',
    featured: true,
    completedAt: 'In development · 2026',
    duration: 'Ongoing',
    budget: 'In-house product',
    brief: [
      "Citadel solves the panel problem for people who already run a box. Citadel Cloud is for everyone who'd rather not.",
      "Same product surface — server controls, live logs, player tools, game-aware modules — wrapped in a multi-tenant SaaS so a clan or community can sign up, point it at their existing servers, and skip the self-hosting step entirely.",
    ],
    solution: [
      "Multi-tenant Next.js app sharing the same dashboard codebase as self-hosted Citadel. Tenant isolation at the database row level, per-tenant secrets sealed and rotated, no shared connection strings.",
      "Onboarding: connect a server via a lightweight agent install (one command on the host), and the dashboard pairs in seconds. No SSH credentials uploaded, no 'paste your password' nonsense — auth is mutual-TLS between the agent and the control plane.",
      "Billing wired through Stripe with per-server pricing instead of per-seat — the costs scale with what you actually run, not how many admins you have.",
    ],
    outcomeDetails: [
      "Currently in development. Architecture and pricing model are settled; what's left is the multi-tenant control plane and the onboarding agent.",
      "Will open in waves — closed beta first, then a paid early-access tier, then general availability. If you'd want this for your clan or community, the Discord has a #citadel-cloud channel for the waitlist.",
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Postgres', 'Stripe', 'mTLS'],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export const CATEGORIES: ProjectCategory[] = [
  'Product',
  'Discord Bot',
  'Discord Layout',
  'Website',
  'Rust',
  'DayZ',
  'FiveM',
];
