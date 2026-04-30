import {
  Bot,
  Code2,
  Gamepad2,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

/**
 * Inspire Development — Service catalog (single source of truth).
 *
 * Used by:
 *   - /services/page.tsx (index)
 *   - /services/[slug]/page.tsx (deep pages)
 *   - /pricing/page.tsx (when built)
 *   - /quote/page.tsx (when built — service picker)
 *   - Homepage Content.tsx (recent-work strip + services strip)
 *
 * Adding a new service: append a Service object below. The slug
 * automatically becomes a URL path; generateStaticParams in the
 * dynamic page picks up new slugs without code changes.
 */

export type PriceMode = 'hourly' | 'fixed' | 'custom';

export interface Service {
  /** URL slug — `/services/<slug>`. */
  slug: string;
  /** Heading. Action-leading: "Discord Bots", not "Discord Bot Service". */
  title: string;
  /** Short one-line description for cards. */
  shortDescription: string;
  /** 2–4 paragraph long-form copy for the deep page. */
  longDescription: string[];
  /** Lucide icon for the corner badge. */
  icon: LucideIcon;
  /** Hero category label, lowercase, mono-style chip text. */
  categoryLabel: string;
  /** Pricing mode. */
  priceMode: PriceMode;
  /** Hourly rate (USD/hr) — only for `hourly`. */
  hourlyRate?: number;
  /** Fixed package price (USD) — only for `fixed`. */
  fixedPrice?: number;
  /** Brief explanation that shows next to the price. */
  priceExplainer: string;
  /** Spec tags rendered as mono chips. Keep it 3–5 entries. */
  specs: string[];
  /** "What's included" feature list — 5–8 entries. */
  features: string[];
  /** Tech stack pills shown in the deep page sidebar. */
  techStack: string[];
  /** Optional badge — "POPULAR", "NEW", etc. */
  badge?: string;
  /** Step-by-step process tailored to the service. */
  process: { step: string; title: string; description: string }[];
  /** FAQ entries — 4–6 typical questions. */
  faq: { question: string; answer: string }[];
}

const STANDARD_PROCESS = [
  {
    step: '01',
    title: 'Tell me what you need',
    description:
      "Discord DM, contact form, or 15-minute call. Bring screenshots, links, half-baked ideas — whatever you have.",
  },
  {
    step: '02',
    title: 'Quote within 24 hours',
    description:
      "Hourly rate for small jobs, flat fee for known scope, custom estimate for bigger work. No 'discovery calls.'",
  },
  {
    step: '03',
    title: 'Built and shipped',
    description:
      'Most projects start the same week. Progress in your own Discord channel. Pay on completion or weekly for ongoing work.',
  },
];

export const SERVICES: Service[] = [
  {
    slug: 'discord-bots',
    title: 'Discord Bots',
    shortDescription:
      'Custom commands, moderation, role management, music, ticketing, in-game integrations.',
    longDescription: [
      "Stock Discord bots cover 80% of what most servers need. The other 20% — the part that makes your community actually feel built for them — is where I come in.",
      "Whether it's a custom moderation system tied to your in-game stats, a ticket bot that routes by topic, a self-roles flow that doesn't suck, or a Steam-OAuth gated whitelist — I'll build it the way you actually want it. discord.js or discord.py, your pick. TypeScript strongly preferred.",
      "Self-host on your own VPS, or I'll run it on mine for $15/mo and hand you the dashboard.",
    ],
    icon: Bot,
    categoryLabel: 'discord-bot',
    priceMode: 'hourly',
    hourlyRate: 60,
    priceExplainer:
      "Hourly billing means small features stay cheap. Most bots land in the $200–$1,500 range for the initial build, plus optional ongoing maintenance.",
    specs: ['discord.js', 'TypeScript', 'self-hosted'],
    features: [
      'Slash commands, message commands, button + select-menu interactions',
      'Persistent storage with Postgres or SQLite — no resets when the bot restarts',
      'Moderation tools: auto-mute, role escalation, mod-log channel, raid protection',
      'Ticket systems with topic routing, transcripts, and auto-close',
      'Game / Steam / OAuth integrations — verify members before they get role-gated access',
      'Music playback with Lavalink (no terms-of-service violations from janky API calls)',
      'Web dashboard option for non-technical admins to configure without redeploying',
      'Documentation handed over so you can take it from here',
    ],
    techStack: ['discord.js', 'TypeScript', 'Node.js', 'Postgres', 'Redis', 'Docker'],
    badge: 'POPULAR',
    process: STANDARD_PROCESS,
    faq: [
      {
        question: 'How long does a typical bot take?',
        answer:
          'A simple feature bot (commands, roles, basic moderation) is 1–3 days. A full ticket-and-OAuth-bot with web dashboard is 1–2 weeks. Quote tells you exactly.',
      },
      {
        question: 'Do you host it for me?',
        answer:
          "Yes — flat $15/mo for hosting on a VPS I manage, with uptime monitoring. Or I'll set you up to host on your own VPS and hand off everything via git.",
      },
      {
        question: 'Can you take over an existing bot?',
        answer:
          "Yes. Hourly rate applies — we'll start with a 1-hour audit ($60) so you know what shape the codebase is in before committing further.",
      },
      {
        question: 'discord.js or discord.py?',
        answer:
          "discord.js is my default (TypeScript, faster iteration, cleaner library API). I'll use discord.py if you have an existing codebase or strong preference.",
      },
      {
        question: 'What about bot verification?',
        answer:
          "If your bot needs to be in 100+ servers, I'll handle the verification submission to Discord on your behalf. Note that verification takes 2–8 weeks.",
      },
    ],
  },
  {
    slug: 'discord-layouts',
    title: 'Discord Layouts',
    shortDescription:
      'Full server setup or audit + redesign. Categories, channels, roles, permissions, welcome flows.',
    longDescription: [
      "A well-structured Discord server is the difference between members who post and members who lurk. The structure does most of the work — most servers I see have grown organically into a maze.",
      "I'll either build your server from a clean slate or audit your existing one and rebuild the structure: categories that match how members actually use the server, channels that funnel conversation, role hierarchies that scale, permissions that don't bite you in the ass three months later, welcome flows that actually onboard people, and a ticket system if you want one.",
      "Most full layouts ship in a single 8-hour day. Bigger communities (5,000+ members, multiple languages, complex role-gating) might take two.",
    ],
    icon: LayoutDashboard,
    categoryLabel: 'discord-layout',
    priceMode: 'fixed',
    fixedPrice: 300,
    priceExplainer:
      "Flat fee for a complete server setup or restructure. Includes the welcome flow, ticket system, and bot installation/configuration (bots themselves cost extra if custom).",
    specs: ['1-day delivery', 'roles · perms', 'ticket system'],
    features: [
      'Category + channel structure tailored to your community size and theme',
      'Role hierarchy with permissions that scale (no "everyone is admin" anti-patterns)',
      'Welcome flow with rules-acceptance gating and self-roles',
      'Ticket system (Tickets.bot or custom) with topic routing + transcripts',
      'Pre-configured Carl-bot, MEE6, or Dyno for moderation if you want stock bots',
      'Channel topic / pin / first-message templates so each channel feels intentional',
      'Voice channel structure — lobby, squad rooms, AFK',
      'Handoff doc + screenshots so you can train your own moderators',
    ],
    techStack: ['Discord', 'Carl-bot', 'Tickets.bot', 'Dyno', 'discord.js'],
    process: STANDARD_PROCESS,
    faq: [
      {
        question: 'Will you wipe my existing server?',
        answer:
          "No. I work on a copy first — duplicate your server, build the new structure on the duplicate, get your sign-off, then either migrate members over or apply the changes to the live server in a maintenance window.",
      },
      {
        question: 'What if I just want an audit?',
        answer:
          "I can do that — $60 for a 1-hour written audit with specific recommendations, no rebuild. Many people take the audit and DIY from there.",
      },
      {
        question: 'Do you write the channel rules and welcome message copy?',
        answer:
          "Yes if you want. I'll draft them and you tweak. Communities that lift my drafts wholesale tend to feel a bit generic — your voice matters more than mine here.",
      },
      {
        question: 'Can you handle servers above 10,000 members?',
        answer:
          "Yes — I'll quote separately. Larger servers need more careful permission design and usually require a custom bot for moderation, which falls under Discord Bots pricing.",
      },
    ],
  },
  {
    slug: 'web',
    title: 'Custom Websites',
    shortDescription:
      'Marketing sites, web apps, dashboards. Built fast, deployed on day one, iterated weekly.',
    longDescription: [
      "Modern websites built with Next.js, React, TypeScript, and Tailwind. The same stack this site is built on. The same stack that ships fast, runs cheaply, and doesn't lock you into a vendor.",
      "I prefer to deploy on day one and iterate weekly — getting a real URL out fast means we find out what actually matters to your users instead of designing in the dark.",
      "Marketing sites are typically $1,500–$4,000 depending on page count and design polish. Web apps with auth, payments, and persistent state are quoted hourly because the scope tends to grow as we go.",
    ],
    icon: Code2,
    categoryLabel: 'web',
    priceMode: 'hourly',
    hourlyRate: 75,
    priceExplainer:
      "Hourly for web apps. Marketing sites quoted as fixed packages once we agree on page count + scope.",
    specs: ['Next.js', 'TypeScript', 'Tailwind'],
    features: [
      'Next.js App Router — server components, streaming, ISR for marketing pages',
      "Tailwind for styling — no CSS-in-JS bloat, no MUI 'looks like every other React site' aesthetic",
      'TypeScript end to end — no `any` escape hatches; types catch real bugs',
      'Stripe Checkout / Subscriptions when you need payments',
      'Auth via NextAuth (Discord, Google, email/password — pick one or all)',
      'Postgres + Drizzle or raw `pg` — no ORM lock-in if you want to migrate later',
      'Deployed to Vercel, Railway, or your own VPS — your call',
      'SEO done right: meta tags, OG images, JSON-LD, real `<h1>` hierarchy',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind', 'Postgres', 'Stripe', 'NextAuth'],
    process: STANDARD_PROCESS,
    faq: [
      {
        question: 'Do you do design too, or just code?',
        answer:
          "Both, but I'm a developer first. If you have a designer or want to commission high-end design, hire them — I'll implement faithfully. If you don't, I'll design something tasteful that won't embarrass you. See this site for an example.",
      },
      {
        question: 'WordPress?',
        answer:
          "I don't do WordPress. If your site needs WordPress (because of an existing content team or specific plugin requirement), I'll point you to someone who does it well.",
      },
      {
        question: 'Hosting and ongoing costs?',
        answer:
          "Marketing sites: $0–$20/mo on Vercel's free tier or a $5 VPS. Web apps with DB + auth: $20–$50/mo at low volume. I'll set up the deploy and document the cost breakdown.",
      },
      {
        question: 'Maintenance after launch?',
        answer:
          "Two options: pay-as-you-go (hourly when you need changes), or a $200/mo retainer for up to 3 hours of changes per month + on-call for breakages.",
      },
    ],
  },
  {
    slug: 'game-scripts',
    title: 'Game Scripts',
    shortDescription:
      'Custom scripts and mods for Rust, DayZ, and FiveM. Game modes, server-side events, admin tools.',
    longDescription: [
      "I run servers in these games. I'm not a hired gun who'll deliver something that technically works but feels off — I know what makes a Rust wipe land or what makes a DayZ trader feel fair.",
      "Rust: server-side plugins via Oxide/uMod. Custom commands, server events, economy tweaks, kit systems, anti-cheat extensions. New game modes if you've got something specific in mind.",
      "DayZ: scripts and mods in Enscript. Custom traders, faction systems, base-building tweaks, mission systems, server-side stat tracking with web dashboards.",
      "FiveM: custom resources in Lua/JS. Roleplay frameworks (ESX, QBCore), job scripts, gang systems, custom UI, MLO integrations, admin tools that don't crash the server.",
    ],
    icon: Gamepad2,
    categoryLabel: 'game-script',
    priceMode: 'hourly',
    hourlyRate: 80,
    priceExplainer:
      "Niche skill, competitive minus 15%. Most scripts land in $400–$2,000 range. Larger custom mods (new game modes, complex economy systems) quoted as projects.",
    specs: ['Rust', 'DayZ', 'FiveM'],
    features: [
      'Rust — Oxide/uMod plugins in C# (server-side; no client-side mods)',
      'DayZ — Enscript mods, both server-side and client-side',
      'FiveM — Lua + JS resources, ESX/QBCore-compatible',
      "Web dashboards in Next.js for any of the above when you need admin tools beyond an in-game menu",
      'Webhook integrations to Discord (raid alerts, trade logs, ban notifications)',
      'Performance-conscious — I profile before deploying; no scripts that drop server tick',
      'Source code handed over so you can keep iterating after I leave',
      'Compatible with most existing scripts — no "rip everything out" requirements',
    ],
    techStack: ['C# / Oxide', 'Enscript', 'Lua', 'JavaScript', 'Postgres', 'Discord webhooks'],
    process: STANDARD_PROCESS,
    faq: [
      {
        question: 'Do you do client-side mods?',
        answer:
          "DayZ yes (it's how the game works). Rust no — Rust client mods get you banned. FiveM client-side resources, sure.",
      },
      {
        question: 'My server is already running. Will adding your script break things?',
        answer:
          "I test against a duplicate of your server first. If something does conflict with an existing plugin/resource, I'll tell you before deploying.",
      },
      {
        question: 'Can you fix existing scripts I bought elsewhere?',
        answer:
          "Yes. Hourly rate applies. I'll usually do a 30-minute free triage to tell you whether it's worth fixing or rewriting.",
      },
      {
        question: 'What about game updates breaking the script?',
        answer:
          "Inevitable for DayZ and Rust (devs change internal APIs every couple months). I offer a $40/mo per-script maintenance retainer that covers re-compatibility on game updates.",
      },
      {
        question: 'Anti-cheat?',
        answer:
          "I extend existing anti-cheats (NoClip detection on top of EAC, etc.) but I don't build standalone anti-cheats from scratch — that's a specialty unto itself.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function formatPrice(s: Service): string {
  if (s.priceMode === 'hourly' && s.hourlyRate) return `$${s.hourlyRate}/hr`;
  if (s.priceMode === 'fixed' && s.fixedPrice) return `$${s.fixedPrice}`;
  return 'Custom quote';
}
