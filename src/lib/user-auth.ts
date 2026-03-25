import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { query } from './db';

const COOKIE_NAME = 'user_token';
const EXPIRY = '7d';

function getSecret() {
  const secret = process.env.USER_JWT_SECRET;
  if (!secret) throw new Error('USER_JWT_SECRET not set');
  return new TextEncoder().encode(secret);
}

export interface UserTokenPayload {
  sub: string;
  email: string;
  role: 'user';
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  provider: string;
  created_at: string;
}

export async function createUserToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ sub: userId, email, role: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret());
}

export async function verifyUserToken(token: string): Promise<UserTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as UserTokenPayload;
  } catch {
    return null;
  }
}

export async function setUserCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 'lax' needed for OAuth redirects
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export async function clearUserCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getUserToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getUserFromToken(): Promise<UserTokenPayload | null> {
  const token = await getUserToken();
  if (!token) return null;
  return verifyUserToken(token);
}

export async function getCurrentUser(): Promise<User | null> {
  const payload = await getUserFromToken();
  if (!payload) return null;

  const result = await query<User>(
    'SELECT id, email, name, avatar_url, provider, created_at FROM users WHERE id = $1',
    [payload.sub]
  );

  return result[0] || null;
}
