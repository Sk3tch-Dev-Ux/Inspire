import type { Interaction } from '../types';
import { InteractionResponseFlags, InteractionResponseType } from '../types';
import { closeProject } from '../flows/on-project-closed';
import { getProjectChannelByDiscordId } from '../db';
import { getOption, type CommandResponse } from './index';
import { patchOriginalInteraction } from '../client';

export async function handleProjectClose(interaction: Interaction): Promise<CommandResponse> {
  const sub = interaction.data?.options?.[0];
  if (sub?.name !== 'close') {
    return ephemeral('Unknown subcommand.');
  }

  const channelId = interaction.channel_id;
  if (!channelId) return ephemeral('Run this in the project channel you want to close.');

  const project = await getProjectChannelByDiscordId(channelId);
  if (!project) {
    return ephemeral('This channel isn\'t a tracked project channel.');
  }
  if (project.status === 'archived') {
    return ephemeral('Already archived.');
  }

  const outcome = getOption(sub.options, 'outcome') ? String(getOption(sub.options, 'outcome')) : undefined;
  const stack = getOption(sub.options, 'stack') ? String(getOption(sub.options, 'stack')) : undefined;

  // Defer; the close flow does multiple Discord API calls.
  void (async () => {
    try {
      await closeProject({
        channelId,
        projectName: project.project_name,
        clientUserId: project.client_user_id ?? undefined,
        outcome,
        stack,
      });
      await patchOriginalInteraction(interaction.application_id, interaction.token, {
        content: '✅ Project closed, archived, and posted to #shipped. Referral DM scheduled in 7 days.',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await patchOriginalInteraction(interaction.application_id, interaction.token, {
        content: `Failed: ${msg}`,
      });
    }
  })();

  return {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    data: { flags: InteractionResponseFlags.EPHEMERAL },
  };
}

function ephemeral(content: string): CommandResponse {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: { content, flags: InteractionResponseFlags.EPHEMERAL },
  };
}
