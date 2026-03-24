import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sanitize } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';
import { sendContactAutoReply, sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { success } = rateLimit(ip, 5, 60_000);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const body = await request.json();

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const subject = sanitize(body.subject);
    const message = sanitize(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields. Name, email, subject, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    await query(
      `INSERT INTO contacts (name, email, phone, subject, message) VALUES ($1,$2,$3,$4,$5)`,
      [name, email, phone || null, subject, message]
    );

    try {
      await Promise.all([
        sendContactAutoReply({ name, email, phone, subject, message }),
        sendContactNotification({ name, email, phone, subject, message }),
      ]);
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
