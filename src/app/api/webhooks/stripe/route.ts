import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '@/lib/db';
import { sendPaymentConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });

    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await query(
            `UPDATE orders SET status = 'paid', stripe_session_id = $1, stripe_payment_intent_id = $2, updated_at = NOW() WHERE order_id = $3`,
            [session.id, session.payment_intent as string, orderId]
          );

          const rows = await query<{ name: string; email: string; phone: string; service: string; addons: string; total_cents: number }>(
            `SELECT name, email, phone, service, addons, total_cents FROM orders WHERE order_id = $1`,
            [orderId]
          );

          if (rows.length > 0) {
            const order = rows[0];
            try {
              await sendPaymentConfirmation({
                orderId,
                name: order.name,
                email: order.email,
                phone: order.phone,
                service: order.service,
                addons: JSON.parse(order.addons || '[]'),
                totalCents: order.total_cents,
              });
            } catch (emailErr) {
              console.error('Payment confirmation email failed:', emailErr);
            }
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await query(
          `UPDATE orders SET status = 'confirmed', updated_at = NOW() WHERE stripe_payment_intent_id = $1`,
          [paymentIntent.id]
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await query(
          `UPDATE orders SET status = 'payment_failed', updated_at = NOW() WHERE stripe_payment_intent_id = $1`,
          [paymentIntent.id]
        );
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        if (charge.payment_intent) {
          await query(
            `UPDATE orders SET status = 'refunded', updated_at = NOW() WHERE stripe_payment_intent_id = $1`,
            [charge.payment_intent as string]
          );
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
