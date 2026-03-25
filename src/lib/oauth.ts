import { cookies } from 'next/headers';

const STATE_COOKIE = 'oauth_state';
const STATE_EXPIRY = 600; // 10 minutes

export interface OAuthProfile {
  provider: 'google' | 'discord';
  providerId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  rawData: Record<string, unknown>;
}

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

// --- CSRF State ---

export async function generateState(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const state = Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');

  const cookieStore = await cookies();
  cookieStore.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: STATE_EXPIRY,
    path: '/',
  });

  return state;
}

export async function validateState(state: string): Promise<boolean> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);
  return !!stored && stored === state;
}

// --- Google OAuth ---

export async function getGoogleAuthUrl(): Promise<string> {
  const state = await generateState();
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: `${getAppUrl()}/api/auth/callback/google`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'consent',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeGoogleCode(code: string): Promise<OAuthProfile> {
  // Exchange code for tokens
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: `${getAppUrl()}/api/auth/callback/google`,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`Google token exchange failed: ${tokenRes.status}`);
  }

  const tokens = await tokenRes.json();

  // Fetch user profile
  const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!profileRes.ok) {
    throw new Error(`Google profile fetch failed: ${profileRes.status}`);
  }

  const profile = await profileRes.json();

  return {
    provider: 'google',
    providerId: profile.id,
    email: profile.email,
    name: profile.name || profile.email,
    avatarUrl: profile.picture || null,
    rawData: profile,
  };
}

// --- Discord OAuth ---

export async function getDiscordAuthUrl(): Promise<string> {
  const state = await generateState();
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID || '',
    redirect_uri: `${getAppUrl()}/api/auth/callback/discord`,
    response_type: 'code',
    scope: 'identify email',
    state,
  });
  return `https://discord.com/api/oauth2/authorize?${params}`;
}

export async function exchangeDiscordCode(code: string): Promise<OAuthProfile> {
  // Exchange code for tokens
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.DISCORD_CLIENT_ID || '',
      client_secret: process.env.DISCORD_CLIENT_SECRET || '',
      redirect_uri: `${getAppUrl()}/api/auth/callback/discord`,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`Discord token exchange failed: ${tokenRes.status}`);
  }

  const tokens = await tokenRes.json();

  // Fetch user profile
  const profileRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!profileRes.ok) {
    throw new Error(`Discord profile fetch failed: ${profileRes.status}`);
  }

  const profile = await profileRes.json();

  const avatarUrl = profile.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
    : null;

  return {
    provider: 'discord',
    providerId: profile.id,
    email: profile.email,
    name: profile.global_name || profile.username || profile.email,
    avatarUrl,
    rawData: profile,
  };
}
