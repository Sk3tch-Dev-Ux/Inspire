import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    })

    const body = await request.json()
    const { tier, selections, customerInfo, total } = body

    // Create a detailed product description
    const componentList = Object.entries(selections)
      .map(([component, id]) => `${component}: ${id}`)
      .join(', ')

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Inspire Custom PC - ${tier.charAt(0).toUpperCase() + tier.slice(1)} Build`,
              description: `Custom PC build with selected components: ${componentList}`,
              images: ['https://inspire-pcs.com/og-image.png'], // Replace with actual image URL
            },
            unit_amount: total * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/order?cancelled=true`,
      customer_email: customerInfo.email,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        tier,
        selections: JSON.stringify(selections),
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerPhone: customerInfo.phone,
        shippingAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`,
        notes: customerInfo.notes,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
