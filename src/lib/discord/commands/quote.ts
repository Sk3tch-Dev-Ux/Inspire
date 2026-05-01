import type { Interaction } from '../types';
import { InteractionResponseFlags, InteractionResponseType } from '../types';
import {
  patchOriginalInteraction,
  postMessage,
  startForumThread,
} from '../client';
import { discordEnv } from '../env';
import { quoteSummaryEmbed, quoteThreadStarter } from '../embeds';
import { createQuoteTicket, logFlow, upsertDiscordLink } from '../db';
import { getOption, type CommandResponse } from './index';

export async function handleQuote(interaction: Interaction): Promise<CommandResponse> {
  const opts = interaction.data?.options;
  const platform = String(getOption(opts, 'platform') ?? 'other');
  const budget = getOption(opts, 'budget') ? String(getOption(opts, 'budget')) : undefined;
  const scope = getOption(opts, 'scope') ? String(getOption(opts, 'scope')) : undefined;
  const deadline = getOption(opts, 'deadline') ? String(getOption(opts, 'deadline')) : undefined;

  const user = interaction.member?.user ?? interaction.user;
  if (!user) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: 'Could not identify you. Try again.', flags: InteractionResponseFlags.EPHEMERAL },
    };
  }
  const handle = user.global_name || user.username;

  // Defer — forum-create + DB calls take >3s sometimes.
  void runQuoteFlow({
    interactionToken: interaction.token,
    applicationId: interaction.application_id,
    discordUserId: user.id,
    handle,
    platform,
    budget,
    scope,
    deadline,
  });

  return {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    data: { flags: InteractionResponseFlags.EPHEMERAL },
  };
}

async function runQuoteFlow(args: {
  interactionToken: string;
  applicationId: string;
  discordUserId: string;
  handle: string;
  platform: string;
  budget?: string;
  scope?: string;
  deadline?: string;
}) {
  try {
    await upsertDiscordLink({
      discordUserId: args.discordUserId,
      discordHandle: args.handle,
      linkedVia: 'quote_form',
    });

    const threadName = `${args.handle.slice(0, 30)} · ${args.platform}`.slice(0, 95);
    const thread = (await startForumThread(discordEnv.forumQuotes, {
      name: threadName,
      message: {
        embeds: [
          quoteThreadStarter({
            discordUserId: args.discordUserId,
            platform: args.platform,
            scope: args.scope,
            budgetBand: args.budget,
            deadline: args.deadline,
          }),
        ],
      },
      auto_archive_duration: 1440,
    })) as { id: string };

    await createQuoteTicket({
      discordUserId: args.discordUserId,
      forumThreadId: thread.id,
      platform: args.platform,
      scopeSummary: args.scope,
      budgetBand: args.budget,
      deadline: args.deadline,
    });

    await postMessage(discordEnv.channelLeads, {
      embeds: [
        quoteSummaryEmbed({
          discordHandle: args.handle,
          discordUserId: args.discordUserId,
          platform: args.platform,
          scope: args.scope,
          budgetBand: args.budget,
          deadline: args.deadline,
          threadId: thread.id,
          guildId: discordEnv.guildId,
        }),
      ],
    });

    await patchOriginalInteraction(args.applicationId, args.interactionToken, {
      content: `Got it — opened your ticket: <#${thread.id}>. I'll reply within 24h.`,
    });

    await logFlow('quote.opened', {
      actorId: args.discordUserId,
      targetId: thread.id,
      payload: { platform: args.platform, budget: args.budget },
      success: true,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logFlow('quote.opened', {
      actorId: args.discordUserId,
      success: false,
      errorMessage: msg,
    });
    try {
      await patchOriginalInteraction(args.applicationId, args.interactionToken, {
        content: `Couldn't open the ticket — DM <@${discordEnv.founderUserId}> directly. (error logged)`,
      });
    } catch {
      // swallow — we already logged the original failure
    }
  }
}
