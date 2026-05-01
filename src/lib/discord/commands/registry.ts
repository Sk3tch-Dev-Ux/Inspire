// Single source of truth for slash commands.
// Used both at registration time (scripts/discord-register-commands.ts)
// and at dispatch time (interactions endpoint).

import { ApplicationCommandOptionType } from '../types';

export const commandDefinitions = [
  {
    name: 'ping',
    description: 'Health check — replies with pong.',
  },
  {
    name: 'quote',
    description: 'Start a project quote — opens a private ticket.',
    options: [
      {
        name: 'platform',
        description: 'What you want built',
        type: ApplicationCommandOptionType.STRING,
        required: true,
        choices: [
          { name: 'Discord bot', value: 'discord-bot' },
          { name: 'Rust mod', value: 'rust' },
          { name: 'DayZ mod', value: 'dayz' },
          { name: 'FiveM resource', value: 'fivem' },
          { name: 'Web / marketing site', value: 'web' },
          { name: 'Something else', value: 'other' },
        ],
      },
      {
        name: 'budget',
        description: 'Rough budget band',
        type: ApplicationCommandOptionType.STRING,
        required: false,
        choices: [
          { name: 'Under $1k', value: '<1k' },
          { name: '$1k–$3k', value: '1-3k' },
          { name: '$3k–$10k', value: '3-10k' },
          { name: '$10k+', value: '10k+' },
          { name: 'Not sure yet', value: 'unsure' },
        ],
      },
      {
        name: 'scope',
        description: 'One-line summary of what you want',
        type: ApplicationCommandOptionType.STRING,
        required: false,
      },
      {
        name: 'deadline',
        description: 'Any hard deadline?',
        type: ApplicationCommandOptionType.STRING,
        required: false,
      },
    ],
  },
  {
    name: 'availability',
    description: 'Manage the public availability embed (admin only).',
    default_member_permissions: '0', // Admin-only by default; we also gate in code.
    options: [
      {
        name: 'set-slot',
        type: ApplicationCommandOptionType.SUB_COMMAND,
        description: 'Add or update a week of availability',
        options: [
          {
            name: 'week',
            description: 'Week starting (YYYY-MM-DD)',
            type: ApplicationCommandOptionType.STRING,
            required: true,
          },
          {
            name: 'slots',
            description: 'Open slots that week',
            type: ApplicationCommandOptionType.INTEGER,
            required: true,
          },
          {
            name: 'note',
            description: 'Optional qualifier (e.g. "small jobs only")',
            type: ApplicationCommandOptionType.STRING,
            required: false,
          },
        ],
      },
      {
        name: 'refresh',
        type: ApplicationCommandOptionType.SUB_COMMAND,
        description: 'Re-render the pinned embed without changing data',
      },
    ],
  },
  {
    name: 'project',
    description: 'Project lifecycle commands (admin only).',
    default_member_permissions: '0',
    options: [
      {
        name: 'close',
        type: ApplicationCommandOptionType.SUB_COMMAND,
        description: 'Close the current project channel and post to #shipped',
        options: [
          {
            name: 'outcome',
            description: 'Short outcome blurb for #shipped',
            type: ApplicationCommandOptionType.STRING,
            required: false,
          },
          {
            name: 'stack',
            description: 'Tech stack used (e.g. "discord.js, Postgres")',
            type: ApplicationCommandOptionType.STRING,
            required: false,
          },
        ],
      },
    ],
  },
  {
    name: 'refer',
    description: 'Get your personal referral code.',
  },
];
