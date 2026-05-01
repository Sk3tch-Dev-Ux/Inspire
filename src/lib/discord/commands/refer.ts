import type { Interaction } from '../types';
import { InteractionResponseFlags, InteractionResponseType } from '../types';
import { referralDmEmbed } from '../embeds';
import {
  createReferralCode,
  getActiveReferralCode,
  getDiscordLinkByDiscordUserId,
} from '../db';
import { sendDirectMessage } from '../client';
import type { CommandResponse } from './index';
import crypto from 'crypto';

export async function handleRefer(interaction: Interaction): Promise<CommandResponse> {
  const user = interaction.member?.user ?? interaction.user;
  if (!user) return ephemeral('Could not identify you.');

  const link = await getDiscordLinkByDiscordUserId(user.id);
  if (!link?.user_id) {
    return ephemeral(
      'No order on file for your account yet. Once your first project is shipped you\'ll get a referral code automatically.',
    );
  }

  let active = await getActiveReferralCode(link.user_id);
  if (!active) {
    const code = `INSPIRE-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    await createReferralCode(link.user_id, code, expires);
    active = { code, expires_at: expires };
  }

  await sendDirectMessage(user.id, {
    embeds: [referralDmEmbed({ code: active.code, expiresAt: new Date(active.expires_at) })],
  });

  return ephemeral('📬 Sent your code via DM.');
}

function ephemeral(content: string): CommandResponse {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content, flags: InteractionResponseFlags.EPHEMERAL },
  };
}
