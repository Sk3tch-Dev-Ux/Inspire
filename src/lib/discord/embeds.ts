// Discord embed builders. Single file because each is small.

import { BrandColors, type Embed } from './types';

export function quoteSummaryEmbed(opts: {
  discordHandle: string;
  discordUserId: string;
  platform?: string;
  scope?: string;
  budgetBand?: string;
  deadline?: string;
  threadId: string;
  guildId: string;
}): Embed {
  return {
    title: 'New quote ticket',
    color: BrandColors.flame,
    description: `<@${opts.discordUserId}> opened a ticket. [Open thread](https://discord.com/channels/${opts.guildId}/${opts.threadId})`,
    fields: [
      { name: 'Platform', value: opts.platform || '—', inline: true },
      { name: 'Budget band', value: opts.budgetBand || '—', inline: true },
      { name: 'Deadline', value: opts.deadline || '—', inline: true },
      { name: 'Scope', value: (opts.scope || '—').slice(0, 1024) },
    ],
    footer: { text: `from ${opts.discordHandle}` },
    timestamp: new Date().toISOString(),
  };
}

export function quoteThreadStarter(opts: {
  discordUserId: string;
  platform?: string;
  scope?: string;
  budgetBand?: string;
  deadline?: string;
}): Embed {
  return {
    title: 'Thanks — let\'s scope this out',
    color: BrandColors.flame,
    description: `Hey <@${opts.discordUserId}> 👋 I'll reply within 24h. In the meantime, anything you can add (links, references, screenshots) here will help me quote faster.`,
    fields: [
      { name: 'Platform', value: opts.platform || 'unspecified', inline: true },
      { name: 'Budget', value: opts.budgetBand || 'unspecified', inline: true },
      { name: 'Deadline', value: opts.deadline || 'flexible', inline: true },
      { name: 'Scope so far', value: (opts.scope || '*will fill in via chat*').slice(0, 1024) },
    ],
    footer: { text: 'inspire⚡ Development' },
  };
}

export function activeProjectsEmbed(opts: {
  projectName: string;
  clientHandle: string;
  channelId: string;
  guildId: string;
}): Embed {
  return {
    title: '🚧 New project kicking off',
    color: BrandColors.flame,
    description: `**${opts.projectName}** — ${opts.clientHandle}\nProject room: <#${opts.channelId}>`,
    timestamp: new Date().toISOString(),
  };
}

export function shippedEmbed(opts: {
  projectName: string;
  clientHandle?: string;
  stack?: string;
  outcome?: string;
}): Embed {
  return {
    title: `🏁 Shipped: ${opts.projectName}`,
    color: BrandColors.flameGlow,
    description: opts.outcome || 'Another one out the door.',
    fields: [
      ...(opts.clientHandle ? [{ name: 'Client', value: opts.clientHandle, inline: true }] : []),
      ...(opts.stack ? [{ name: 'Stack', value: opts.stack, inline: true }] : []),
    ],
    footer: { text: 'inspire⚡ Development · /shipped' },
    timestamp: new Date().toISOString(),
  };
}

export function onboardingDmEmbed(opts: { projectName: string; channelId: string }): Embed {
  return {
    title: `Welcome aboard — ${opts.projectName}`,
    color: BrandColors.flame,
    description:
      `Your private project room is open: <#${opts.channelId}>\n\n` +
      `**What I'll need from you to start:**\n` +
      `• Any existing repo/server I'll be working in (read access)\n` +
      `• Reference material — screenshots, similar bots, the bug/feature in your own words\n` +
      `• Your timezone & best window for quick async checkins\n\n` +
      `I'll post a kickoff plan in the channel within 24h. If something blocks me, I'll say so loudly there — never quiet on my end.`,
    footer: { text: 'inspire⚡ Development' },
  };
}

export function availabilityEmbed(opts: {
  slots: Array<{ week_starting: string; open_slot_count: number; note: string | null }>;
}): Embed {
  const lines: string[] = [];
  if (opts.slots.length === 0) {
    lines.push('*No availability data yet — run `/availability set` to populate.*');
  } else {
    for (const s of opts.slots) {
      const slotWord = s.open_slot_count === 1 ? 'slot' : 'slots';
      const status = s.open_slot_count === 0 ? '**full**' : `${s.open_slot_count} ${slotWord}`;
      const note = s.note ? ` · ${s.note}` : '';
      lines.push(`▸ Week of ${s.week_starting} — ${status}${note}`);
    }
  }
  const nextOpen = opts.slots.find((s) => s.open_slot_count > 0);
  return {
    title: '📅 Availability',
    color: BrandColors.flame,
    description: lines.join('\n'),
    fields: [
      {
        name: 'Next available start',
        value: nextOpen ? nextOpen.week_starting : 'Booked solid — quote anyway and we\'ll find a slot.',
      },
      {
        name: 'Want a slot?',
        value: 'Run `/quote` or post in <#__QUOTE_CHANNEL__>',
      },
    ],
    footer: { text: 'updated automatically' },
    timestamp: new Date().toISOString(),
  };
}

export function referralDmEmbed(opts: { code: string; expiresAt: Date }): Embed {
  return {
    title: '🎁 Your referral code',
    color: BrandColors.ember,
    description:
      `Thanks for working with me. Here's your personal referral code:\n\n` +
      `**\`${opts.code}\`**\n\n` +
      `Anyone who uses it gets **10% off** their first project — and you get credit toward your next maintenance retainer when they pay.\n\n` +
      `Expires ${opts.expiresAt.toISOString().slice(0, 10)}.`,
    footer: { text: 'inspire⚡ Development' },
  };
}
