import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form fields
    const {
      service,
      addons,
      hasOwnParts,
      budgetRange,
      useCase,
      pcpartpickerUrl,
      partsList,
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      notes,
    } = body

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, phone, and service are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Generate order ID
    const orderId = `INS-${Date.now()}`

    // Log the complete order to console
    console.log('=== NEW ORDER SUBMITTED ===')
    console.log('Order ID:', orderId)
    console.log('Service:', service)
    console.log('Add-ons:', addons)
    console.log('Has Own Parts:', hasOwnParts)
    console.log('Budget Range:', budgetRange)
    console.log('Use Case:', useCase)
    console.log('PC Part Picker URL:', pcpartpickerUrl)
    console.log('Parts List:', partsList)
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Phone:', phone)
    console.log('Address:', address)
    console.log('City:', city)
    console.log('State:', state)
    console.log('ZIP:', zip)
    console.log('Notes:', notes)
    console.log('=== END ORDER ===')

    // TODO: Integrate email service to send confirmation email
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'orders@inspire-pcs.com',
    //   to: email,
    //   subject: `Order Confirmed - ${orderId}`,
    //   html: `
    //     <h1>Thank you for your order!</h1>
    //     <p>Your order ID is: ${orderId}</p>
    //     <p>We'll be in touch within 24 hours to confirm details.</p>
    //   `,
    // })

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully. We\'ll be in touch within 24 hours.',
      orderId,
    })
  } catch (error) {
    console.error('Order submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process order. Please try again.' },
      { status: 500 }
    )
  }
}
