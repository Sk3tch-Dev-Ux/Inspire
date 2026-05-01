// CLI: idempotently create the roles + categories + channels described in
// docs/DISCORD-LAYOUT.md for the configured guild.
//
// Run:
//   docker exec inspire-web npx tsx scripts/discord-bootstrap-server.ts
//
// Skips anything that already exists (matched by name). Prints a summary
// of role/channel IDs at the end — paste those into your env file.

import { discordEnv } from '@/lib/discord/env';

const API = 'https://discord.com/api/v10';

type DiscordChannel = { id: string; name: string; type: number; parent_id?: string | null };
type DiscordRole = { id: string; name: string; color: number };

const ROLES: Array<{ name: string; color: number; envKey: string }> = [
  { name: '@Founder', color: 0xff6b1a, envKey: 'DISCORD_ROLE_FOUNDER' },
  { name: '@Trusted Builder', color: 0xff8742, envKey: 'DISCORD_ROLE_TRUSTED_BUILDER' },
  { name: '@Active Client', color: 0xfafaf7, envKey: 'DISCORD_ROLE_ACTIVE_CLIENT' },
  { name: '@Alumni Client', color: 0x7a7a7a, envKey: 'DISCORD_ROLE_ALUMNI_CLIENT' },
  { name: '@Patron', color: 0xcc4a00, envKey: 'DISCORD_ROLE_PATRON' },
  { name: '@Member', color: 0x2d2d2d, envKey: 'DISCORD_ROLE_MEMBER' },
  { name: '@Newcomer', color: 0x1a1a1a, envKey: 'DISCORD_ROLE_NEWCOMER' },
];

type ChannelSpec =
  | { kind: 'category'; name: string; envKey?: string }
  | { kind: 'text'; name: string; parent: string; topic?: string; envKey?: string }
  | { kind: 'forum'; name: string; parent: string; topic?: string; envKey?: string };

const SCHEMA: ChannelSpec[] = [
  { kind: 'category', name: '📌 INFO' },
  { kind: 'text', name: '📍-start-here', parent: '📌 INFO' },
  { kind: 'text', name: '📜-rules', parent: '📌 INFO' },
  { kind: 'text', name: '📰-news', parent: '📌 INFO' },
  { kind: 'text', name: '🛠️-changelog', parent: '📌 INFO' },
  { kind: 'text', name: '❓-faq', parent: '📌 INFO' },

  { kind: 'category', name: '💼 HIRE ME' },
  { kind: 'text', name: '📋-services', parent: '💼 HIRE ME' },
  { kind: 'text', name: '💵-pricing', parent: '💼 HIRE ME' },
  { kind: 'text', name: '📅-availability', parent: '💼 HIRE ME', envKey: 'DISCORD_CHANNEL_AVAILABILITY' },
  { kind: 'forum', name: '💬-quote-a-project', parent: '💼 HIRE ME', envKey: 'DISCORD_FORUM_QUOTES' },
  { kind: 'text', name: '📦-active-projects', parent: '💼 HIRE ME', envKey: 'DISCORD_CHANNEL_ACTIVE_PROJECTS' },
  { kind: 'text', name: '🏆-shipped', parent: '💼 HIRE ME', envKey: 'DISCORD_CHANNEL_SHIPPED' },

  { kind: 'category', name: '🧰 WORKSHOP' },
  { kind: 'text', name: '🔨-now-building', parent: '🧰 WORKSHOP' },
  { kind: 'text', name: '📓-dev-journal', parent: '🧰 WORKSHOP' },
  { kind: 'text', name: '🎬-clips', parent: '🧰 WORKSHOP' },
  { kind: 'text', name: '🧪-experiments', parent: '🧰 WORKSHOP' },

  { kind: 'category', name: '🆘 COMMUNITY HELP' },
  { kind: 'forum', name: '🤖-discord-bots-help', parent: '🆘 COMMUNITY HELP' },
  { kind: 'forum', name: '🦀-rust-modding-help', parent: '🆘 COMMUNITY HELP' },
  { kind: 'forum', name: '🪖-fivem-help', parent: '🆘 COMMUNITY HELP' },
  { kind: 'forum', name: '🧟-dayz-help', parent: '🆘 COMMUNITY HELP' },
  { kind: 'forum', name: '🌐-web-help', parent: '🆘 COMMUNITY HELP' },
  { kind: 'text', name: '💡-build-advice', parent: '🆘 COMMUNITY HELP' },

  { kind: 'category', name: '🔥 COMMUNITY' },
  { kind: 'text', name: '💬-general', parent: '🔥 COMMUNITY' },
  { kind: 'text', name: '🎮-server-owners', parent: '🔥 COMMUNITY' },
  { kind: 'text', name: '🐛-cursed-bugs', parent: '🔥 COMMUNITY' },
  { kind: 'text', name: '📚-resources', parent: '🔥 COMMUNITY' },
  { kind: 'text', name: '🍕-off-topic', parent: '🔥 COMMUNITY' },

  { kind: 'category', name: '◇ PROJECTS', envKey: 'DISCORD_CATEGORY_PROJECTS' },
  { kind: 'category', name: '◈ ARCHIVED', envKey: 'DISCORD_CATEGORY_ARCHIVED' },

  { kind: 'category', name: '🛠️ STAFF / FOUNDER' },
  { kind: 'text', name: '🤖-bot-logs', parent: '🛠️ STAFF / FOUNDER' },
  { kind: 'text', name: '📊-server-insights', parent: '🛠️ STAFF / FOUNDER' },
  { kind: 'text', name: '📋-leads', parent: '🛠️ STAFF / FOUNDER', envKey: 'DISCORD_CHANNEL_LEADS' },
  { kind: 'text', name: '📝-founder-notes', parent: '🛠️ STAFF / FOUNDER' },
];

async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bot ${discordEnv.botToken}`,
      'Content-Type': 'application/json',
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  if (res.status === 204) return null;
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${path} → ${res.status} ${JSON.stringify(body)}`);
  return body;
}

async function ensureRoles(): Promise<Map<string, string>> {
  const existing = (await api(`/guilds/${discordEnv.guildId}/roles`)) as DiscordRole[];
  const byName = new Map(existing.map((r) => [r.name, r.id]));
  const out = new Map<string, string>();
  for (const r of ROLES) {
    if (byName.has(r.name)) {
      out.set(r.envKey, byName.get(r.name)!);
      continue;
    }
    const created = (await api(`/guilds/${discordEnv.guildId}/roles`, {
      method: 'POST',
      body: JSON.stringify({ name: r.name, color: r.color, mentionable: false }),
    })) as DiscordRole;
    out.set(r.envKey, created.id);
    console.log(`+ created role ${r.name}`);
  }
  return out;
}

async function ensureChannels(): Promise<Map<string, string>> {
  const existing = (await api(`/guilds/${discordEnv.guildId}/channels`)) as DiscordChannel[];
  const byKey = new Map(existing.map((c) => [`${c.parent_id ?? '_'}:${c.name}`, c]));
  const categoryIds = new Map<string, string>();
  const envOut = new Map<string, string>();

  // Pass 1: categories.
  for (const spec of SCHEMA.filter((s) => s.kind === 'category')) {
    const lookup = `_:${spec.name}`;
    const found = byKey.get(lookup);
    if (found) {
      categoryIds.set(spec.name, found.id);
    } else {
      const created = (await api(`/guilds/${discordEnv.guildId}/channels`, {
        method: 'POST',
        body: JSON.stringify({ name: spec.name, type: 4 }),
      })) as DiscordChannel;
      categoryIds.set(spec.name, created.id);
      console.log(`+ created category ${spec.name}`);
    }
    if (spec.envKey) envOut.set(spec.envKey, categoryIds.get(spec.name)!);
  }

  // Pass 2: child channels.
  for (const spec of SCHEMA.filter((s) => s.kind !== 'category')) {
    const child = spec as Exclude<ChannelSpec, { kind: 'category' }>;
    const parentId = categoryIds.get(child.parent);
    if (!parentId) continue;
    const lookup = `${parentId}:${child.name}`;
    const found = byKey.get(lookup);
    let id: string;
    if (found) {
      id = found.id;
    } else {
      const created = (await api(`/guilds/${discordEnv.guildId}/channels`, {
        method: 'POST',
        body: JSON.stringify({
          name: child.name,
          type: child.kind === 'forum' ? 15 : 0,
          parent_id: parentId,
          topic: child.topic,
        }),
      })) as DiscordChannel;
      id = created.id;
      console.log(`+ created ${child.kind} ${child.name}`);
    }
    if (child.envKey) envOut.set(child.envKey, id);
  }

  return envOut;
}

async function main() {
  console.log(`Bootstrapping guild ${discordEnv.guildId}...`);
  const roleEnv = await ensureRoles();
  const channelEnv = await ensureChannels();

  console.log('\n══ Paste the following into your .env (or update existing values) ══\n');
  for (const [k, v] of [...roleEnv, ...channelEnv]) {
    console.log(`${k}=${v}`);
  }
  console.log('\n✅ Bootstrap complete.');
}

main().catch((err) => {
  console.error('❌ Bootstrap failed:', err);
  process.exit(1);
});
