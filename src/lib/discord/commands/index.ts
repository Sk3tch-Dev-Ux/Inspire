// Command dispatcher. The interactions route hands a command-type
// interaction here; we route by name and return a (possibly deferred)
// response payload.

import type { Interaction, InteractionOption } from '../types';
import { InteractionResponseFlags, InteractionResponseType } from '../types';
import { discordEnv } from '../env';
import { handleQuote } from './quote';
import { handleAvailability } from './availability';
import { handleProjectClose } from './project-close';
import { handleRefer } from './refer';

export type CommandResponse = {
  type: number;
  data?: { content?: string; embeds?: unknown[]; flags?: number };
};

function ephemeral(content: string): CommandResponse {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content, flags: InteractionResponseFlags.EPHEMERAL },
  };
}

export function getOption(
  options: InteractionOption[] | undefined,
  name: string,
): string | number | boolean | undefined {
  return options?.find((o) => o.name === name)?.value;
}

function isFounder(interaction: Interaction): boolean {
  const userId = interaction.member?.user.id ?? interaction.user?.id;
  return userId === discordEnv.founderUserId;
}

export async function dispatchCommand(interaction: Interaction): Promise<CommandResponse> {
  const name = interaction.data?.name;
  if (!name) return ephemeral('No command name in interaction.');

  switch (name) {
    case 'ping':
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '🏓 pong — bot is alive.',
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      };

    case 'quote':
      return await handleQuote(interaction);

    case 'availability':
      if (!isFounder(interaction)) return ephemeral('Admin only.');
      return await handleAvailability(interaction);

    case 'project':
      if (!isFounder(interaction)) return ephemeral('Admin only.');
      return await handleProjectClose(interaction);

    case 'refer':
      return await handleRefer(interaction);

    default:
      return ephemeral(`Unknown command: ${name}`);
  }
}
