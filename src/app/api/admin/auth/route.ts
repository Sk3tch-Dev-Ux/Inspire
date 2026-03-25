import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, verifyPassword, setAdminCookie, clearAdminCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = await createAdminToken();
    await setAdminCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await clearAdminCookie();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
