// Delayed-job worker. Runs in-process; suitable for the single-replica
// setup. If/when scaling, move to a host-level cron that calls a worker
// script, or use SKIP LOCKED with a separate process.

import {
  claimDueJobs,
  createReferralCode,
  getActiveReferralCode,
  markJobComplete,
  pruneInteractionReplay,
} from './db';
import { sendDirectMessage } from './client';
import { referralDmEmbed } from './embeds';
import { discordEnv } from './env';
import crypto from 'crypto';

let started = false;

export function startDelayedJobsWorker() {
  if (started) return;
  if (!discordEnv.enabled) return;
  started = true;

  const tick = async () => {
    try {
      await pruneInteractionReplay();
      const jobs = await claimDueJobs();
      for (const job of jobs) {
        try {
          await runJob(job.job_type, job.payload);
          await markJobComplete(job.id);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          await markJobComplete(job.id, msg);
        }
      }
    } catch (err) {
      console.error('Delayed jobs tick failed:', err);
    }
  };

  // Run once at startup, then on the configured interval.
  void tick();
  setInterval(() => {
    void tick();
  }, discordEnv.delayedJobIntervalMs);
}

async function runJob(jobType: string, payload: unknown): Promise<void> {
  switch (jobType) {
    case 'referral_dm':
      return runReferralDm(payload as { discordUserId: string; websiteUserId: string });
    default:
      throw new Error(`Unknown job type: ${jobType}`);
  }
}

async function runReferralDm(payload: { discordUserId: string; websiteUserId: string }) {
  let active = await getActiveReferralCode(payload.websiteUserId);
  if (!active) {
    const code = `INSPIRE-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    await createReferralCode(payload.websiteUserId, code, expires);
    active = { code, expires_at: expires };
  }
  await sendDirectMessage(payload.discordUserId, {
    embeds: [referralDmEmbed({ code: active.code, expiresAt: new Date(active.expires_at) })],
  });
}
