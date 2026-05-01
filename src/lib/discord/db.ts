// Discord-related DB helpers. Kept in one file for now; split into
// per-table modules later if any of these grows beyond a screenful.

import { query } from '@/lib/db';

// ─── flow_log ────────────────────────────────────────────────────

export async function logFlow(
  flowName: string,
  opts: {
    actorId?: string | null;
    targetId?: string | null;
    payload?: unknown;
    success: boolean;
    errorMessage?: string | null;
  },
) {
  await query(
    `INSERT INTO flow_log (flow_name, actor_id, target_id, payload, success, error_message)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      flowName,
      opts.actorId ?? null,
      opts.targetId ?? null,
      opts.payload ? JSON.stringify(opts.payload) : null,
      opts.success,
      opts.errorMessage ?? null,
    ],
  );
}

// ─── interaction_replay ──────────────────────────────────────────

export async function recordInteraction(interactionId: string): Promise<boolean> {
  // Returns true if this is the first time we've seen this id.
  // Postgres ON CONFLICT lets us treat insert+check as one round-trip.
  const rows = await query<{ inserted: boolean }>(
    `INSERT INTO interaction_replay (interaction_id)
     VALUES ($1)
     ON CONFLICT (interaction_id) DO NOTHING
     RETURNING TRUE AS inserted`,
    [interactionId],
  );
  return rows.length > 0;
}

export async function pruneInteractionReplay() {
  await query(`DELETE FROM interaction_replay WHERE seen_at < NOW() - INTERVAL '5 minutes'`);
}

// ─── discord_links ───────────────────────────────────────────────

export type DiscordLink = {
  id: string;
  user_id: string | null;
  discord_user_id: string;
  discord_handle: string;
  linked_via: string;
};

export async function upsertDiscordLink(opts: {
  discordUserId: string;
  discordHandle: string;
  userId?: string | null;
  linkedVia: 'quote_form' | 'stripe_checkout' | 'manual';
}): Promise<DiscordLink> {
  const rows = await query<DiscordLink>(
    `INSERT INTO discord_links (discord_user_id, discord_handle, user_id, linked_via)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (discord_user_id) DO UPDATE
       SET discord_handle = EXCLUDED.discord_handle,
           user_id = COALESCE(discord_links.user_id, EXCLUDED.user_id)
     RETURNING *`,
    [opts.discordUserId, opts.discordHandle, opts.userId ?? null, opts.linkedVia],
  );
  return rows[0];
}

export async function getDiscordLinkByUserId(userId: string): Promise<DiscordLink | null> {
  const rows = await query<DiscordLink>(
    `SELECT * FROM discord_links WHERE user_id = $1 LIMIT 1`,
    [userId],
  );
  return rows[0] ?? null;
}

export async function getDiscordLinkByDiscordUserId(
  discordUserId: string,
): Promise<DiscordLink | null> {
  const rows = await query<DiscordLink>(
    `SELECT * FROM discord_links WHERE discord_user_id = $1 LIMIT 1`,
    [discordUserId],
  );
  return rows[0] ?? null;
}

// ─── quote_tickets ───────────────────────────────────────────────

export async function createQuoteTicket(opts: {
  discordUserId: string;
  forumThreadId: string;
  platform?: string;
  scopeSummary?: string;
  budgetBand?: string;
  deadline?: string;
}) {
  const rows = await query<{ id: string }>(
    `INSERT INTO quote_tickets (discord_user_id, forum_thread_id, platform, scope_summary, budget_band, deadline)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      opts.discordUserId,
      opts.forumThreadId,
      opts.platform ?? null,
      opts.scopeSummary ?? null,
      opts.budgetBand ?? null,
      opts.deadline ?? null,
    ],
  );
  return rows[0];
}

// ─── project_channels ────────────────────────────────────────────

export type ProjectChannel = {
  id: string;
  order_id: string | null;
  discord_channel_id: string;
  client_user_id: string | null;
  project_name: string;
  status: 'active' | 'archived';
  opened_at: Date;
  closed_at: Date | null;
};

export async function createProjectChannel(opts: {
  orderId: string;
  channelId: string;
  clientUserId?: string | null;
  projectName: string;
}) {
  await query(
    `INSERT INTO project_channels (order_id, discord_channel_id, client_user_id, project_name)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (order_id) DO NOTHING`,
    [opts.orderId, opts.channelId, opts.clientUserId ?? null, opts.projectName],
  );
}

export async function getProjectChannelByDiscordId(
  channelId: string,
): Promise<ProjectChannel | null> {
  const rows = await query<ProjectChannel>(
    `SELECT * FROM project_channels WHERE discord_channel_id = $1 LIMIT 1`,
    [channelId],
  );
  return rows[0] ?? null;
}

export async function archiveProjectChannel(channelId: string) {
  await query(
    `UPDATE project_channels
       SET status = 'archived', closed_at = NOW()
     WHERE discord_channel_id = $1`,
    [channelId],
  );
}

export async function countActiveProjectsForUser(userId: string): Promise<number> {
  const rows = await query<{ n: string }>(
    `SELECT COUNT(*)::text AS n FROM project_channels
       WHERE client_user_id = $1 AND status = 'active'`,
    [userId],
  );
  return parseInt(rows[0]?.n ?? '0', 10);
}

// ─── referral_codes ──────────────────────────────────────────────

export async function createReferralCode(referrerUserId: string, code: string, expiresAt: Date) {
  await query(
    `INSERT INTO referral_codes (referrer_user_id, code, expires_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (code) DO NOTHING`,
    [referrerUserId, code, expiresAt],
  );
}

export async function getActiveReferralCode(referrerUserId: string) {
  const rows = await query<{ code: string; expires_at: Date }>(
    `SELECT code, expires_at FROM referral_codes
       WHERE referrer_user_id = $1
         AND redeemed_at IS NULL
         AND (expires_at IS NULL OR expires_at > NOW())
       ORDER BY created_at DESC
       LIMIT 1`,
    [referrerUserId],
  );
  return rows[0] ?? null;
}

// ─── availability_slots ──────────────────────────────────────────

export type AvailabilitySlot = {
  week_starting: string; // ISO date
  open_slot_count: number;
  note: string | null;
};

export async function listUpcomingAvailability(): Promise<AvailabilitySlot[]> {
  return await query<AvailabilitySlot>(
    `SELECT to_char(week_starting, 'YYYY-MM-DD') AS week_starting,
            open_slot_count, note
       FROM availability_slots
      WHERE week_starting >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY week_starting ASC
      LIMIT 8`,
  );
}

export async function upsertAvailabilitySlot(opts: {
  weekStarting: string;
  openSlotCount: number;
  note?: string | null;
}) {
  await query(
    `INSERT INTO availability_slots (week_starting, open_slot_count, note, updated_at)
     VALUES ($1::date, $2, $3, NOW())
     ON CONFLICT (week_starting) DO UPDATE
       SET open_slot_count = EXCLUDED.open_slot_count,
           note = EXCLUDED.note,
           updated_at = NOW()`,
    [opts.weekStarting, opts.openSlotCount, opts.note ?? null],
  );
}

// ─── delayed_jobs ────────────────────────────────────────────────

export async function scheduleJob(opts: {
  jobType: string;
  payload: unknown;
  runAt: Date;
}) {
  await query(
    `INSERT INTO delayed_jobs (job_type, payload, run_at) VALUES ($1, $2, $3)`,
    [opts.jobType, JSON.stringify(opts.payload), opts.runAt],
  );
}

export type DelayedJob = {
  id: string;
  job_type: string;
  payload: unknown;
  run_at: Date;
};

export async function claimDueJobs(limit: number = 25): Promise<DelayedJob[]> {
  // Atomically claim jobs by setting completed_at to a sentinel future then back?
  // Simpler: use SKIP LOCKED + UPDATE in a transaction. We'll do a soft claim.
  const rows = await query<DelayedJob>(
    `UPDATE delayed_jobs
        SET completed_at = NULL  -- no-op, just to grab the row
      WHERE id IN (
        SELECT id FROM delayed_jobs
         WHERE completed_at IS NULL AND run_at <= NOW()
         ORDER BY run_at
         FOR UPDATE SKIP LOCKED
         LIMIT $1
      )
      RETURNING id, job_type, payload, run_at`,
    [limit],
  );
  return rows;
}

export async function markJobComplete(jobId: string, errorMessage?: string) {
  await query(
    `UPDATE delayed_jobs SET completed_at = NOW(), error_message = $2 WHERE id = $1`,
    [jobId, errorMessage ?? null],
  );
}
