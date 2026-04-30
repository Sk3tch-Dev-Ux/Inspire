# Inspire Development — Brand System

Visual identity and component conventions. If you're building anything new
on this site, this is the source of truth — match these tokens, don't
introduce new colors or fonts ad-hoc.

## Brand Pillars

The four signals every page should send:

1. **Built for builders.** Speak the audience's language — Discord, Rust,
   DayZ, FiveM. No "we deliver synergistic solutions."
2. **Visible craft.** Public portfolio, real screenshots, working demos.
   Customers can see what they're buying.
3. **Predictable pricing.** Hourly rates posted publicly. Custom quotes
   for big jobs, not opaque "contact us."
4. **Same-week starts.** Small shop, not a 6-month-engagement consultancy.
   Speed is a feature.

## Color Palette

Defined in `src/app/globals.css` under the `@theme` block (Tailwind v4
syntax). All values exposed as Tailwind utilities via
`tailwind.config.ts` — use `bg-flame`, `text-bone`, `border-steel`,
not raw hex codes.

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `--color-flame` | `#FF6B1A` | `flame` | **Primary accent** — buttons, links, highlights, the bolt in the logo |
| `--color-flame-glow` | `#FF8742` | `flame-glow` | Lighter tint for gradients, hovers, glows on dark |
| `--color-ember` | `#CC4A00` | `flame-ember` | Pressed states, secondary accent |
| `--color-ink` | `#0A0A0A` | `ink` | Primary background — slightly warm black so orange reads electric |
| `--color-carbon` | `#1A1A1A` | `carbon` | Card / panel surface |
| `--color-steel` | `#2D2D2D` | `steel` | Borders, dividers, inactive states |
| `--color-mute` | `#7A7A7A` | `mute` | Secondary text, timestamps, metadata |
| `--color-bone` | `#FAFAF7` | `bone` | Off-white text on dark; primary bg on light pages |
| `--color-pure` | `#FFFFFF` | (none — use `text-white`) | Highest-contrast text only |

The brand is **dark-first**. Hero, portfolio, and showcase pages live on
black. Light surfaces exist only for transactional flows like the portal.

## Typography

Three Google fonts, loaded via `next/font/google` in `src/app/layout.tsx`:

| Family | Tailwind class | Use |
|---|---|---|
| **Inter** | `font-sans` (default) | Body copy, paragraphs, form labels |
| **Space Grotesk** | `font-display` | Headings, hero, section titles, logo wordmark |
| **JetBrains Mono** | `font-mono` | Spec tags, code, terminal-style chips |

All three are exposed as CSS vars (`--font-body`, `--font-display`,
`--font-mono`) and as Tailwind families. Headings use Space Grotesk in
700/600. The `.spec-tag` utility (in globals.css) styles mono chips like
"Discord bot · Rust mod · FiveM resource".

## Voice & Tone

- **Direct.** "I build Discord bots." Not "We architect Discord engagement
  experiences."
- **First-person, lowercase OK.** You ARE the brand. "Hi, I'm [name]"
  builds trust faster than "Inspire Development is a leading…"
- **Show pricing up front.** "$60/hr for Discord bots. $80/hr for game
  scripts. Larger jobs quoted." No "schedule a discovery call" gating.
- **Receipts.** Every claim is backed by a screenshot, a Discord server
  you can join, a video clip, a code excerpt.

## Logo

Component: `src/components/Logo.tsx`. Three variants:

- `<Logo />` (default `variant="wordmark"`): Stacked lockup
  `inspire⚡ / DEVELOPMENT`. Use in nav and hero treatments.
- `<Logo variant="mark" />`: Just the bolt on a rounded ink square —
  for favicons, Discord avatars, app tile icons.
- `<Logo variant="inline" />`: Single-line `inspire⚡ Development` —
  compact contexts like the footer.

The bolt is a **custom-drawn SVG**, not the lightning emoji — it
renders identically across platforms. Always solid `flame` color.

Sizes: `sm` (compact), `md` (default, nav), `lg` (hero), `xl` (splash).

For light backgrounds: `<Logo onLight />`.

## Card Primitives

### `<ServiceCard />`

For the homepage / `/services` index. Surfaces a single offering with:
icon badge, title, description, optional spec tags (mono chips), price
(hourly / fixed / custom-quote), CTA arrow.

```tsx
<ServiceCard
  title="Discord Bots"
  description="Custom commands, moderation, role management, music, ticketing."
  icon={Bot}
  priceMode="hourly"
  price={60}
  specs={['discord.js', 'TypeScript', 'self-hosted']}
  href="/services/discord-bots"
  badge="POPULAR"
/>
```

### `<PortfolioCard />`

For the `/portfolio` grid. Cover image, category chip floating over,
title + outcome blurb on the carbon strip below, optional tech-stack
chips, optional external link badge.

```tsx
<PortfolioCard
  slug="rust-server-shop-bot"
  title="Rust Server Shop Bot"
  category="Discord Bot"
  outcome="In-game shop, role-based pricing, Steam OAuth — replaced their previous $200/mo SaaS."
  imageUrl="/images/portfolio/rust-shop-bot.jpg"
  liveUrl="https://discord.gg/example"
  techStack={['discord.js', 'Postgres', 'Steam API']}
/>
```

## Buttons

Two CSS classes in `globals.css`:

- `.btn-primary` — solid flame on ink, glow on hover. Use for the
  single most important action on a page (Get Quote, Hire Me, etc.).
- `.btn-secondary` — outlined, fills with flame border + text on hover.
  Use for secondary actions (Learn more, View portfolio).

Don't introduce a third button style. If you need it, you're probably
collapsing two CTAs into one.

## Motion

- **150ms transitions** for color and border changes.
- **200–250ms** for transform + box-shadow (cards lifting on hover).
- **Subtle orange glow** on interactive elements:
  `box-shadow: 0 0 24px rgba(255, 107, 26, 0.25)` on `:hover`.
- Framer Motion is in deps; use it for entrance animations on portfolio
  cards (stagger by 80ms) and reveal-on-scroll for service tiers.
- Reduce or skip motion when `prefers-reduced-motion` is set.

## Imagery

- **No stock photos.** Ever.
- Real screenshots of Discord servers (with permission), code editors,
  game environments where your scripts run.
- Abstract heroes: low-contrast code-rain backgrounds (Carbon `#1A1A1A`
  with Steel `#2D2D2D` text, ~30% opacity) for texture without cliché.

## What's NOT in this kit

Phase 1 only ships the design tokens, the logo, and two card primitives.
The actual page content (homepage, services, portfolio) is being rebuilt
in Phase 2 — see the project README or current open branches for status.
