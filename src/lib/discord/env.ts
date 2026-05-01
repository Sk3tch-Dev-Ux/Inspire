// Type-safe access to Discord-related environment variables.
// Throws on missing required vars at first read so failures are loud and early.

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const discordEnv = {
  get appId() { return required('DISCORD_APP_ID'); },
  get publicKey() { return required('DISCORD_PUBLIC_KEY'); },
  get botToken() { return required('DISCORD_BOT_TOKEN'); },
  get guildId() { return required('DISCORD_GUILD_ID'); },
  get founderUserId() { return required('DISCORD_FOUNDER_USER_ID'); },

  // Roles
  get roleActiveClient() { return required('DISCORD_ROLE_ACTIVE_CLIENT'); },
  get roleAlumniClient() { return required('DISCORD_ROLE_ALUMNI_CLIENT'); },
  get rolePatron() { return optional('DISCORD_ROLE_PATRON'); },
  get roleTrustedBuilder() { return optional('DISCORD_ROLE_TRUSTED_BUILDER'); },

  // Channels & categories
  get categoryProjects() { return required('DISCORD_CATEGORY_PROJECTS'); },
  get categoryArchived() { return required('DISCORD_CATEGORY_ARCHIVED'); },
  get channelActiveProjects() { return required('DISCORD_CHANNEL_ACTIVE_PROJECTS'); },
  get channelShipped() { return required('DISCORD_CHANNEL_SHIPPED'); },
  get channelLeads() { return required('DISCORD_CHANNEL_LEADS'); },
  get channelAvailability() { return required('DISCORD_CHANNEL_AVAILABILITY'); },
  get availabilityMessageId() { return optional('DISCORD_AVAILABILITY_MESSAGE_ID'); },
  get forumQuotes() { return required('DISCORD_FORUM_QUOTES'); },

  // Webhooks
  get githubWebhookSecret() { return optional('GITHUB_WEBHOOK_SECRET'); },

  // Cron
  get delayedJobIntervalMs() {
    return parseInt(process.env.DELAYED_JOB_POLL_INTERVAL_MS || '60000', 10);
  },

  // Feature flag
  get enabled() { return process.env.DISCORD_BOT_ENABLED === 'true'; },
};
