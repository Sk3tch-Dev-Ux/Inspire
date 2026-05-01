// Project close: archive the channel, swap roles, post to #shipped,
// schedule the +7 day referral DM.

import {
  addRoleToMember,
  modifyChannel,
  postMessage,
  removeRoleFromMember,
} from '../client';
import { discordEnv } from '../env';
import { shippedEmbed } from '../embeds';
import {
  archiveProjectChannel,
  countActiveProjectsForUser,
  logFlow,
  scheduleJob,
} from '../db';

export async function closeProject(opts: {
  channelId: string;
  projectName: string;
  clientUserId?: string;
  outcome?: string;
  stack?: string;
}) {
  // Archive the project channel: rename + move to ARCHIVED category + lock.
  const archivedName = `🏁-${opts.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`.slice(0, 95);
  await modifyChannel(
    opts.channelId,
    {
      name: archivedName,
      parent_id: discordEnv.categoryArchived,
      locked: true,
      archived: true,
    },
    `Project closed`,
  );

  await archiveProjectChannel(opts.channelId);

  // Post to #shipped.
  await postMessage(discordEnv.channelShipped, {
    embeds: [
      shippedEmbed({
        projectName: opts.projectName,
        outcome: opts.outcome,
        stack: opts.stack,
      }),
    ],
  });

  // Role swap. Only demote @Active Client if no other active project remains.
  if (opts.clientUserId) {
    // Note: clientUserId here is the website users.id; we need the Discord user ID.
    // Look it up via discord_links.
    const { getDiscordLinkByUserId } = await import('../db');
    const link = await getDiscordLinkByUserId(opts.clientUserId);
    if (link) {
      const remaining = await countActiveProjectsForUser(opts.clientUserId);
      if (remaining === 0) {
        try {
          await removeRoleFromMember(
            discordEnv.guildId,
            link.discord_user_id,
            discordEnv.roleActiveClient,
            'No active projects remain',
          );
        } catch {
          // role may already be missing
        }
        try {
          await addRoleToMember(
            discordEnv.guildId,
            link.discord_user_id,
            discordEnv.roleAlumniClient,
            'Project closed → alumni',
          );
        } catch {
          // role may already exist
        }
      }

      // Schedule the referral DM.
      await scheduleJob({
        jobType: 'referral_dm',
        payload: {
          discordUserId: link.discord_user_id,
          websiteUserId: opts.clientUserId,
        },
        runAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
  }

  await logFlow('project.closed', {
    actorId: discordEnv.founderUserId,
    targetId: opts.channelId,
    payload: { projectName: opts.projectName, outcome: opts.outcome },
    success: true,
  });
}
