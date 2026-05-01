// CLI: register all bot slash commands with Discord for the configured guild.
// Bulk-overwrite — replaces existing command set with exactly what registry.ts says.
//
// Run:
//   docker exec inspire-web npx tsx scripts/discord-register-commands.ts
//
// Requires env: DISCORD_APP_ID, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID.

import { bulkOverwriteGuildCommands } from '@/lib/discord/client';
import { discordEnv } from '@/lib/discord/env';
import { commandDefinitions } from '@/lib/discord/commands/registry';

async function main() {
  console.log(`Registering ${commandDefinitions.length} commands to guild ${discordEnv.guildId}...`);
  const result = await bulkOverwriteGuildCommands(
    discordEnv.appId,
    discordEnv.guildId,
    commandDefinitions,
  );
  const count = Array.isArray(result) ? result.length : 0;
  console.log(`✅ Registered ${count} commands.`);
}

main().catch((err) => {
  console.error('❌ Registration failed:', err);
  process.exit(1);
});
