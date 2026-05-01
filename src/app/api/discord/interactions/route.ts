import { NextRequest, NextResponse } from 'next/server';
import { discordEnv } from '@/lib/discord/env';
import { verifyDiscordSignature } from '@/lib/discord/signing';
import {
  InteractionResponseType,
  InteractionType,
  type Interaction,
} from '@/lib/discord/types';
import { dispatchCommand } from '@/lib/discord/commands';
import { recordInteraction } from '@/lib/discord/db';

// Discord interactions endpoint. MUST verify the Ed25519 signature on every
// request before parsing the body — Discord probes this at registration
// time and during normal use.
export async function POST(request: NextRequest) {
  if (!discordEnv.enabled) {
    return NextResponse.json({ error: 'Bot disabled' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');

  const ok = verifyDiscordSignature(rawBody, signature, timestamp, discordEnv.publicKey);
  if (!ok) {
    return new NextResponse('invalid request signature', { status: 401 });
  }

  let interaction: Interaction;
  try {
    interaction = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  // PING: respond before doing anything else. Required for endpoint registration.
  if (interaction.type === InteractionType.PING) {
    return NextResponse.json({ type: InteractionResponseType.PONG });
  }

  // Replay protection — Discord sometimes retries after >3s timeouts.
  const fresh = await recordInteraction(interaction.id);
  if (!fresh) {
    // Already handled this id; ack gracefully.
    return NextResponse.json({
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
      data: { flags: 64 },
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const response = await dispatchCommand(interaction);
    return NextResponse.json(response);
  }

  // Unknown interaction type.
  return NextResponse.json({ error: 'unsupported interaction type' }, { status: 400 });
}
