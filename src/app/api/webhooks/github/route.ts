// GitHub release webhook → optional cross-post to #shipped.
// Configure on a repo with content type "application/json" and the same
// secret as GITHUB_WEBHOOK_SECRET. Subscribe to the `release` event.

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { discordEnv } from '@/lib/discord/env';
import { onDeployShipped } from '@/lib/discord/flows/on-deploy-shipped';

export async function POST(request: NextRequest) {
  const secret = discordEnv.githubWebhookSecret;
  if (!secret) {
    return NextResponse.json({ error: 'github webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const sigHeader = request.headers.get('x-hub-signature-256') || '';
  const expected = `sha256=${crypto.createHmac('sha256', secret).update(rawBody).digest('hex')}`;

  // timingSafeEqual requires equal-length buffers
  const a = Buffer.from(expected);
  const b = Buffer.from(sigHeader);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  const event = request.headers.get('x-github-event');
  if (event !== 'release') {
    return NextResponse.json({ ignored: true, event });
  }

  type ReleasePayload = {
    action: string;
    release: { name: string; body?: string; html_url: string };
    repository: { name: string };
  };
  let body: ReleasePayload;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  if (body.action !== 'published') {
    return NextResponse.json({ ignored: true, action: body.action });
  }

  await onDeployShipped({
    repoName: body.repository.name,
    releaseName: body.release.name,
    releaseUrl: body.release.html_url,
    body: body.release.body,
  });

  return NextResponse.json({ ok: true });
}
