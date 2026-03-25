import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '@/lib/db';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { success } = rateLimit(ip, 10, 60_000);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });

    const body = await request.json();
    const { tier, selections, customerInfo, total, orderId: existingOrderId } = body;

    const orderId = existingOrderId || `INS-${Date.now()}`;
    const totalCents = Math.round(total * 100);

    const componentList = Object.entries(selections || {})
      .map(([component, id]) => `${component}: ${id}`)
      .join(', ');

    // Update existing order with payment status, or insert if no existing order
    if (existingOrderId) {
      await query(
        `UPDATE orders SET status = 'awaiting_payment', total_cents = $1, updated_at = NOW() WHERE order_id = $2`,
        [totalCents, orderId]
      );
    } else {
      await query(
        `INSERT INTO orders (order_id, service, name, email, phone, address, city, state, zip, notes, status, total_cents)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'awaiting_payment',$11)`,
        [
          orderId,
          `${tier?.charAt(0).toUpperCase()}${tier?.slice(1)} Build`,
          customerInfo?.firstName ? `${customerInfo.firstName} ${customerInfo.lastName}` : 'N/A',
          customerInfo?.email || '',
          customerInfo?.phone || '',
          customerInfo?.address || '',
          customerInfo?.city || '',
          customerInfo?.state || '',
          customerInfo?.zip || '',
          customerInfo?.notes || '',
          totalCents,
        ]
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Inspire Custom PC - ${tier?.charAt(0).toUpperCase()}${tier?.slice(1)} Build`,
              description: componentList ? `Custom PC build with: ${componentList}` : 'Custom PC build service',
            },
            unit_amount: totalCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/order?cancelled=true`,
      customer_email: customerInfo?.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        orderId,
        tier,
        selections: JSON.stringify(selections),
        customerName: customerInfo?.firstName ? `${customerInfo.firstName} ${customerInfo.lastName}` : '',
        customerPhone: customerInfo?.phone || '',
      },
    });

    // Update order with stripe session ID
    await query(
      `UPDATE orders SET stripe_session_id = $1, updated_at = NOW() WHERE order_id = $2`,
      [session.id, orderId]
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
