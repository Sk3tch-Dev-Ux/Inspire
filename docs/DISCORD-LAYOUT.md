# Inspire Custom PCs — Discord Server Layout

> A complete, end-to-end blueprint for an Inspire-branded Discord server designed
> around two goals: **engage a real PC-enthusiast community** and **convert that
> attention into custom PC orders**. Every channel, role, and bot is justified
> against one of those two goals.

---

## 0. Strategic frame

Most "company Discords" fail because they treat the server as a help-desk extension.
This layout treats it as a **funnel + clubhouse** with three concentric rings:

| Ring | Audience | Purpose | Conversion signal |
|---|---|---|---|
| **Public** | Anyone — enthusiasts, tire-kickers | Discovery, content, fun | Joins server |
| **Members** | Verified, opt-in | Build advice, deals, events | Asks for a quote |
| **Customers** | Verified order | Support, warranty, VIP | Reorders / referrals |

Channels are organized so that someone can join, get value for free, and
self-select toward a purchase without ever feeling marketed-at.

Brand voice: confident, technical, slightly playful. Same energy as the site —
electric cyan / volt green, dark backgrounds, no corporate stiffness.

---

## 1. Server settings

| Setting | Value |
|---|---|
| **Server name** | Inspire Custom PCs |
| **Vanity URL** | `discord.gg/inspire` (requires Boost Level 3) |
| **Verification level** | Medium (must have verified email + 5 min member) |
| **Default notifications** | Only @mentions |
| **Explicit content filter** | Scan from members without a role |
| **Boost progress bar** | Enabled |
| **AFK channel** | `#afk-shop` (5 min timeout) |
| **System messages channel** | `#welcome-bay` (joins only, no boosts here) |
| **Community features** | Enabled (unlocks announcements, discovery, insights) |
| **Discoverable** | Yes — keywords: PC building, custom PC, gaming PC, workstation |

### Server icon & banner
- Icon: Inspire "I" mark on midnight, electric-cyan halo
- Banner: rotating render of a current featured build (update monthly)
- Splash invite: photo of a finished build, tagline "Built for the way you play."

---

## 2. Role hierarchy

Roles are sorted top-to-bottom with permission-cascade in mind. Color codes
mirror the site palette.

```
@Founder          #00D4FF  (electric cyan)   — owner only
@Crew             #00FF88  (volt green)      — staff / employees
@Tech Support     #14F1FF                    — warranty handlers
@Build Advisor    #14F1FF                    — quote / spec advisors
@Moderator        #FFB400                    — community mods
@Bot              #5865F2                    — bots only

@VIP Founder      #FFD700  (gold)            — Tier-3 package buyers, lifetime
@Inspired         #C792EA  (lavender)        — verified customer (any tier)
@Beta Builder     #FF6F91                    — early access, test new packages
@Streamer         #E91E63                    — affiliate / partner
@Boost Buddy      #F47FFF                    — server booster

@Member           #B0BEC5                    — verified, default human role
@Newcomer         #6B7280                    — pre-onboarding, limited channels
@Quote Pending    #FFA726                    — opened a quote ticket
@Order Pending    #2196F3                    — paid, awaiting build/ship
@Muted            #424242                    — moderation
```

**Permission rules of thumb**
- `@Newcomer` sees only `#welcome-bay`, `#rules`, and `#start-here`. Cannot send messages.
- `@Member` is the default after onboarding; sees everything public + community.
- `@Inspired` unlocks `#vip-lounge`, `#warranty`, `#upgrade-path`, plus reaction
  rights in showcase channels.
- `@VIP Founder` adds access to `#founders-table` (private, monthly Q&A with the owner).
- Staff roles (`@Crew`, `@Tech Support`, etc.) inherit through `@Crew` for blanket access.

---

## 3. Channel structure

> Channel names use leading emoji to scan visually in the sidebar. Topic strings
> are written as if the channel were already public — copy them verbatim into
> Discord.

### 📌 INFO

| Channel | Type | Topic |
|---|---|---|
| `📍-start-here` | Text, locked except @Newcomer/@Member | Read this first. Pick your roles, intro yourself, and grab the discord-only promo code. |
| `📜-rules` | Text, read-only | Be cool. No leaks of unreleased builds. No reselling our coupons. Full rules below. |
| `📰-announcements` | Announcement | Drops, sales, restocks, new package launches. Subscribe to mirror to your own server. |
| `💎-deals-and-drops` | Announcement | Discord-exclusive promos, GPU price drops, refurb units. Pings `@Member` weekly at most. |
| `🛠️-changelog` | Text, read-only | Site updates, new features, infrastructure changes. Source-of-truth log. |
| `❓-faq` | Text, read-only | Threaded answers to repeat questions. Mods convert good help-channel exchanges into FAQ threads. |

### 🛒 SHOP & QUOTES

| Channel | Type | Topic |
|---|---|---|
| `🧰-package-tiers` | Text, read-only | Embed cards for Starter / Performance / Elite / Custom. "Click 💬 to start a quote." |
| `💬-request-a-quote` | Forum | Opens a private ticket via bot. Each post = one quote. Visible only to OP + advisors. |
| `📦-order-tracking` | Text, read-only | Webhook from Stripe + your fulfillment system. One line per order with status emoji. |
| `🎁-giveaways` | Text, read-only | Bot-driven. Monthly accessory or part. Entry by reaction; auto-pull winner. |
| `🤝-referral-program` | Text | Earn $50 store credit per friend who orders. Bot tracks referral codes per user. |

### 🧠 BUILD ADVICE (community-led, lightly moderated)

| Channel | Type | Topic |
|---|---|---|
| `💡-build-advice` | Text | "What should I build for $X?" — community + advisors weigh in. Quote-ready leads get pulled into DM. |
| `🧪-parts-talk` | Text | GPU drops, CPU rumors, RAM kits. Tech news. Open to all. |
| `🪛-troubleshooting` | Forum | One thread per issue. Bot prompts a template (symptoms / parts / what you've tried). |
| `🎨-cable-management` | Text | Image-only, photos of cable runs, mounts, custom sleeves. Reactions only. |
| `🖼️-build-of-the-week` | Text, read-only | Curated. Mods promote one community build every Monday with full specs + photos. |

### 🔥 SHOWCASE

| Channel | Type | Topic |
|---|---|---|
| `🏗️-our-builds` | Text, staff-post | Every Inspire build that ships gets a post. Photo + specs + customer first name. Customer can reply. |
| `📸-customer-rigs` | Text | Customers post their delivered build photos. `@Inspired` only can post; everyone reacts. |
| `🎮-benchmarks` | Text | Frame counters, 3DMark / Cinebench scores. Friendly leaderboards. |
| `🎥-streams-and-videos` | Text | YouTube/Twitch links. Auto-embed. `@Streamer` posts get pinned for 24h. |

### 🤝 COMMUNITY

| Channel | Type | Topic |
|---|---|---|
| `💬-general` | Text | Anything PC, gaming, tech-adjacent. The town square. |
| `🎮-gaming-lfg` | Text | Looking-for-group. Tag the game in topic. |
| `🍕-off-topic` | Text | Memes, food, life. Keep it kind. |
| `🐶-pets-of-inspire` | Text | The most engaging channel in any server. Don't skip this. |
| `🎵-music-and-vibes` | Text + voice | Music bot pinned, share what's on. |

### 🔊 VOICE

| Channel | Type | Notes |
|---|---|---|
| `🎙️ Build Talk` | Voice + stage | Owner hosts a monthly "Office Hours" stage. Public. |
| `🎮 Gaming 1 / 2 / 3` | Voice | Auto-spawn additional rooms when full (via Voicemaster bot). |
| `🛠️ Tech Help` | Voice | Drop-in for screen-share troubleshooting with `@Tech Support`. |
| `🤫 AFK` | Voice | Auto-move target. |

### 🎟️ TICKETS (private, bot-managed)

| Channel | Type | Notes |
|---|---|---|
| `🎫-tickets` | Text, locked | Hub channel with embed: "What do you need help with?" buttons. |
| `(auto) ticket-####` | Text, private | Spawned per ticket. Visible to OP + relevant staff role. |

Ticket categories (each a button on the hub embed):
- **Quote a build** → spawns thread, pings `@Build Advisor`
- **Order issue** → pings `@Crew`
- **Warranty / RMA** → pings `@Tech Support`, requires order ID input
- **Partnership / press** → pings `@Founder`
- **Anything else** → general queue

### 💎 CUSTOMER LOUNGE (`@Inspired` and above)

| Channel | Type | Topic |
|---|---|---|
| `🛡️-warranty` | Text | Threaded warranty questions. Faster than email. |
| `🔧-upgrade-path` | Text | Bring back your old Inspire build for upgrade quotes. Loyalty pricing. |
| `🪞-vip-lounge` | Text | Customer-only chat. Early access to new packages 48h before public. |
| `📅-events` | Text | RSVP-driven. Range from "GPU drop watch party" to "owner's monthly Q&A." |

### 👑 VIP FOUNDERS (`@VIP Founder` only — Elite tier customers)

| Channel | Type | Topic |
|---|---|---|
| `🍷-founders-table` | Text | Direct line to the owner. Monthly written update on the business. |
| `🧪-prototype-lab` | Text | First look at upcoming packages, ask for input on parts. |

### 🛡️ STAFF (`@Crew`+ only)

| Channel | Type | Notes |
|---|---|---|
| `📣-staff-announce` | Text | Internal updates. |
| `📋-handoffs` | Text | Shift handoff notes for support. |
| `🚨-incidents` | Text | Bot pipes site/Stripe alerts here. |
| `🤖-bot-logs` | Text | All bot audit logs in one place. |
| `💼-leads` | Text | New quote tickets cross-posted here so any advisor can pick up. |
| `🗣️-customer-feedback` | Text | Mods drop interesting customer quotes for product use. |

---

## 4. Onboarding flow

Run this with **MEE6** or **Carl-bot** (gates) plus a custom welcome message.

1. **Join** → user lands in `#welcome-bay` with the only visible role being `@Newcomer`.
2. **Welcome embed posts** with three reaction-roles:
   - 🛒 *Looking to buy* → grants `@Member` + visibility to shop channels first
   - 🧠 *Here for build advice* → grants `@Member` + auto-pings `#build-advice`
   - 🎮 *Just here for the community* → grants `@Member` + skips shop on tour
3. **`#start-here`** auto-DMs a 60-second tour:
   - "Here's how to get a free quote"
   - "Here's the showcase channel"
   - "Here's your discord-only `WELCOME10` promo code"
4. **Captcha** via Wick or built-in Discord onboarding (rules accept) before any send permissions.

### Welcome embed copy

```
✦ Welcome to Inspire Custom PCs ✦

We build PCs the way they should be built — quiet, beautiful, fast.

▸ Need a build? Hit "Looking to buy" below to unlock the shop.
▸ Just researching? Pick "Build advice" — our community has opinions.
▸ Already an owner? Drop your order ID in #🎫-tickets to claim your @Inspired role.

Your discord-only code: WELCOME10  (10% off any tier, first order)
```

---

## 5. Bots & automations

| Bot | Role | Why |
|---|---|---|
| **Ticket Tool** *(or custom)* | Tickets, quote intake | The single most important bot for conversion. |
| **Carl-bot** | Reaction roles, automod, scheduled posts | Best free permissions/roles bot. |
| **MEE6** *(optional, paid for premium)* | Levels + welcome + auto-mod | Levels drive retention; gating with levels filters spam joins. |
| **Statbot / Vulkan** | Server analytics | Tells you which channels actually convert. |
| **Sesh** | Events, RSVPs, timezone-aware | Better than Discord's native events for recurring. |
| **Voicemaster** | Auto-create voice rooms | Voice channels never feel empty if they spawn on demand. |
| **GiveawayBot** | Monthly giveaway | Reaction-entry, auto-draw. |
| **Custom Inspire Bot** *(build later)* | Stripe webhooks → role grants → `#order-tracking` posts; quote-form → `#leads`; warranty status lookups | The *integrated* layer. Most company servers never build this and miss the biggest wins. |

### Custom-bot must-haves (priority order)

1. **Stripe → role automation** — when a checkout completes, look up Discord ID
   from the order email (collect during checkout), grant `@Inspired`, post to
   `#order-tracking`, DM the customer their ticket-prefilled with order details.
2. **Quote command** — `/quote budget:2500 use:gaming pref:rgb` opens a thread
   in `#request-a-quote` with a pre-filled embed an advisor can finish.
3. **Order-status lookup** — `/order #12345` returns ship status + tracking
   from your fulfillment provider, pulling from the same DB as the website.
4. **Promo redemption** — bot validates a code, marks it consumed, prevents
   resharing.

---

## 6. Engagement programs (the *recurring* mechanisms)

Events that fire on a schedule — these are what make the server *feel alive*
when the owner isn't posting.

| Cadence | Event | Owner |
|---|---|---|
| **Weekly (Mon)** | "Build of the Week" — staff picks one community/customer build, big embed in `#build-of-the-week` | Mod team |
| **Weekly (Thu)** | "Parts Drop" — Carl-bot scheduled post in `#deals-and-drops` with whatever's on sale that week | Owner |
| **Bi-weekly (Sat)** | "Build Talk" — 30 min stage in `🎙️ Build Talk` voice. Topic posted Friday. | Founder |
| **Monthly (1st)** | Giveaway — peripheral, fan, or accessory. Entry by reaction in `#giveaways`. | Bot + mods |
| **Monthly (15th)** | "Founder's Letter" — text post in `#founders-table` (VIPs) and a public excerpt in `#announcements` | Founder |
| **Quarterly** | "Show Your Setup" contest with prize for best photo. Winner gets feature on the website + IG. | Marketing |
| **Annually** | "Inspire Anniversary" — sale + livestreamed build challenge | Whole team |

---

## 7. Sales funnel mechanics inside Discord

This is the part most servers miss. Each step is **a real channel + a real bot
trigger.**

```
        Discovery                      Engagement                   Conversion
   ┌──────────────────┐           ┌──────────────────┐         ┌──────────────────┐
   │  #announcements  │  ──────►  │  #build-advice   │  ─────► │ #request-a-quote │
   │  #showcase       │           │  voice "Build    │         │ → ticket spawned │
   │  #giveaways      │           │   Talk" stage    │         │ → advisor pings  │
   └──────────────────┘           └──────────────────┘         └──────────────────┘
                                                                          │
                                                                          ▼
                                                              ┌──────────────────────┐
                                                              │ Stripe checkout link │
                                                              │ posted in ticket     │
                                                              └──────────────────────┘
                                                                          │
                                                                          ▼
                                                                ┌──────────────────┐
                                                                │ Bot grants       │
                                                                │ @Inspired role,  │
                                                                │ posts to         │
                                                                │ #order-tracking, │
                                                                │ unlocks customer │
                                                                │ lounge           │
                                                                └──────────────────┘
                                                                          │
                                                                          ▼
                                                              ┌──────────────────────┐
                                                              │ Showcase post in     │
                                                              │ #our-builds when     │
                                                              │ shipped → social     │
                                                              │ proof for next       │
                                                              │ buyer in funnel top  │
                                                              └──────────────────────┘
```

Two closed loops to design for explicitly:

- **Showcase loop** — every shipped build feeds back into discovery. Don't skip
  the photo step.
- **Referral loop** — each `@Inspired` member gets a referral code in DM the day
  after their build ships. Track in `#referral-program`.

---

## 8. Moderation & safety

- **Automod (built-in)** — spam, mention spam, slur list. Action: timeout 10 min.
- **Carl-bot or Wick** — link filter outside `#deals-and-drops`, raid alarms.
- **Verification gate** — Discord's onboarding screen requiring rule accept.
- **Slowmode** in `#general` (10s) and `#build-advice` (30s) — discourages reflex
  arguing about AMD vs Nvidia.
- **No DM staff** rule — all support runs through tickets so it's logged.
- **Modmail** for sensitive issues (refunds, warranty disputes).

---

## 9. KPIs to actually watch

A pretty server is worthless if you can't tell whether it sells. Track monthly:

| Metric | Source | Target (90 days in) |
|---|---|---|
| Joins | Server insights | 50–150/wk steady-state |
| `@Member` activation rate | Carl-bot logs | >70% of joiners |
| Tickets opened in `#request-a-quote` | Bot | 5–15/wk |
| Ticket → paid order conversion | Custom bot + Stripe | 20%+ |
| `@Inspired` count growth | Bot | Tracks paid orders |
| 30-day repeat showcase posts | Manual | A measure of pride/loyalty |
| Discord-attributed revenue | UTM in checkout link | The number that matters |

Add UTMs to every link out of Discord (`?utm_source=discord&utm_campaign=channelname`).
Without that, this whole server is invisible in your analytics.

---

## 10. 30 / 60 / 90 day rollout

### Days 1–7 — Skeleton
- Create roles, categories, channels exactly as above
- Wire Carl-bot, Ticket Tool, Sesh
- Write the welcome embed; stand up reaction-role onboarding
- Manually invite ~30 friends/customers as seed

### Days 8–30 — Content rhythm
- Start "Build of the Week" and "Parts Drop"
- Publish first Founder's Letter
- Run first monthly giveaway
- Add UTM on every site CTA pointing to Discord

### Days 31–60 — Funnel close
- Build the **custom Stripe → Discord bot** (priority items 1–2 from §5)
- Backfill `@Inspired` for all existing customers (manual or via order export)
- Open `#our-builds` with last 10 ship photos as seed posts
- Launch referral program

### Days 61–90 — Community moats
- First "Build Talk" stage event
- First quarterly setup contest
- VIP `@Founder` tier rolled out for past Elite buyers
- Audit: which channels are dead? Archive ruthlessly. A small lively server beats a big dead one.

---

## 11. What *not* to do

- **Don't make a #general-chat be the first channel a new joiner sees.** Always
  funnel through `#start-here` first. Otherwise the server feels chaotic on day one.
- **Don't gate too aggressively.** A 5-step verification kills the conversion
  rate. Two clicks max before they can read everything.
- **Don't post sales pitches in community channels.** `#deals-and-drops` is the
  *only* place outright promo lives. Trust the funnel to do the work.
- **Don't ignore the `@Inspired` lounge after launch.** A customer-only channel
  with no staff activity is worse than no channel at all.
- **Don't run announcements through `@everyone`.** Use role pings (`@Member`,
  `@Inspired`) so people can opt out without leaving.
- **Don't archive too slowly.** Channel sprawl is the #1 cause of dead servers.
  Quarterly archive review.

---

## 12. Appendix — Channel rule blocks (paste-ready)

### `#📜-rules`
```
1. Be cool. No personal attacks, slurs, or harassment. We're here to nerd out.
2. No leaks of unreleased Inspire builds, packages, or pricing.
3. No reselling, sharing, or scraping our promo codes.
4. Keep self-promo to #streams-and-videos. Posting your own store/server elsewhere = ban.
5. NSFW content = instant ban.
6. Follow Discord's ToS. Obviously.
7. DMs from staff are never used for support. We use tickets. If someone DMs you
   pretending to be us — screenshot, report, block.
```

### `#📍-start-here` welcome message
```
✦ Welcome to Inspire ✦

This is the home of Inspire Custom PCs. Join the conversation, get free build
advice, and unlock a discord-only deal.

▸ Pick what you're here for below to unlock the rest of the server:
   🛒  Looking to buy a PC
   🧠  Here for build advice
   🎮  Here to hang out

▸ Already a customer? Open a ticket in #🎫-tickets to claim @Inspired and unlock
   warranty + the customer lounge.

▸ Your welcome code: WELCOME10  (10% off your first order)
```

---

*Document version 1.0 — generated 2026-04-30. Live at `/opt/inspire/docs/DISCORD-LAYOUT.md`.*
