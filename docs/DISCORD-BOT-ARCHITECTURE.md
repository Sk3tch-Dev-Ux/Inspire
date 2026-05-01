# Inspire Discord Bot — Architecture

> Spec for the **custom Inspire bot** referenced in `DISCORD-LAYOUT.md` §6.
> Implements the five priority automations: `/quote`, Stripe-deposit →
> active-client provisioning, project-close flow, `/availability` updates,
> and optional GitHub-deploy → `#shipped` cross-posts.
>
> Design constraint: it must live **inside the existing Next.js site**, not
> as a separate service. Reasons below.

---

## 0. Why no separate process

Most "Discord bots" are long-lived processes that hold a websocket
connection to Discord's gateway. We don't need that here.

Everything this bot does fits into **HTTP request/response**:

- Slash commands → Discord posts to our `/api/discord/interactions` endpoint
- Stripe events → Stripe posts to `/api/webhooks/stripe`
- GitHub events → GitHub posts to `/api/webhooks/github`
- Bot actions (create channel, grant role, send DM) → outbound REST calls
  to `discord.com/api/v10`

That means no gateway, no `discord.js` client, no PM2 process to babysit.
**One Next.js container handles the entire bot** — same deploy pipeline
as the website, same `inspire-web` container that's already running. No
new infra. No second thing to monitor.

The trade-off: we can't react to *passive* events (member joins, message
reactions, voice state changes) without a gateway connection. But:

- Member onboarding is handled by Discord's native onboarding screen
  (no bot needed).
- Reaction-roles are handled by Carl-bot (off the shelf).
- Everything else we need is interaction- or webhook-driven.

If we ever need passive events later, add a small companion service
(e.g. a single TS file on `discord.js` + Cloudflare Workers Durable
Objects, or a sidecar Docker container on the same network). Not now.

---

## 1. File layout

Inside the existing `/opt/inspire/` Next.js project:

```
src/
├─ app/
│  ├─ api/
│  │  ├─ discord/
│  │  │  ├─ interactions/route.ts        # Discord posts slash commands here
│  │  │  └─ register/route.ts            # Admin-only, registers slash commands with Discord
│  │  └─ webhooks/
│  │     ├─ stripe/route.ts              # Existing — extend to call discord.onDepositPaid()
│  │     └─ github/route.ts              # New — listens for `release.published`
│  └─ admin/
│     └─ discord/page.tsx                # (Optional UI) Buttons to re-register commands, view logs
│
├─ lib/
│  └─ discord/
│     ├─ client.ts                       # Thin REST wrapper around discord.com/api/v10
│     ├─ signing.ts                      # tweetnacl signature verification
│     ├─ types.ts                        # Discord interaction payload types
│     │
│     ├─ commands/
│     │  ├─ index.ts                     # Command registry + dispatcher
│     │  ├─ quote.ts                     # /quote — public
│     │  ├─ availability.ts              # /availability — admin
│     │  ├─ project-create.ts            # /project create — admin (manual fallback)
│     │  ├─ project-close.ts             # /project close — admin
│     │  └─ refer.ts                     # /refer — alumni
│     │
│     ├─ flows/                          # Multi-step orchestrations
│     │  ├─ on-deposit-paid.ts           # Stripe → role + channel + DM
│     │  ├─ on-project-closed.ts         # archive + #shipped + schedule referral
│     │  ├─ on-deploy-shipped.ts         # GitHub release → optional #shipped post
│     │  └─ schedule-referral-dm.ts      # 7-day delayed DM trigger
│     │
│     ├─ embeds/                         # Discord embed builders (parallel to /lib/email/templates)
│     │  ├─ active-projects.ts
│     │  ├─ shipped.ts
│     │  ├─ availability.ts
│     │  ├─ quote-summary.ts             # Summary posted to #leads
│     │  └─ onboarding-dm.ts
│     │
│     └─ env.ts                          # Type-safe env var access (zod-validated)
│
├─ db/
│  └─ discord/
│     ├─ links.ts                        # discord_links table CRUD
│     ├─ quotes.ts                       # quote_tickets table CRUD
│     ├─ referrals.ts                    # referral_codes table CRUD
│     └─ availability.ts                 # availability_slots CRUD
│
└─ jobs/
   └─ delayed-referral.ts                # Cron-style worker (or use Vercel cron / Sidekiq /
                                         # whatever you're already using for emails)

scripts/
├─ discord-register-commands.ts          # CLI: registers slash commands via Discord REST
└─ discord-bootstrap-server.ts           # CLI: one-shot to create the roles + channels from
                                         # DISCORD-LAYOUT.md (lets you stand up the server
                                         # programmatically and re-stand it up if needed)

db/migrations/
└─ NNNN_discord_integration.sql          # New tables (see §3)
```

### Why this shape

- **Mirrors the existing `/api/webhooks/stripe` convention** — Stripe handler
  already exists, just extends.
- **`lib/discord/flows/`** is the orchestration layer — anything multi-step
  lives here, callable from any handler. Keeps API routes thin.
- **`db/discord/`** parallels existing `db/` modules. Each table gets one file.
- **`scripts/`** for CLI ops (registering commands, bootstrapping the server)
  — these run rarely but need to be checked in.

---

## 2. Request flow diagrams

### Slash command (`/quote`)

```
User runs /quote in Discord
        │
        ▼
Discord POST → /api/discord/interactions
        │
        ▼
verify Ed25519 signature (tweetnacl) ──fail──► 401
        │
       ok
        ▼
ack with deferred response (avoids 3s timeout)
        │
        ▼
dispatch to commands/quote.ts
        │
        ├──► insert quote_tickets row
        ├──► create forum post in #quote-a-project (private to OP + founder)
        ├──► post embeds/quote-summary.ts to #leads
        └──► PATCH original interaction with confirmation embed
```

### Stripe deposit paid

```
Customer pays deposit on /quote/checkout
        │
        ▼
Stripe POST → /api/webhooks/stripe
        │
        ▼
verify Stripe signature
        │
        ▼
existing handler logic (order record, email)
        │
        ▼
discord.flows.onDepositPaid(orderId)
        │
        ├──► look up discord_user_id via discord_links
        │     (collected during checkout — see §4)
        │
        ├──► PATCH guild member: add @Active Client role
        ├──► POST channel: 🚧-{client}-{project} under PROJECTS category
        │     • permission overwrites: founder + OP only
        │     • topic: project name + ETA
        ├──► POST embeds/active-projects.ts to #active-projects
        ├──► POST DM to user with onboarding checklist
        │     (access requests, kickoff date, what's needed from them)
        └──► insert flow_log row for audit
```

### Project close

```
Founder runs /project close in a project channel
        │
        ▼
commands/project-close.ts
        │
        ├──► confirm via ephemeral button ("Are you sure?")
        │
       ok
        │
        ├──► call onProjectClosed(channelId)
        │     ├──► archive channel (rename → 🏁-{client}-{project},
        │     │   move to ARCHIVED category, lock posts)
        │     ├──► PATCH member: remove @Active Client
        │     │   if no other active project → add @Alumni Client
        │     ├──► POST embeds/shipped.ts to #shipped
        │     │   (founder fills in optional fields via modal first)
        │     ├──► insert delayed_jobs row: send referral DM in 7 days
        │     └──► insert flow_log row
        │
        └──► reply with success embed
```

### `/availability` update

```
Founder runs /availability set <text> or /availability add-slot <date> ...
        │
        ▼
commands/availability.ts
        │
        ├──► UPSERT availability_slots
        ├──► render embeds/availability.ts
        └──► PATCH the pinned message in #availability
              (message ID stored in env: DISCORD_AVAILABILITY_MESSAGE_ID)
```

---

## 3. Database schema

Single migration file, new tables only — no changes to existing tables.

```sql
-- Maps a Discord user ID to a website user/customer.
-- Populated when a user opens a quote ticket OR completes checkout
-- (Stripe checkout collects Discord username/ID via custom field).
CREATE TABLE discord_links (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
    discord_user_id VARCHAR(32) UNIQUE NOT NULL,
    discord_handle  VARCHAR(64) NOT NULL,
    linked_via      VARCHAR(32) NOT NULL,        -- 'quote_form', 'stripe_checkout', 'manual'
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Quote tickets opened via /quote command.
CREATE TABLE quote_tickets (
    id              SERIAL PRIMARY KEY,
    discord_user_id VARCHAR(32) NOT NULL,
    forum_thread_id VARCHAR(32) NOT NULL,
    platform        VARCHAR(32),                 -- 'discord-bot' | 'rust' | 'dayz' | 'fivem' | 'web'
    scope_summary   TEXT,
    budget_band     VARCHAR(32),                 -- '<1k' | '1-3k' | '3-10k' | '10k+'
    deadline        VARCHAR(64),
    status          VARCHAR(32) NOT NULL DEFAULT 'open',
                                                  -- 'open' | 'quoted' | 'won' | 'lost' | 'declined'
    contracted_order_id INTEGER REFERENCES orders(id),
    created_at      TIMESTAMP DEFAULT NOW(),
    closed_at       TIMESTAMP
);

-- Per-user referral codes for alumni.
CREATE TABLE referral_codes (
    id              SERIAL PRIMARY KEY,
    referrer_user_id INTEGER REFERENCES users(id),
    code            VARCHAR(32) UNIQUE NOT NULL,
    referee_order_id INTEGER REFERENCES orders(id),  -- filled when redeemed
    redeemed_at     TIMESTAMP,
    expires_at      TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Source of truth for #availability pinned embed.
CREATE TABLE availability_slots (
    id              SERIAL PRIMARY KEY,
    week_starting   DATE UNIQUE NOT NULL,
    open_slot_count INTEGER NOT NULL DEFAULT 0,
    note            TEXT,                         -- "1 slot — small (≤1 wk)"
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Active project channels mapped to clients/orders.
CREATE TABLE project_channels (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES orders(id) UNIQUE,
    discord_channel_id VARCHAR(32) UNIQUE NOT NULL,
    client_user_id  INTEGER REFERENCES users(id),
    status          VARCHAR(32) NOT NULL DEFAULT 'active',  -- 'active' | 'archived'
    opened_at       TIMESTAMP DEFAULT NOW(),
    closed_at       TIMESTAMP
);

-- Audit log for every flow execution. Helps debug issues.
CREATE TABLE flow_log (
    id              BIGSERIAL PRIMARY KEY,
    flow_name       VARCHAR(64) NOT NULL,
    actor_id        VARCHAR(64),                  -- discord user or 'system'
    target_id       VARCHAR(64),
    payload         JSONB,
    success         BOOLEAN NOT NULL,
    error_message   TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX flow_log_created_idx ON flow_log (created_at DESC);
CREATE INDEX flow_log_flow_idx ON flow_log (flow_name, created_at DESC);

-- Delayed jobs (referral DM at +7 days, etc.).
-- Polled by jobs/delayed-referral.ts on a cron tick.
CREATE TABLE delayed_jobs (
    id              SERIAL PRIMARY KEY,
    job_type        VARCHAR(64) NOT NULL,         -- 'referral_dm' | 'testimonial_ask'
    payload         JSONB NOT NULL,
    run_at          TIMESTAMP NOT NULL,
    completed_at    TIMESTAMP,
    error_message   TEXT
);
CREATE INDEX delayed_jobs_pending_idx ON delayed_jobs (run_at) WHERE completed_at IS NULL;
```

---

## 4. Linking Discord users to website users

The hardest part is matching "this Stripe payment" to "this Discord user."
Three places to capture the link, in priority order:

1. **Quote form** (preferred) — when someone opens `/quote` in Discord, we
   already have their Discord user ID. The website's `/quote` form should
   accept an optional `?discord={userId}` parameter populated from a deep
   link the bot DMs them. Stripe checkout then carries `discord_user_id`
   in metadata.

2. **Stripe checkout custom field** — fallback. Stripe supports a
   `custom_fields` on checkout sessions. Add an optional "Discord username"
   field. After checkout, the founder manually confirms the link via
   `/admin discord link <orderId> <userId>`.

3. **Manual `/admin discord link`** — admin slash command for any case the
   first two miss.

This linking has a side benefit: it powers the **alumni backfill** — running
through the orders table to retroactively grant `@Alumni Client` to past
customers whose Discord IDs we know.

---

## 5. Environment variables

Validated by `lib/discord/env.ts` using zod (matches the existing pattern):

```env
# Application
DISCORD_APP_ID=                          # Application ID from discord.com/developers
DISCORD_PUBLIC_KEY=                      # For interaction signature verification (tweetnacl)
DISCORD_BOT_TOKEN=                       # Bot token (REST API auth)
DISCORD_GUILD_ID=                        # Your server ID
DISCORD_FOUNDER_USER_ID=                 # Your Discord ID (for DMs, admin gating)

# Roles (resolve once via /admin print-ids, paste here)
DISCORD_ROLE_ACTIVE_CLIENT=
DISCORD_ROLE_ALUMNI_CLIENT=
DISCORD_ROLE_PATRON=
DISCORD_ROLE_TRUSTED_BUILDER=

# Channels & categories
DISCORD_CATEGORY_PROJECTS=               # Parent category for spawned project channels
DISCORD_CATEGORY_ARCHIVED=               # Where closed projects move
DISCORD_CHANNEL_ACTIVE_PROJECTS=
DISCORD_CHANNEL_SHIPPED=
DISCORD_CHANNEL_LEADS=                   # Cross-post of new quotes
DISCORD_CHANNEL_AVAILABILITY=            # Pinned embed lives here
DISCORD_AVAILABILITY_MESSAGE_ID=         # The pinned message to PATCH
DISCORD_FORUM_QUOTES=                    # #quote-a-project forum channel ID

# GitHub webhook
GITHUB_WEBHOOK_SECRET=                   # HMAC verification

# Cron worker
DELAYED_JOB_POLL_INTERVAL_MS=60000       # How often jobs/delayed-referral.ts runs
```

Roles and channel IDs are stored in env (not hardcoded) so the same code
runs against a staging server with different IDs.

---

## 6. Slash command registry

One source of truth for all commands. Registered via the CLI script,
validated with the same schema both at registration time and at dispatch.

```ts
// lib/discord/commands/index.ts (sketch)
export const commands = [
  {
    name: 'quote',
    description: 'Start a project quote — opens a private ticket.',
    options: [/* platform, scope, budget, deadline */],
    handler: quoteHandler,
    adminOnly: false,
  },
  {
    name: 'availability',
    description: 'Update the pinned availability embed.',
    handler: availabilityHandler,
    adminOnly: true,
  },
  {
    name: 'project',
    description: 'Project lifecycle commands.',
    options: [
      { name: 'create', type: 'subcommand', /* ... */ },
      { name: 'close',  type: 'subcommand', /* ... */ },
    ],
    handler: projectHandler,
    adminOnly: true,
  },
  {
    name: 'refer',
    description: 'Get your referral code.',
    handler: referHandler,
    adminOnly: false,
  },
];
```

`adminOnly` is checked in the interactions route by comparing the
invoker's Discord ID against `DISCORD_FOUNDER_USER_ID` — Discord's
built-in role-based command permissions are a fallback, not a substitute.

---

## 7. Security

| Surface | Defense |
|---|---|
| `/api/discord/interactions` | Ed25519 signature verification via tweetnacl. Reject without 401 on any failure (Discord retries with bigger gaps). |
| `/api/webhooks/stripe` | Existing — Stripe HMAC. |
| `/api/webhooks/github` | HMAC-SHA256 with `GITHUB_WEBHOOK_SECRET`. |
| Admin slash commands | Check invoker against `DISCORD_FOUNDER_USER_ID` before any side effects. |
| Bot token | Stored only in env, never logged. Sentry `beforeSend` filter strips it. |
| Project channels | Permission overwrites set explicitly — `everyone` denied, `Founder` + OP allowed only. |
| Referral codes | Single-use, expire 90 days, validated server-side. |
| Rate limiting | `express-rate-limit` (already in deps) on `/api/discord/interactions` — 60/min per IP. |
| Replay protection | Discord interactions have a unique `id`; reject duplicates seen within 60s (in-memory cache). |

---

## 8. Deployment

No infrastructure change. The bot ships in the same `inspire-web` container.

1. Add env vars to `.env.production` and the docker-compose `bot` service.
2. Run the migration: `docker exec inspire-web npm run db:migrate`.
3. Run command registration once: `docker exec inspire-web npx tsx scripts/discord-register-commands.ts --guild`.
4. Set the **Interactions Endpoint URL** in
   discord.com/developers → Application → General Information →
   `https://inspirepc.com/api/discord/interactions`.
5. Discord will probe the endpoint with a signed PING and refuse to save
   the URL unless the response is correct. Verify locally with `curl` first.
6. Bot is live.

A failed signature verification during the initial PING is the most common
gotcha — `DISCORD_PUBLIC_KEY` must be the **interaction public key**, not
the application ID, not the bot token.

---

## 9. Cron / delayed jobs

`jobs/delayed-referral.ts` polls `delayed_jobs WHERE run_at <= NOW() AND
completed_at IS NULL`. Two ways to invoke it:

- **Inside the container**: an existing setInterval loop on app startup
  (matches the clanops pattern). Cheap, no new infra. Risk: if you scale
  to multiple replicas later, you need a row-level lock to avoid double-firing.

- **External cron** (preferred): a host-level cron entry calls
  `docker exec inspire-web npm run jobs:tick`. Same pattern as the harker
  / clanops backup crons. Single-instance by default.

Start with the in-container interval. Migrate to external cron when you
add replicas.

---

## 10. Build order

Phased so each step is independently shippable.

### Phase 1 — Skeleton (1 day)
- Migration file
- `lib/discord/client.ts`, `signing.ts`, `env.ts`, `types.ts`
- `/api/discord/interactions/route.ts` with PING handling and signature verification
- One trivial slash command (`/ping`) end-to-end to prove the pipeline
- Register-commands CLI script

### Phase 2 — Quote intake (1 day)
- `commands/quote.ts` + forum post creation
- `db/discord/quotes.ts`
- `embeds/quote-summary.ts` posted to `#leads`
- DM the founder with a summary

### Phase 3 — Stripe → active client (1.5 days)
- Extend `webhooks/stripe/route.ts` with `flows/on-deposit-paid.ts`
- `db/discord/links.ts` + Discord username collection at checkout
- `db/discord/project-channels.ts` (the table, the helpers)
- `embeds/active-projects.ts` + `embeds/onboarding-dm.ts`

### Phase 4 — Close + alumni (1 day)
- `commands/project-close.ts`
- `flows/on-project-closed.ts` — archive, role swap, `#shipped` post
- `delayed_jobs` table + `jobs/delayed-referral.ts`
- `embeds/shipped.ts` (with optional fields the founder fills via modal)

### Phase 5 — Availability + referrals (1 day)
- `commands/availability.ts`
- `commands/refer.ts`
- `db/discord/availability.ts` + `db/discord/referrals.ts`
- `embeds/availability.ts` and the pinned-message PATCH

### Phase 6 — Optional GitHub deploy hook (0.5 day)
- `webhooks/github/route.ts`
- `flows/on-deploy-shipped.ts`

### Phase 7 — Server bootstrap script (0.5 day)
- `scripts/discord-bootstrap-server.ts` reads `DISCORD-LAYOUT.md` (or its
  encoded form) and creates roles + categories + channels via REST.
  One-shot. Idempotent. Saves an hour of manual setup if you ever need to
  rebuild a staging server.

**Total: ~6 work-days**, each phase independently deployable behind a
feature flag (`DISCORD_BOT_ENABLED=true`). Ship Phase 1 first to verify
the deploy pipeline before doing real work.

---

## 11. What's intentionally out of scope

- **Long-lived gateway events** — member joins, message reactions, voice
  presence. Use Carl-bot for these. Revisit only if a feature truly
  requires it.
- **Music / general moderation** — off-the-shelf bots are better.
- **Per-channel game-specific helpers** — `#rust-modding-help` doesn't need
  bot smarts; the value is humans answering humans.
- **Levels / XP system** — anti-pattern in a small founder-led server.
- **Web dashboard for the bot** — a single `/admin/discord/page.tsx` page
  with a "re-register commands" button is enough. No need for a full UI.

---

## 12. Glossary

| Term | Meaning |
|---|---|
| **Interaction** | Any user action that fires a Discord webhook to your endpoint — slash command, button click, modal submit. |
| **Deferred response** | Discord requires a reply within 3s; deferring lets you ack and update the message later. Used for any flow that touches the DB or makes outbound calls. |
| **Permission overwrite** | Channel-level permission that overrides a role's default permissions. Used to make project channels visible only to OP + founder. |
| **Webhook signature** | HMAC (Stripe, GitHub) or Ed25519 (Discord) — verify the request actually came from the source before doing anything. |
| **Flow** | Multi-step orchestration in `lib/discord/flows/`. Distinct from a "command" (single-trigger) and a "handler" (single API route). |

---

*Document version 1.0 — sibling to `DISCORD-LAYOUT.md`. Implements §6 of that
doc. Living spec — update as Phases 1–7 land.*
