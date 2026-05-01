# Inspire Development — Discord Server Layout

> Server blueprint for **Inspire Development** — a one-person dev shop that
> ships Discord bots, Rust/DayZ/FiveM mods, and websites for gaming
> communities. The Discord is the *primary* sales channel for this kind of
> business: clients are already in Discord, your portfolio is mostly
> screenshots of Discord, and "talk to me here" beats "fill out a form."
>
> Two goals, in priority order:
>
> 1. **Convert lurkers → quoted projects.** Every channel exists either to
>    build trust toward this or to support a customer who already paid.
> 2. **Be the room game-server owners hang out in.** A community of your
>    target audience asking each other for help is a moat that scales
>    without you.

---

## 0. Strategic frame

Most dev-shop Discords look like agencies (locked, formal, "schedule a call").
Don't. The brand is **direct, first-person, public-pricing, same-week-starts**.
Match the website voice. The server should feel like a **workshop with a
viewing window**, not a sales office.

Three concentric rings:

| Ring | Audience | Default visibility | Conversion signal |
|---|---|---|---|
| **Public** | Game-server owners, devs, lurkers | Open | They ask in `#hire-me` or `#general` |
| **Active Clients** | Currently paying for a project | Private project channels | They renew / refer |
| **Alumni** | Past clients, vouched community | A small lounge | Testimonial, referral, repeat job |

A small lively server (200–500 members) beats a big dead one. Don't optimize
for member count; optimize for **conversations per week** and **quotes per month**.

---

## 1. Server settings

| Setting | Value |
|---|---|
| **Server name** | Inspire Development |
| **Vanity URL** | `discord.gg/inspire-dev` (Boost Level 3 unlocks) |
| **Verification level** | Medium |
| **Default notifications** | Only @mentions |
| **Explicit content filter** | Scan from members without a role |
| **Server icon** | Bolt mark on `ink #0A0A0A` square — same `<Logo variant="mark" />` from the site |
| **Banner** | Code-rain texture (Carbon `#1A1A1A`/Steel `#2D2D2D`) with `inspire⚡ DEVELOPMENT` wordmark |
| **Splash invite** | Same banner, tagline "small shop. fast ships." |
| **System messages channel** | `#welcome` (joins only — silence boosts here) |
| **AFK channel** | `#afk` |
| **Community features** | Enabled — unlocks announcements, discovery, insights |
| **Discoverable** | Yes — keywords: discord bot, rust mod, fivem, dayz, game development, gaming community |

---

## 2. Role hierarchy

Tight. One founder, one trusted helper class, the rest are membership tiers.
Hex codes mirror `BRAND.md`.

```
@Founder                #FF6B1A  (flame)        — owner only, top
@Trusted Builder        #FF8742  (flame-glow)   — vouched devs who help in support channels
@Bot                    #5865F2                 — bots only

@Active Client          #FAFAF7  (bone)         — currently retained on a project
@Alumni Client          #7A7A7A  (mute)         — past client, kept long-term
@Patron                 #CC4A00  (ember)        — Boost or paid supporter

@Member                 #2D2D2D  (steel)        — default verified human
@Newcomer               #1A1A1A  (carbon)       — pre-onboarding, view-only

@Muted                  #424242                 — moderation
```

### Self-assignable interest tags

These are *not* roles for permissions — they exist purely so you can ping a
relevant subset and so members signal what they care about. Granted via
reaction-roles in `#start-here`.

- `@discord-bots` — Discord.js / serenity / py-cord builders
- `@rust-mods` — Oxide, Carbon, Rust+
- `@dayz-mods` — community-server scripting
- `@fivem` — QBCore, ESX, custom resources
- `@web-dev` — Next.js, Astro, the website-side audience
- `@hiring` — server owners actively looking to commission

### Permission rules of thumb

- `@Newcomer`: sees `#welcome`, `#rules`, `#start-here`. No send.
- `@Member`: full public access; cannot see clients/alumni lounges.
- `@Active Client`: project channels (one per active engagement).
- `@Alumni Client`: `#alumni-lounge` and a referral channel.
- `@Trusted Builder`: same as Member + can react-pin in help channels +
  manage threads in their tagged help channel.
- `@Founder`: everything.

The role list is intentionally short. Resist adding "Verified Customer" / 
"VIP Tier 2" subdivisions — you're one person, more roles = more drift.

---

## 3. Channel structure

Channel names use a leading emoji for visual scanning. Topics are written
paste-ready.

### 📌 INFO

| Channel | Type | Topic |
|---|---|---|
| `📍-start-here` | Text, locked except @Newcomer/@Member | First stop. Pick interest tags, intro yourself, see how to hire me. |
| `📜-rules` | Text, read-only | Be cool. No leak of unreleased client work. No DM-pitching members. Full rules below. |
| `📰-news` | Announcement | Site updates, package launches, availability changes, occasional dev journal posts. |
| `🛠️-changelog` | Text, read-only | Webhook from GitHub: every commit/deploy on the public repos lands here. Living portfolio. |
| `❓-faq` | Text, read-only | Threaded answers to repeat questions. New questions worth keeping get pulled here. |

### 💼 HIRE ME

This is the conversion engine. Order of channels matters — top to bottom is
the funnel.

| Channel | Type | Topic |
|---|---|---|
| `📋-services` | Text, read-only | Pinned embed cards for the four offerings: Discord Bot, Rust/DayZ Mod, FiveM Resource, Marketing Site. Linked to `/services`. |
| `💵-pricing` | Text, read-only | $60/hr Discord bots · $80/hr game scripts · packaged rates. Linked to `/pricing`. Says "This is the same pricing as the website. I don't quote different rates in DMs." |
| `📅-availability` | Text, read-only | Live status: open slots this month, current queue, next-available date. Updated weekly by the founder. |
| `💬-quote-a-project` | Forum | One post = one quote thread. Auto-prompts a template (game/platform, scope, budget, deadline). Visible only to OP + @Founder. |
| `📦-active-projects` | Text, read-only | One line per active client engagement (anonymized if requested) with status emoji. Public. |
| `🏆-shipped` | Text, read-only | Every shipped project gets a post here. Screenshot, what it does, tech stack, optional client quote. The portfolio in motion. |

**Why the public `availability` and `active-projects` channels matter:**
they replace the dreaded "DM me for availability." Visitors self-qualify
and reach out only when there's an actual open slot, which compresses the
sales cycle dramatically.

### 🧰 WORKSHOP

The "viewing window" into the founder. Not pitched — just visible.

| Channel | Type | Topic |
|---|---|---|
| `🔨-now-building` | Text | Casual posts: "shipped X today," "stuck on Y, here's the rabbit hole," screenshots of in-progress work (with client permission or anonymized). 1–3 posts a week minimum. |
| `📓-dev-journal` | Text, founder-post | Longer-form posts. "Why I rewrote the Rust shop bot's auth," "Turning a 200ms p99 into 20ms." Cross-post worthy ones to LinkedIn / X. |
| `🎬-clips` | Text | Short video/gif clips of bots in action, mod features, before/afters. Auto-embeds. |
| `🧪-experiments` | Text | Things you're trying that aren't client work yet. Open-source repos, prototype bots. Sparks future scope. |

### 🆘 COMMUNITY HELP

This is what makes the server *useful* without you having to be present.
Each channel has a Trusted Builder or two who answer.

| Channel | Type | Topic |
|---|---|---|
| `🤖-discord-bots-help` | Forum | discord.js / py-cord / serenity questions. Tag your library. |
| `🦀-rust-modding-help` | Forum | Oxide & Carbon plugins, hooks, common pitfalls. |
| `🪖-fivem-help` | Forum | QBCore / ESX / standalone resources. |
| `🧟-dayz-help` | Forum | Server scripts, mod conflicts, community-server setup. |
| `🌐-web-help` | Forum | Next.js, Astro, deploy issues. Scoped to game-community sites. |
| `💡-build-advice` | Text | "I want to build X — where do I start?" — high-level architecture chat, faster than forum. |

Forum channels with auto-prompted templates ("game · what you tried · paste
the error") cut down on low-effort posts hard. Carl-bot or Discord's native
forum settings.

### 🔥 COMMUNITY

| Channel | Type | Topic |
|---|---|---|
| `💬-general` | Text | Anything dev/gaming. The town square. |
| `🎮-server-owners` | Text | Audience-specific: running a Rust/DayZ/FiveM server, hosting, mod packs, monetization rules. |
| `🐛-cursed-bugs` | Text | Bug-of-the-day stories. Excellent retention bait. |
| `📚-resources` | Text, read-only | Links: docs, mod APIs, tutorials, your own guides. Editable by `@Trusted Builder`. |
| `🍕-off-topic` | Text | Food, life, music. Keep it kind. |

### 🔊 VOICE

| Channel | Type | Notes |
|---|---|---|
| `🎙️ Office Hours` | Voice + stage | Founder hosts a weekly stage — ask anything, no slide deck. The sales channel that doesn't feel like sales. |
| `👥 Pair Coding` | Voice | Drop-in for screen-share help (free for `@Active Client`, `@Patron`; otherwise time-limited). |
| `🎮 Casual` | Voice | Hang out while working. Often the most-used voice channel. |
| `🤫 AFK` | Voice | Auto-move target. |

### 🎫 TICKETS

| Channel | Type | Notes |
|---|---|---|
| `🎫-tickets` | Text, locked | Hub embed with buttons: "Quote a project", "Active client question", "Press / partnership", "Other". |
| `(auto) ticket-####` | Text, private | Spawned per ticket, visible to OP + `@Founder`. |

The quote ticket is the single most important automation in the whole
server. See §6 for the bot spec.

### 💎 ACTIVE CLIENTS (`@Active Client` only)

When a client is contracted, spawn one private channel per project under a
`◇ PROJECTS` category. Format: `🚧-{client}-{project-shortname}`.

| Channel | Type | Notes |
|---|---|---|
| `🚧-{client}-{project}` | Text, private | Project channel. Founder + that one client only. Daily-ish updates, screenshots, deploy logs. Lives until project closes. |
| `📅-client-events` | Text | Pinned schedule: weekly checkins, demo dates, milestones across all active engagements. Visible to all `@Active Client`. |
| `❓-active-client-help` | Text, private | Cross-client lounge. Active clients can chat, ask each other for advice. Optional — only enable if there are 3+ active. |

Per-project channels move to **archived** (read-only) when the project
closes — clients keep access via `@Alumni Client`. Don't delete; the
history is the receipt.

### 🤝 ALUMNI (`@Alumni Client`, `@Active Client`)

| Channel | Type | Topic |
|---|---|---|
| `🏅-alumni-lounge` | Text | Past clients — quiet, occasional check-ins, founder posts wins/news. |
| `🎁-referrals` | Text | Refer a friend → 10% off your next maintenance retainer or $X store credit. Tracked via per-user code. |

The alumni room is high-leverage because **referrals from past clients
close at 5–10× the rate of cold leads**. One small channel that nudges
this is worth more than any ad budget.

### 🛠️ STAFF / FOUNDER (`@Founder` + `@Trusted Builder` for some)

| Channel | Type | Notes |
|---|---|---|
| `🤖-bot-logs` | Text | All bot audit logs in one place. |
| `📊-server-insights` | Text | Carl-bot or Statbot weekly digest. |
| `📋-leads` | Text | New `#quote-a-project` posts cross-posted with summary so you can scan in one screen. |
| `📝-founder-notes` | Text, founder-only | Scratchpad — what's working, what isn't. |

---

## 4. Onboarding flow

Run with **Carl-bot** (reaction roles) + **Discord's native onboarding screen**
(rules accept). No need for MEE6 unless you want levels later.

1. **Join** → user lands on Discord's onboarding screen with the rules.
2. After accepting → they get `@Newcomer` and see only `#welcome`, `#rules`,
   `#start-here`.
3. **`#start-here` welcome embed** with two question blocks:

   **Why are you here?** *(grants `@Member` + sets primary intent)*
   - 💼 To hire someone for a project
   - 🛠️ I'm a dev — here to help and learn
   - 🎮 Game server owner, browsing
   - 👀 Just lurking

   **What are you into?** *(self-assignable interest tags, multi-select)*
   - `@discord-bots` `@rust-mods` `@dayz-mods` `@fivem` `@web-dev` `@hiring`

4. After picking → bot DMs a 60-second tour:
   - "Pricing is in `#pricing` — same as the website."
   - "Currently open slots: see `#availability`."
   - "Want a quote? `#quote-a-project` — takes 2 minutes."
   - "Just here to learn? Help channels are forum-style, very active."

### Welcome embed copy (paste-ready)

```
✦ inspire⚡ Development ✦

Small shop. Fast ships. I build Discord bots, Rust/DayZ/FiveM mods,
and websites for gaming communities.

▸ Hourly: $60 Discord bots · $80 game scripts · packaged rates in #pricing
▸ Currently: see #availability for open slots and queue
▸ Need a quote? #quote-a-project — 2 minutes, real reply within 24h

Pick what you're here for ↓ to unlock the rest of the server.
```

---

## 5. Recurring rhythm

The cadence that keeps the server alive without burning you out.

| Cadence | Event | Channel | Owner effort |
|---|---|---|---|
| **Daily-ish** | One screenshot or 2-line note in `#now-building` | `#now-building` | 60 sec |
| **Weekly (Mon)** | Update `#availability` with this week's queue + open slots | `#availability` | 5 min |
| **Weekly (Wed)** | Office Hours stage — 30 min, ask-anything | `🎙️ Office Hours` | 30 min |
| **Weekly (Fri)** | "Shipped this week" recap post | `#shipped` | 10 min |
| **Bi-weekly** | Long-form `#dev-journal` post (~500 words). Cross-post excerpt to X / LinkedIn. | `#dev-journal` | 1 hr |
| **Monthly** | Founder's note in `#news` — wins, lessons, what's coming | `#news` | 30 min |
| **Quarterly** | Open-source release: a small useful thing (a Discord-bot template, a Rust plugin). Posts to `#experiments` + GitHub. | `#experiments` | 1 day |

Skip a beat sometimes — that's fine. Don't fake a rhythm; it shows.

---

## 6. Bots & automations

| Bot | Role | Why |
|---|---|---|
| **Carl-bot** | Reaction roles, automod, scheduled posts, sticky messages | Free, dependable. The default. |
| **Ticket Tool** | Quote/support tickets | One-button quote intake. |
| **Sesh** | Office Hours scheduling, RSVPs, timezone-aware reminders | Native Discord events are okay; Sesh is better for recurring. |
| **GitHub webhook** *(native)* | Pipes commits to `#changelog` | Free. Live portfolio. |
| **Statbot** | Server analytics | Tells you which channel actually generates leads. |
| **Voicemaster** | Auto-spawn voice rooms when full | Voice never empty. |
| **Custom Inspire bot** *(build later)* | Stripe → role grants → project-channel spawn → `#active-projects` updates | The single piece that turns this from "Discord with a lot of channels" into a sales system. |

### Custom-bot must-haves (priority order)

1. **`/quote` slash command** — opens a forum post in `#quote-a-project`
   pre-filled with a template (game/platform, scope, deadline, budget). DMs
   founder with a summary.
2. **Stripe webhook → role + channel automation** — when a deposit invoice
   is paid:
   - Promote user to `@Active Client`
   - Create `🚧-{client}-{project}` channel under `◇ PROJECTS`
   - Post a starter embed in `#active-projects` ("New: {project}, kicking off {date}")
   - DM client with onboarding checklist (access requests, kickoff date, what you need from them)
3. **Project-close flow** — owner runs `/project close {channel}`:
   - Demote `@Active Client` → `@Alumni Client` (if no other active project)
   - Archive the project channel (lock posts, keep history)
   - Post a "Shipped" embed in `#shipped` with optional fields the client fills
   - Send a referral-code DM 7 days later
4. **`/availability` admin command** — updates the pinned embed in
   `#availability` with current open-slot count and next-available date.
5. **GitHub deploy → `#shipped` cross-post** — when a tagged release lands on
   one of your client repos, optionally post a "Shipped vN" entry.

---

## 7. Sales funnel — the actual mechanics

```
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│   Discovery        │    │   Engagement       │    │   Conversion       │
│                    │    │                    │    │                    │
│ #shipped           │ ─► │ #now-building      │ ─► │ #quote-a-project   │
│ #changelog         │    │ #dev-journal       │    │ → ticket spawned   │
│ #portfolio (site)  │    │ Office Hours stage │    │ → 24h reply SLA    │
│ X / LinkedIn       │    │ help channels      │    │                    │
└────────────────────┘    └────────────────────┘    └─────────┬──────────┘
                                                              │
                                                              ▼
                                                  ┌────────────────────┐
                                                  │  Stripe deposit    │
                                                  │  link in ticket    │
                                                  └─────────┬──────────┘
                                                            │
                                                            ▼
                                                  ┌────────────────────┐
                                                  │ Bot grants         │
                                                  │ @Active Client,    │
                                                  │ spawns project     │
                                                  │ channel, posts to  │
                                                  │ #active-projects   │
                                                  └─────────┬──────────┘
                                                            │
                                                            ▼
                                                  ┌────────────────────┐
                                                  │ Ship → #shipped    │
                                                  │ post becomes new   │
                                                  │ social proof at    │
                                                  │ funnel top         │
                                                  └─────────┬──────────┘
                                                            │
                                                            ▼
                                                  ┌────────────────────┐
                                                  │ Client → Alumni;   │
                                                  │ referral DM after  │
                                                  │ 7 days; testimonial│
                                                  │ ask after 30 days  │
                                                  └────────────────────┘
```

Three closed loops to design for explicitly:

- **Showcase loop** — every shipped project becomes top-of-funnel content.
- **Referral loop** — alumni get a per-user referral code that grants the
  referee 10% off and the referrer credit on their next maintenance.
- **Help-desk-as-marketing loop** — answering forum questions in
  `#discord-bots-help` etc. visibly (not paywalled) is your best lead-gen.
  Half the people who come to ask for free help eventually have a real
  budget; treat the answers as marketing impressions.

---

## 8. Pricing visibility — the differentiator

Most dev-shop Discords hide pricing. Yours should not.

- `#pricing` mirrors the site's `/pricing` page exactly. Same numbers, same
  packages.
- Pinned message starts with **"Same prices as the website. I don't quote
  different rates in DMs — saves us both time."** This single sentence
  prevents 90% of haggle DMs.
- `#availability` makes scheduling transparent. Format:
  ```
  ⚡ open slots
    May 6 — 1 slot · small (≤ 1 wk)
    May 13 — 2 slots
    May 20 — full
    May 27 — 1 slot

  current queue
    Project A · ETA May 8
    Project B · ETA May 17
    Project C · ETA May 22

  next available start: May 6
  ```

This also serves as accountability: **public commitments push you to ship
on time.**

---

## 9. Moderation & safety

- **Discord automod** for spam, mention spam, slur list. Action: timeout 10 min.
- **Carl-bot** for link filter outside `#resources` and `#shipped`.
- **No DM solicitation rule.** Members poaching leads from your server is
  the only ban-on-first-offense rule. Pin it in `#rules`.
- **Slowmode** in `#general` (10s) and `#discord-bots-help` text channel
  (30s). Forum channels don't need it.
- **All quotes go through tickets.** Anyone DM'ing for a quote gets pointed
  to `#quote-a-project`. Keeps a paper trail and prevents scope drift in DMs.

---

## 10. KPIs — what to actually watch

| Metric | Source | Target (90 days in) |
|---|---|---|
| Active members per week | Server Insights | 80–150 |
| `#quote-a-project` posts | Bot | 4–10 / month |
| Quote → contracted conversion | Bot + Stripe | 30%+ (a high bar — services close differently than products) |
| Office Hours attendance | Sesh | 5–15 / week |
| `#shipped` cadence | Manual | ≥ 1 / week |
| Alumni → referral conversion | Custom bot | 1–2 referrals / quarter to start |
| Discord-attributed revenue | UTM `?utm_source=discord` on every outbound link | The number that justifies all of this |

If after 90 days the server has lots of activity but no quotes, the funnel
is broken — usually because **`#hire-me` isn't visible enough** or
**`#availability` isn't being updated**.

---

## 11. 30 / 60 / 90 day rollout

### Days 1–7 — Skeleton & seed
- Roles, categories, channels exactly as above
- Carl-bot + Ticket Tool + Sesh + GitHub webhook to `#changelog`
- Write the welcome embed; wire onboarding reaction-roles
- Pin pricing + availability messages
- Manually invite past clients, X followers, friendly devs (~30 seed members)

### Days 8–30 — Content rhythm + first ship
- Daily `#now-building` posts (low bar — even one screenshot)
- First weekly Office Hours
- First `#dev-journal` post — cross-post excerpt
- First "Shipped this week" recap, even if just past work backfilled
- First quote ticket end-to-end (pretend if needed; document the flow)

### Days 31–60 — Funnel close
- Build the **custom Stripe → Discord bot** (priority items 1–3 from §6)
- Backfill `@Alumni Client` for past clients
- Open `#shipped` with 5–10 prior projects as seed
- Launch `#hire-me` referral program

### Days 61–90 — Community moats
- First open-source quarterly release in `#experiments`
- Promote 1–2 active community helpers to `@Trusted Builder`
- Audit dead channels — archive ruthlessly
- First retrospective post: what worked, what didn't, what's next

---

## 12. What *not* to do

- **Don't gate pricing.** The whole brand is anti-this. Pricing in Discord
  matches pricing on the site. Anyone asking for a "private rate" gets the
  same answer as the website.
- **Don't run announcements with `@everyone`.** Use `@Member` or interest
  tags so people opt out without leaving.
- **Don't build a level system early.** Levels work for big servers; in a
  small founder-led server they create perverse incentives (spammy
  one-liners).
- **Don't archive too slowly.** Channel sprawl kills small servers. Quarterly
  archive review.
- **Don't make `#general` the first channel a new joiner sees.** Always
  funnel through `#start-here`.
- **Don't hide active client work entirely.** Anonymized progress posts
  in `#now-building` (with permission) are the most effective marketing
  you have. Share the *shape* of the work even if you can't share the
  client name.
- **Don't take on a `@Trusted Builder` you wouldn't hire.** They speak for
  the brand in help channels.

---

## 13. Appendix — paste-ready content

### `#📜-rules`

```
1. Be cool. No personal attacks, slurs, harassment.
2. No DM-pitching members for work. Use #quote-a-project. This is the
   only ban-on-first-offense rule.
3. No leaks of unreleased client work. Confidentiality is a sales feature.
4. Help channels: read the pinned template before posting. Effort gets effort.
5. Self-promo: keep to #shipped (yours), #experiments (yours), or
   #resources (community-edited). Don't post your own server / store
   anywhere else.
6. NSFW = ban.
7. Follow Discord's ToS.
```

### `#📍-start-here` welcome message

```
✦ inspire⚡ Development ✦

Small shop. Fast ships.

I build:
   🤖  Discord bots ($60/hr)
   🦀  Rust / DayZ / FiveM mods ($80/hr)
   🌐  Marketing sites for gaming communities (packaged rates)

   ▸ Pricing → #💵-pricing  (same as the website)
   ▸ Availability → #📅-availability  (live queue, open slots)
   ▸ Quote a project → #💬-quote-a-project  (24h reply)

Pick what you're here for below to unlock the rest:

   💼  Hiring for a project
   🛠️  Dev — helping & learning
   🎮  Game server owner, browsing
   👀  Just lurking

Then pick interests so I can ping you about relevant stuff only:

   @discord-bots  @rust-mods  @dayz-mods  @fivem  @web-dev  @hiring
```

### `#📅-availability` pinned message format

```
⚡ open slots
   May 6 — 1 slot · small (≤ 1 wk)
   May 13 — 2 slots
   May 20 — full
   May 27 — 1 slot

current queue
   {Client A} · ETA May 8
   {Client B} · ETA May 17
   {Client C} · ETA May 22

next available start:  May 6

want a slot? → #💬-quote-a-project
last updated: {auto, by bot or weekly manually}
```

### `#💵-pricing` pinned message intro

```
Same prices as the website. I don't quote different rates in DMs —
saves us both time.

   Discord bots:        $60/hr
   Rust / DayZ / FiveM: $80/hr
   Marketing site:      $1,500 packaged (more in /pricing)
   Larger jobs:         fixed-price quote in #quote-a-project

Why hourly is published: I want clients who pick the rate, not who
get talked into one. If the budget is tight, say so up-front in the
quote ticket — I'd rather scope down than over-commit.
```

---

*Document version 2.0 — rebuilt 2026-04-30 against the Inspire Development brand
(was previously written against the legacy "Inspire Custom PCs" README).*
