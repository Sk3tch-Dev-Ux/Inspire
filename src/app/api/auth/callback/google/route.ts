import { NextRequest, NextResponse } from 'next/server';
import { validateState, exchangeGoogleCode } from '@/lib/oauth';
import { createUserToken, setUserCookie } from '@/lib/user-auth';
import { query } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error || !code || !state) {
    return NextResponse.redirect(new URL('/login?error=google_denied', APP_URL));
  }

  // Validate CSRF state
  const validState = await validateState(state);
  if (!validState) {
    return NextResponse.redirect(new URL('/login?error=invalid_state', APP_URL));
  }

  try {
    // Exchange code for profile
    const profile = await exchangeGoogleCode(code);

    // Upsert user
    const result = await query<{ id: string; created_at: string }>(
      `INSERT INTO users (email, name, avatar_url, provider, provider_id, provider_data)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (provider, provider_id) DO UPDATE SET
         name = EXCLUDED.name,
         avatar_url = EXCLUDED.avatar_url,
         provider_data = EXCLUDED.provider_data,
         updated_at = NOW()
       RETURNING id, created_at`,
      [profile.email, profile.name, profile.avatarUrl, profile.provider, profile.providerId, JSON.stringify(profile.rawData)]
    );

    const user = result[0];

    // Link existing orders by email
    await query(
      'UPDATE orders SET user_id = $1 WHERE email = $2 AND user_id IS NULL',
      [user.id, profile.email]
    );

    // Send welcome email on first signup (created within last 5 seconds)
    const isNewUser = (Date.now() - new Date(user.created_at).getTime()) < 5000;
    if (isNewUser) {
      sendWelcomeEmail({ name: profile.name, email: profile.email }).catch(() => {});
    }

    // Create JWT and set cookie
    const token = await createUserToken(user.id, profile.email);
    await setUserCookie(token);

    return NextResponse.redirect(new URL('/account', APP_URL));
  } catch (err) {
    console.error('Google OAuth callback error:', err);
    return NextResponse.redirect(new URL('/login?error=google_callback_failed', APP_URL));
  }
}
