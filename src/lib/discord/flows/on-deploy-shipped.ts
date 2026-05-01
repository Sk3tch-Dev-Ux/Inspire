// Optional GitHub deploy hook: when a tagged release lands on a public repo,
// optionally post to #shipped. Useful for open-source experiments and
// public client work.

import { postMessage } from '../client';
import { discordEnv } from '../env';
import { shippedEmbed } from '../embeds';
import { logFlow } from '../db';

export async function onDeployShipped(opts: {
  repoName: string;
  releaseName: string;
  releaseUrl: string;
  body?: string;
}) {
  if (!discordEnv.enabled) return;

  await postMessage(discordEnv.channelShipped, {
    embeds: [
      shippedEmbed({
        projectName: `${opts.repoName} ${opts.releaseName}`,
        outcome: opts.body?.slice(0, 400) || `New release on ${opts.repoName}.`,
      }),
    ],
  });

  await logFlow('deploy.shipped', {
    actorId: 'github',
    targetId: opts.releaseUrl,
    payload: { repo: opts.repoName, release: opts.releaseName },
    success: true,
  });
}
