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
 * Currently populated with placeholder case studies — replace as real
 * client work ships. The structure intentionally mirrors how a buyer
 * evaluates a portfolio entry: brief → solution → outcome → tech, in
 * that order.
 */

export type ProjectCategory =
  | 'Discord Bot'
  | 'Discord Layout'
  | 'Website'
  | 'Rust'
  | 'DayZ'
  | 'FiveM';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Card outcome blurb — ~140 chars, what the customer got. */
  outcome: string;
  /** Cover image used on cards + case study hero. */
  imageUrl: string;
  /** Mark true to render on the homepage Recent Work strip. */
  featured: boolean;
  /** Display date — "Apr 2026", "Q1 2026". */
  completedAt: string;
  /** "5 days", "2 weeks". */
  duration: string;
  /** "$1,200" or "$60/hr × 18hr" — short. */
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
    slug: 'rust-server-shop-bot',
    title: 'Rust Server Shop Bot',
    category: 'Discord Bot',
    outcome:
      'In-game shop, role-based pricing, Steam OAuth — replaced their previous $200/mo SaaS with a one-time $1,200 build.',
    imageUrl: '/images/portfolio/placeholder-1.svg',
    featured: true,
    completedAt: 'Apr 2026',
    duration: '5 days',
    budget: '$1,200 fixed',
    liveUrl: 'https://discord.gg/example-rust',
    brief: [
      "A 600-player Rust community was paying $200/month for a generic shop SaaS that gave them slow checkout, no role-based pricing, and zero customization. They wanted to keep the in-game shop concept but build it bespoke so they could customize loadouts, add VIP-only items, and track inventory across wipes.",
      "Hard requirement: integrate with their existing Steam-OAuth-gated whitelist so only verified players could buy.",
    ],
    solution: [
      "Custom Discord bot in TypeScript with discord.js, backed by Postgres for inventory and player credits. Slash commands for browsing the shop, role-aware pricing (VIP gets 25% off), and a server-side hook in their Oxide plugin to deliver items in-game once a purchase clears.",
      "Steam OAuth gate matches the player's Discord ID to their existing whitelist row before any purchase confirms — same flow, no double-verify.",
      "Web dashboard for the admin to add new items, adjust prices, and run sales without touching code.",
    ],
    outcomeDetails: [
      "Build delivered in 5 days. Replaced a $200/mo recurring cost with a $1,200 one-time fee — paid back in 6 months.",
      "Shop checkout went from a 4-step flow to one slash command. Daily transactions doubled in the first wipe after launch.",
      "Admin reports 'I haven't logged into the SaaS dashboard once since this shipped.'",
    ],
    techStack: ['discord.js', 'TypeScript', 'Postgres', 'Steam API', 'Oxide hook'],
  },
  {
    slug: 'gaming-community-layout',
    title: 'Gaming Community Server',
    category: 'Discord Layout',
    outcome:
      '1,200-member community, full restructure: 8 categories, 40+ channels, role-gated regions, automated onboarding.',
    imageUrl: '/images/portfolio/placeholder-2.svg',
    featured: true,
    completedAt: 'Mar 2026',
    duration: '1 day',
    budget: '$300 fixed',
    brief: [
      "An established 1,200-member gaming community had grown organically over three years. The result: 80+ channels with no clear categories, 30 roles with overlapping permissions, and a welcome flow that confused everyone. New members joined and never posted because they couldn't figure out where to.",
      "Goal: keep every active channel, but reorganize so first-time visitors instantly know where to participate.",
    ],
    solution: [
      "Audited the server for one hour, then rebuilt the structure on a duplicate so the live community wasn't disturbed during the work. Final structure: 8 categories tied to game/region (Rust, DayZ, EU/NA voice, mod team, etc.), 40 channels (down from 80 — merged duplicates), and a clean role hierarchy.",
      "Welcome flow: new members land in a single read-only #welcome channel with a rules-acceptance reaction. Once accepted, they pick their region and get auto-routed to the appropriate game-specific lobby.",
      "Tickets.bot configured with topic routing — bug reports, applications, and admin-help all get separate response queues.",
    ],
    outcomeDetails: [
      "Migration to live server happened during a 90-minute maintenance window with no member loss.",
      "First-week-active members (people who post in their first 7 days) jumped from 18% to 41%.",
      "Mod team time spent on 'where do I post X' questions: down to roughly zero.",
    ],
    techStack: ['Discord', 'Tickets.bot', 'Carl-bot', 'role-gating'],
  },
  {
    slug: 'dayz-trader-mod',
    title: 'DayZ Custom Trader',
    category: 'DayZ',
    outcome:
      'Server-side trader mod with dynamic pricing, faction discounts, and a web dashboard for the server admin.',
    imageUrl: '/images/portfolio/placeholder-3.svg',
    featured: true,
    completedAt: 'Feb 2026',
    duration: '2 weeks',
    budget: '$2,400 fixed',
    brief: [
      "Hardcore DayZ PvE community (200+ active players) wanted a trader system that wasn't generic. They wanted dynamic pricing based on item availability across the map, faction-based discounts (joining a faction unlocked 15% off at allied trader zones), and an admin dashboard so the server owner could tweak pricing without restarting the server.",
      "Specifically out of scope: anything that required a client-side mod (they wanted server-side-only so members didn't have to install anything).",
    ],
    solution: [
      "Enscript trader mod, fully server-side. Three trader zones at fixed map locations. Dynamic pricing reads current global supply from a Postgres table updated whenever any player loots or trades — when an item is rare, prices rise; when common, prices fall.",
      "Faction system tied to existing Discord roles via a small bridge bot. Players self-assign factions in Discord; the server pulls faction membership at trader-zone entry and applies the discount.",
      "Admin web dashboard (Next.js) shows live trader activity, lets the admin adjust base prices, set/freeze sales, and ban a player from a specific trader zone if they're cheating.",
    ],
    outcomeDetails: [
      "Mod has run for 8 weeks with zero crashes. Server tick stayed within 1ms of pre-mod baseline.",
      "Faction membership tripled in the first month after launch — the discount was enough incentive to commit.",
      "Admin: 'Best mod purchase I've made since the server started.' Now on a $40/mo retainer for game-update maintenance.",
    ],
    techStack: ['Enscript', 'C#', 'Postgres', 'Next.js', 'discord.js'],
  },
  {
    slug: 'moderation-bot-typescript',
    title: 'Anti-Raid Moderation Bot',
    category: 'Discord Bot',
    outcome:
      'Automated raid detection, mass-ban tooling, mod escalation flow. Built for a 4,000-member server hit twice in a month.',
    imageUrl: '/images/portfolio/placeholder-1.svg',
    featured: false,
    completedAt: 'Mar 2026',
    duration: '8 days',
    budget: '$60/hr × 22hr',
    brief: [
      "A 4,000-member crypto-adjacent Discord got raided twice in 30 days — coordinated bot accounts joining and spamming scams. Default Discord verification gates weren't catching them. Manual moderation couldn't keep up.",
      "They wanted heuristics-based auto-detection plus a tooling layer that let mods undo damage in one click instead of clicking through 200 individual member panels.",
    ],
    solution: [
      "Custom moderation bot with three layers: (1) account-age + recent-account-cluster detection on join (flag accounts <14 days old joining within 60s of each other), (2) message-pattern detection (cross-channel spam, identical messages from N members, common scam URLs), and (3) one-click mod tooling for `mass-ban-since-timestamp`, `purge-by-pattern`, and audit-log replay.",
      "All actions logged to a private mod-log channel with reversal commands. Auto-actions are reversible; mods can review and unban legitimate accidental hits.",
    ],
    outcomeDetails: [
      "Two raid attempts since launch — both auto-stopped within 90 seconds, ~30 bot accounts banned automatically with no human intervention.",
      "Mod team estimates they're saving 4–6 hours/week on routine spam cleanup.",
    ],
    techStack: ['discord.js', 'TypeScript', 'Postgres', 'Redis'],
  },
  {
    slug: 'rust-economy-overhaul',
    title: 'Rust Server Economy Overhaul',
    category: 'Rust',
    outcome:
      'Custom currency system, kit shop, and player-trading hooks. Replaced 4 separate plugins with one cohesive economy.',
    imageUrl: '/images/portfolio/placeholder-rust.svg',
    featured: false,
    completedAt: 'Feb 2026',
    duration: '3 weeks',
    budget: '$3,200 fixed',
    brief: [
      "Server was running 4 different paid plugins for currency, shop, kits, and player-trading — none designed to work together. Players had to learn 4 different command sets, plugin updates broke each other monthly, and the server admin spent more time debugging plugin conflicts than running the server.",
      "Goal: one unified system, single currency, consistent commands, no plugin conflicts.",
    ],
    solution: [
      "Single Oxide plugin in C# implementing the full economy: a `coins` currency earned from playtime, kills, and quest completion; a slash-style chat command set for `/shop`, `/kit`, `/trade`, `/balance`; and a player-trade flow with a 60-second confirmation window to prevent scams.",
      "Backend in Postgres, accessed through a thin connection pool to avoid the typical 'plugin makes 50 SQL queries on join' antipattern.",
      "Discord bridge: mods can issue refunds, view economy stats, and see top players from a Discord channel without logging into the game.",
    ],
    outcomeDetails: [
      "Removed 4 paid plugins ($30/mo combined) — replaced with one custom plugin and zero recurring cost.",
      "Player-trade scams (which were a weekly problem before) dropped to zero in the first month.",
      "Admin spent the time saved actually playing on the server again.",
    ],
    techStack: ['C# / Oxide', 'Postgres', 'discord.js'],
  },
  {
    slug: 'fivem-roleplay-jobs',
    title: 'FiveM Custom Job Framework',
    category: 'FiveM',
    outcome:
      '8 custom jobs (police, EMS, mechanic, courier, more), tier-based salaries, ESX-compatible. 300+ active players.',
    imageUrl: '/images/portfolio/placeholder-fivem.svg',
    featured: false,
    completedAt: 'Jan 2026',
    duration: '4 weeks',
    budget: '$60/hr × 48hr',
    brief: [
      "Established FiveM RP server (300+ active players) wanted to overhaul their job system. The default ESX jobs felt generic — every server had the same Police/EMS/Mech setup. They wanted 8 custom jobs with unique mechanics, tier-based progression (start as a recruit, earn promotions), and integration with their existing economy.",
    ],
    solution: [
      "Eight custom job resources in Lua: Police (with custom evidence system), EMS (custom medical mini-game), Mechanic (vehicle damage states tied to a parts shop), Courier (delivery missions with route variation), Taxi (with tip mechanic), Trucker (long-haul route generation), Hunter (animal spawn zones tied to time-of-day), and Lawyer (court-case representation tied to the police evidence system).",
      "Tier system shared across all jobs: tier 1 to tier 5 with progression locked behind hours-played + supervisor approval. Higher tiers unlock specialized commands and salary multipliers.",
      "All ESX-compatible so existing inventory, money, and identity systems didn't need to be rebuilt.",
    ],
    outcomeDetails: [
      "Server peak concurrent players up 35% in the two months after launch — RP servers live or die on job depth.",
      "Average session length up from 90min to 145min.",
      "Now on a $40/mo per-resource maintenance retainer (8 resources = $320/mo) for compatibility with FiveM updates.",
    ],
    techStack: ['Lua', 'JavaScript', 'ESX', 'MySQL', 'NUI'],
  },
  {
    slug: 'esports-tournament-server',
    title: 'Esports Tournament Discord',
    category: 'Discord Layout',
    outcome:
      'Tournament-ready server with bracket channels, automated team-management bot, and on-stream caster tools.',
    imageUrl: '/images/portfolio/placeholder-2.svg',
    featured: false,
    completedAt: 'Mar 2026',
    duration: '2 days',
    budget: '$500 fixed',
    brief: [
      "Indie esports league running monthly tournaments wanted a Discord layout that scaled across events. Each tournament needs its own brackets, team channels, caster booth, and a tournament-admin overlay — without spinning up a new server every month.",
    ],
    solution: [
      "Reusable tournament template inside one Discord server. Categories pre-configured for next 3 tournaments. Team channels auto-created when a team registers via a self-serve form (built as a small bot). Bracket channels post update embeds from a Challonge integration.",
      "Caster tools: voice channels with stream-overlay-friendly hotkeys, push-to-talk caster role, and a `/cast` command that pings on-deck casters when a match is about to start.",
    ],
    outcomeDetails: [
      "First tournament after launch — registration time per team dropped from 12 minutes (manual back-and-forth) to under 2 (self-serve bot).",
      "Two more leagues have used the template since launch.",
    ],
    techStack: ['Discord', 'Challonge API', 'discord.js', 'Tickets.bot'],
  },
  {
    slug: 'portfolio-site-rebuild',
    title: 'Studio Portfolio Site',
    category: 'Website',
    outcome:
      'Marketing site rebuild for a freelance illustrator. Lighthouse 100/100/100/100. Bookings up 4×.',
    imageUrl: '/images/portfolio/placeholder-web.svg',
    featured: false,
    completedAt: 'Jan 2026',
    duration: '1 week',
    budget: '$2,400 fixed',
    brief: [
      "A freelance illustrator's portfolio site was a Squarespace template loaded down with 8MB of unoptimized images. Mobile load time over 8 seconds. Bookings had stalled and they suspected the slow site was costing them clients.",
    ],
    solution: [
      "Rebuilt as a Next.js + Tailwind static site. All images converted to WebP with `next/image` for automatic responsive serving. Stripe Checkout wired for booking deposits — replaced the previous Squarespace contact-form-then-email-back-then-Venmo flow.",
      "Hero gallery shuffled per visit so the same returning client doesn't see the same 6 images. Case study pages with before/after sliders for the artistic process.",
      "Deployed to Vercel free tier. Total recurring cost: $0/mo.",
    ],
    outcomeDetails: [
      "Lighthouse: 100/100/100/100 across performance, accessibility, best practices, SEO.",
      "Mobile load time: 8.2s → 1.1s.",
      "Booking inquiries 4× in the two months post-launch. (Site itself doesn't generate bookings, but better speed + frictionless deposits removed the bottleneck.)",
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Tailwind', 'Stripe', 'Vercel'],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export const CATEGORIES: ProjectCategory[] = [
  'Discord Bot',
  'Discord Layout',
  'Website',
  'Rust',
  'DayZ',
  'FiveM',
];
