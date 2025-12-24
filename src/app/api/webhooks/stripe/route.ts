import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })

    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        
        // Here you would:
        // 1. Update your database with the order status
        // 2. Send confirmation email to customer
        // 3. Notify your team of new order
        // 4. Create order in your fulfillment system
        
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)
        
        // Handle failed payment
        // Send notification to customer about failed payment
        
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        console.log('Charge refunded:', charge.id)
        
        // Handle refund
        // Update order status in database
        
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
