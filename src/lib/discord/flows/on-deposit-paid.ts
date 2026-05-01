// Stripe → active client provisioning.
// Called from /api/webhooks/stripe when a checkout.session.completed event
// fires for an order that has a Discord user attached.

import {
  addRoleToMember,
  createGuildChannel,
  postMessage,
  sendDirectMessage,
} from '../client';
import { discordEnv } from '../env';
import { ChannelType } from '../types';
import { activeProjectsEmbed, onboardingDmEmbed } from '../embeds';
import {
  createProjectChannel,
  getDiscordLinkByDiscordUserId,
  logFlow,
} from '../db';

export async function onDepositPaid(opts: {
  orderId: string;
  discordUserId: string;
  projectName: string;
  clientHandle?: string;
}) {
  if (!discordEnv.enabled) return;

  try {
    // Promote to @Active Client.
    await addRoleToMember(
      discordEnv.guildId,
      opts.discordUserId,
      discordEnv.roleActiveClient,
      `Deposit paid for order ${opts.orderId}`,
    );

    // Spawn private project channel under PROJECTS category.
    const channelName = `🚧-${slugify(opts.projectName).slice(0, 60)}`;
    const channel = (await createGuildChannel(
      discordEnv.guildId,
      {
        name: channelName,
        type: ChannelType.GUILD_TEXT,
        parent_id: discordEnv.categoryProjects,
        topic: `${opts.projectName} · order ${opts.orderId}`,
        permission_overwrites: [
          {
            id: discordEnv.guildId, // @everyone
            type: 0,
            allow: '0',
            deny: '1024', // VIEW_CHANNEL
          },
          {
            id: opts.discordUserId,
            type: 1,
            allow: '1024',
            deny: '0',
          },
          {
            id: discordEnv.founderUserId,
            type: 1,
            allow: '1024',
            deny: '0',
          },
        ],
      },
      `Project kickoff for order ${opts.orderId}`,
    )) as { id: string };

    await createProjectChannel({
      orderId: opts.orderId,
      channelId: channel.id,
      projectName: opts.projectName,
    });

    // Cross-post to #active-projects.
    await postMessage(discordEnv.channelActiveProjects, {
      embeds: [
        activeProjectsEmbed({
          projectName: opts.projectName,
          clientHandle: opts.clientHandle || `<@${opts.discordUserId}>`,
          channelId: channel.id,
          guildId: discordEnv.guildId,
        }),
      ],
    });

    // DM the client onboarding info.
    try {
      await sendDirectMessage(opts.discordUserId, {
        embeds: [onboardingDmEmbed({ projectName: opts.projectName, channelId: channel.id })],
      });
    } catch {
      // User may have DMs from non-friends disabled — not fatal.
    }

    await logFlow('deposit.paid.provisioned', {
      actorId: 'stripe',
      targetId: opts.orderId,
      payload: { discordUserId: opts.discordUserId, channelId: channel.id },
      success: true,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logFlow('deposit.paid.provisioned', {
      actorId: 'stripe',
      targetId: opts.orderId,
      payload: { discordUserId: opts.discordUserId },
      success: false,
      errorMessage: msg,
    });
    throw err;
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper for the Stripe webhook to look up the discord_user_id
// from order metadata or a discord_links row.
export async function resolveDiscordUserId(opts: {
  orderId: string;
  metadataDiscordUserId?: string;
  websiteUserId?: string;
}): Promise<string | null> {
  if (opts.metadataDiscordUserId) return opts.metadataDiscordUserId;
  if (opts.websiteUserId) {
    const { getDiscordLinkByUserId } = await import('../db');
    const link = await getDiscordLinkByUserId(opts.websiteUserId);
    if (link) return link.discord_user_id;
  }
  return null;
}
