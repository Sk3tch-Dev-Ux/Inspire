import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page and admin API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/')) {
    return NextResponse.next();
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const password = process.env.ADMIN_PASSWORD;
      if (!password) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      const secret = new TextEncoder().encode(password + '_inspire_admin_secret');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
