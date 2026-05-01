// Admin-triggered: registers the bot's slash commands with Discord
// for the configured guild. Bulk-overwrite — replaces any existing
// command set so it's always exactly what registry.ts says.
//
// Auth: gated behind ADMIN_PASSWORD via x-admin-password header.

import { NextRequest, NextResponse } from 'next/server';
import { bulkOverwriteGuildCommands } from '@/lib/discord/client';
import { discordEnv } from '@/lib/discord/env';
import { commandDefinitions } from '@/lib/discord/commands/registry';

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: 'admin password not configured' }, { status: 500 });
  }
  if (request.headers.get('x-admin-password') !== adminPassword) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await bulkOverwriteGuildCommands(
      discordEnv.appId,
      discordEnv.guildId,
      commandDefinitions,
    );
    return NextResponse.json({ ok: true, count: Array.isArray(result) ? result.length : 0 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
