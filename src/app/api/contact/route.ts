import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          error: 'Missing required fields. Name, email, subject, and message are required.',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // TODO: Add email sending functionality here
    // This is where you would integrate with an email service to send the contact form submission
    // and optionally send a confirmation email to the user.
    //
    // Options for sending emails:
    // 1. Resend (resend.com) - Modern email API for React/Next.js
    // 2. SendGrid - Reliable email service with good deliverability
    // 3. Nodemailer - Simple email sending with SMTP
    //
    // Example using Resend (requires npm install resend):
    // -------------------------------------------------------
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@inspirepc.com',
    //   to: email,
    //   subject: `We received your ${subject} request`,
    //   html: `
    //     <h2>Thank you for contacting Inspire PCs</h2>
    //     <p>We've received your message and will get back to you shortly.</p>
    //     <hr />
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });
    //
    // if (error) {
    //   console.error('Email sending failed:', error);
    //   return NextResponse.json(
    //     { error: 'Failed to send email. Please try again later.' },
    //     { status: 500 }
    //   );
    // }
    //
    // // Optionally send notification email to your team
    // const { data: adminEmail, error: adminError } = await resend.emails.send({
    //   from: 'noreply@inspirepc.com',
    //   to: 'support@inspirepc.com',
    //   subject: `New Contact Form Submission: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });
    // -------------------------------------------------------

    // For now, log the submission to console
    console.log('Contact form submission received:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      subject,
      message,
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
