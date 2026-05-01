import type { Interaction } from '../types';
import { InteractionResponseFlags, InteractionResponseType } from '../types';
import { editMessage, postMessage } from '../client';
import { discordEnv } from '../env';
import { availabilityEmbed } from '../embeds';
import {
  listUpcomingAvailability,
  upsertAvailabilitySlot,
  logFlow,
} from '../db';
import { getOption, type CommandResponse } from './index';

export async function handleAvailability(interaction: Interaction): Promise<CommandResponse> {
  const sub = interaction.data?.options?.[0];
  const subName = sub?.name ?? 'refresh';

  if (subName === 'set-slot') {
    const week = String(getOption(sub?.options, 'week') ?? '');
    const slots = Number(getOption(sub?.options, 'slots') ?? 0);
    const note = getOption(sub?.options, 'note') ? String(getOption(sub?.options, 'note')) : undefined;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(week)) {
      return ephemeral('Week must be YYYY-MM-DD.');
    }
    await upsertAvailabilitySlot({ weekStarting: week, openSlotCount: slots, note });
  }

  // Both subcommands re-render the pinned embed.
  const slots = await listUpcomingAvailability();
  const embed = availabilityEmbed({ slots });

  const actorId = interaction.member?.user.id ?? interaction.user?.id ?? null;

  try {
    if (discordEnv.availabilityMessageId) {
      await editMessage(discordEnv.channelAvailability, discordEnv.availabilityMessageId, {
        embeds: [embed],
      });
    } else {
      // First run — post the message; founder can pin it manually and set the env var.
      await postMessage(discordEnv.channelAvailability, { embeds: [embed] });
    }
    await logFlow('availability.updated', {
      actorId,
      success: true,
      payload: { sub: subName },
    });
    return ephemeral(
      discordEnv.availabilityMessageId
        ? '✅ Updated the pinned availability embed.'
        : '✅ Posted the availability embed. Pin it and set DISCORD_AVAILABILITY_MESSAGE_ID.',
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logFlow('availability.updated', { actorId, success: false, errorMessage: msg });
    return ephemeral(`Failed: ${msg}`);
  }
}

function ephemeral(content: string): CommandResponse {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content, flags: InteractionResponseFlags.EPHEMERAL },
  };
}
