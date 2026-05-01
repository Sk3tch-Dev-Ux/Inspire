// Thin REST wrapper around discord.com/api/v10.
// All bot actions (create channel, grant role, send DM, edit message)
// go through this single module so retry / logging / rate-limit handling
// has one place to live.

import { discordEnv } from './env';
import type { Embed } from './types';

const API_BASE = 'https://discord.com/api/v10';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  // Reason header — shows up in the audit log.
  reason?: string;
};

class DiscordRestError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message: string) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function rest(path: string, opts: FetchOptions = {}) {
  const headers: Record<string, string> = {
    Authorization: `Bot ${discordEnv.botToken}`,
    'Content-Type': 'application/json',
    'User-Agent': 'InspireBot (https://inspirepc.com, 0.1)',
  };
  if (opts.reason) headers['X-Audit-Log-Reason'] = opts.reason;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  // 204 No Content has no body.
  if (res.status === 204) return null;

  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw new DiscordRestError(
      res.status,
      body,
      `Discord ${opts.method || 'GET'} ${path} failed: ${res.status} ${JSON.stringify(body)}`,
    );
  }
  return body;
}

// ─── Interactions ────────────────────────────────────────────────

export function patchOriginalInteraction(
  applicationId: string,
  interactionToken: string,
  body: { content?: string; embeds?: Embed[] },
) {
  return rest(`/webhooks/${applicationId}/${interactionToken}/messages/@original`, {
    method: 'PATCH',
    body,
  });
}

// ─── Channels & messages ─────────────────────────────────────────

export function createGuildChannel(
  guildId: string,
  body: {
    name: string;
    type: number;
    parent_id?: string;
    topic?: string;
    permission_overwrites?: Array<{ id: string; type: 0 | 1; allow: string; deny: string }>;
  },
  reason?: string,
) {
  return rest(`/guilds/${guildId}/channels`, { method: 'POST', body, reason });
}

export function modifyChannel(
  channelId: string,
  body: { name?: string; parent_id?: string; locked?: boolean; archived?: boolean },
  reason?: string,
) {
  return rest(`/channels/${channelId}`, { method: 'PATCH', body, reason });
}

export function postMessage(
  channelId: string,
  body: { content?: string; embeds?: Embed[] },
) {
  return rest(`/channels/${channelId}/messages`, { method: 'POST', body });
}

export function editMessage(
  channelId: string,
  messageId: string,
  body: { content?: string; embeds?: Embed[] },
) {
  return rest(`/channels/${channelId}/messages/${messageId}`, {
    method: 'PATCH',
    body,
  });
}

export function startForumThread(
  forumChannelId: string,
  body: {
    name: string;
    message: { content?: string; embeds?: Embed[] };
    auto_archive_duration?: number;
  },
) {
  return rest(`/channels/${forumChannelId}/threads`, { method: 'POST', body });
}

// ─── Members & roles ─────────────────────────────────────────────

export function addRoleToMember(
  guildId: string,
  userId: string,
  roleId: string,
  reason?: string,
) {
  return rest(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'PUT',
    reason,
  });
}

export function removeRoleFromMember(
  guildId: string,
  userId: string,
  roleId: string,
  reason?: string,
) {
  return rest(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'DELETE',
    reason,
  });
}

export function getGuildMember(guildId: string, userId: string) {
  return rest(`/guilds/${guildId}/members/${userId}`);
}

// ─── DMs ─────────────────────────────────────────────────────────

export async function sendDirectMessage(
  userId: string,
  body: { content?: string; embeds?: Embed[] },
) {
  const dm = (await rest(`/users/@me/channels`, {
    method: 'POST',
    body: { recipient_id: userId },
  })) as { id: string };
  return postMessage(dm.id, body);
}

// ─── Application commands ────────────────────────────────────────

export function bulkOverwriteGuildCommands(
  applicationId: string,
  guildId: string,
  commands: unknown[],
) {
  return rest(`/applications/${applicationId}/guilds/${guildId}/commands`, {
    method: 'PUT',
    body: commands,
  });
}

export { DiscordRestError };
