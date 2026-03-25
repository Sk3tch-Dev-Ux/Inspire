import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sanitize } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';
import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email';
import { getUserFromToken } from '@/lib/user-auth';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { success } = rateLimit(ip, 3, 60_000);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const body = await request.json();

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const service = sanitize(body.service);
    const hasOwnParts = Boolean(body.hasOwnParts);
    const budgetRange = sanitize(body.budgetRange);
    const useCase = sanitize(body.useCase);
    const pcpartpickerUrl = sanitize(body.pcpartpickerUrl);
    const partsList = sanitize(body.partsList);
    const address = sanitize(body.address);
    const city = sanitize(body.city);
    const state = sanitize(body.state);
    const zip = sanitize(body.zip);
    const notes = sanitize(body.notes);
    const addons: string[] = Array.isArray(body.addons) ? body.addons.map(String) : [];

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, and service are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const orderId = `INS-${Date.now()}`;

    // Check if user is authenticated to link order
    const userPayload = await getUserFromToken().catch(() => null);

    await query(
      `INSERT INTO orders (order_id, service, addons, has_own_parts, budget_range, use_case, pcpartpicker_url, parts_list, name, email, phone, address, city, state, zip, notes, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [orderId, service, JSON.stringify(addons), hasOwnParts, budgetRange, useCase, pcpartpickerUrl, partsList, name, email, phone, address, city, state, zip, notes, userPayload?.sub || null]
    );

    try {
      await Promise.all([
        sendOrderConfirmation({ orderId, name, email, phone, service, addons }),
        sendOrderNotification({ orderId, name, email, phone, service, addons, notes }),
      ]);
    } catch (emailErr) {
      console.error('Email send failed (non-blocking):', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully. We'll be in touch within 24 hours.",
      orderId,
    });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json({ error: 'Failed to process order. Please try again.' }, { status: 500 });
  }
}
