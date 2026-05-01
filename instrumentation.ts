// Next.js instrumentation hook — runs once per server process.
// We use it to start the in-process delayed-jobs worker for the
// Discord bot (referral DMs, cleanup, etc.).
//
// Only fires when DISCORD_BOT_ENABLED=true; otherwise no-op.

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const { startDelayedJobsWorker } = await import('@/lib/discord/jobs');
  startDelayedJobsWorker();
}
