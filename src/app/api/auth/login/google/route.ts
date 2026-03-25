import { NextResponse } from 'next/server';
import { getGoogleAuthUrl } from '@/lib/oauth';

export async function GET() {
  try {
    const url = await getGoogleAuthUrl();
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }
}
