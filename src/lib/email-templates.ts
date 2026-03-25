interface OrderData {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  addons: string[];
  totalCents?: number;
  notes?: string;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function wrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:700;color:#00d4ff;letter-spacing:2px;">INSPIRE</span>
      <span style="font-size:24px;font-weight:300;color:#e8e8ec;letter-spacing:2px;"> PC</span>
    </div>
    <div style="background:#12121a;border:1px solid #2a2a3a;border-radius:12px;padding:32px;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;color:#8a8a9a;font-size:13px;">
      <p>Inspire PC &bull; Girard, OH 44420</p>
      <p>(330) 314-8860 &bull; support@inspirepc.com</p>
    </div>
  </div>
</body>
</html>`;
}

export function orderConfirmationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'TBD';
  const addonsHtml = order.addons.length
    ? order.addons.map(a => `<li style="color:#e8e8ec;padding:4px 0;">${a}</li>`).join('')
    : '<li style="color:#8a8a9a;">None</li>';

  return wrapper(`
    <h1 style="color:#00d4ff;font-size:22px;margin:0 0 8px;">Order Confirmed!</h1>
    <p style="color:#8a8a9a;margin:0 0 24px;">Thank you, ${order.name}. We've received your order.</p>

    <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="color:#8a8a9a;margin:0 0 4px;font-size:13px;">ORDER ID</p>
      <p style="color:#00d4ff;font-size:18px;font-weight:600;margin:0;">${order.orderId}</p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Service</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;text-align:right;">${order.service}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Total</td>
          <td style="color:#00ff88;padding:8px 0;border-bottom:1px solid #2a2a3a;text-align:right;font-weight:600;">${total}</td></tr>
    </table>

    <p style="color:#8a8a9a;font-size:13px;margin:0 0 8px;">ADD-ONS</p>
    <ul style="margin:0 0 24px;padding-left:20px;">${addonsHtml}</ul>

    <p style="color:#e8e8ec;margin:0 0 8px;">We'll be in touch within <strong style="color:#00d4ff;">24 hours</strong> to confirm details and next steps.</p>
    <p style="color:#8a8a9a;font-size:13px;margin:16px 0 0;">Questions? Reply to this email or call us at (330) 314-8860.</p>
  `);
}

export function orderNotificationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'Not set';
  return wrapper(`
    <h1 style="color:#00d4ff;font-size:22px;margin:0 0 16px;">New Order Received</h1>

    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;width:120px;">Order ID</td>
          <td style="color:#00d4ff;padding:8px 0;border-bottom:1px solid #2a2a3a;font-weight:600;">${order.orderId}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Name</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${order.name}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Email</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${order.email}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Phone</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${order.phone}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Service</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${order.service}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Add-ons</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${order.addons.join(', ') || 'None'}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Total</td>
          <td style="color:#00ff88;padding:8px 0;border-bottom:1px solid #2a2a3a;font-weight:600;">${total}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;">Notes</td>
          <td style="color:#e8e8ec;padding:8px 0;">${order.notes || 'None'}</td></tr>
    </table>
  `);
}

export function contactAutoReplyHtml(contact: ContactData): string {
  return wrapper(`
    <h1 style="color:#00d4ff;font-size:22px;margin:0 0 8px;">We Got Your Message!</h1>
    <p style="color:#8a8a9a;margin:0 0 24px;">Hi ${contact.name}, thanks for reaching out.</p>

    <p style="color:#e8e8ec;margin:0 0 16px;">We've received your message regarding <strong style="color:#00d4ff;">"${contact.subject}"</strong> and will get back to you within 24 hours.</p>

    <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="color:#8a8a9a;margin:0 0 4px;font-size:13px;">YOUR MESSAGE</p>
      <p style="color:#e8e8ec;margin:0;white-space:pre-wrap;">${contact.message}</p>
    </div>

    <p style="color:#8a8a9a;font-size:13px;margin:0;">Need immediate help? Call us at (330) 314-8860.</p>
  `);
}

export function contactNotificationHtml(contact: ContactData): string {
  return wrapper(`
    <h1 style="color:#00d4ff;font-size:22px;margin:0 0 16px;">New Contact Form Submission</h1>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;width:100px;">Name</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${contact.name}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Email</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${contact.email}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Phone</td>
          <td style="color:#e8e8ec;padding:8px 0;border-bottom:1px solid #2a2a3a;">${contact.phone || 'Not provided'}</td></tr>
      <tr><td style="color:#8a8a9a;padding:8px 0;border-bottom:1px solid #2a2a3a;">Subject</td>
          <td style="color:#00d4ff;padding:8px 0;border-bottom:1px solid #2a2a3a;font-weight:600;">${contact.subject}</td></tr>
    </table>

    <div style="background:#0a0a0f;border-radius:8px;padding:16px;">
      <p style="color:#8a8a9a;margin:0 0 4px;font-size:13px;">MESSAGE</p>
      <p style="color:#e8e8ec;margin:0;white-space:pre-wrap;">${contact.message}</p>
    </div>
  `);
}

export function welcomeEmailHtml(data: { name: string; email: string }): string {
  return wrapper(`
    <h1 style="color:#00d4ff;font-size:22px;margin:0 0 8px;">Welcome to Inspire PC!</h1>
    <p style="color:#8a8a9a;margin:0 0 24px;">Hi ${data.name}, thanks for creating an account.</p>

    <p style="color:#e8e8ec;margin:0 0 16px;">With your account you can:</p>

    <ul style="padding-left:20px;margin:0 0 24px;">
      <li style="color:#e8e8ec;padding:4px 0;">Track your order status in real time</li>
      <li style="color:#e8e8ec;padding:4px 0;">View your complete order history</li>
      <li style="color:#e8e8ec;padding:4px 0;">Chat with our AI assistant for quick answers</li>
      <li style="color:#e8e8ec;padding:4px 0;">Get build updates and notifications</li>
    </ul>

    <div style="text-align:center;margin-bottom:16px;">
      <a href="https://inspirepc.com/account" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#00d4ff,#00ff88);color:#0a0a0f;border-radius:12px;text-decoration:none;font-weight:600;">
        View Your Dashboard
      </a>
    </div>

    <p style="color:#8a8a9a;font-size:13px;margin:16px 0 0;">Ready to get started? <a href="https://inspirepc.com/order" style="color:#00d4ff;text-decoration:none;">Book a build</a> today.</p>
  `);
}

interface StatusUpdateData {
  orderId: string;
  name: string;
  email: string;
  service: string;
  oldStatus: string;
  newStatus: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  estimatedDelivery?: string | null;
  adminNotes?: string | null;
}

const statusMessages: Record<string, { title: string; color: string; message: string }> = {
  confirmed: {
    title: 'Order Confirmed!',
    color: '#00d4ff',
    message: "We've confirmed your order and are preparing to begin work.",
  },
  in_progress: {
    title: 'Build In Progress!',
    color: '#00d4ff',
    message: "Great news — we've started building your PC! We'll update you as we make progress.",
  },
  completed: {
    title: 'Build Complete!',
    color: '#00ff88',
    message: 'Your PC build is complete and has passed all quality checks.',
  },
  shipped: {
    title: 'Your PC Has Shipped!',
    color: '#00ff88',
    message: "Your PC is on its way! Here are your shipping details.",
  },
  delivered: {
    title: 'PC Delivered!',
    color: '#00ff88',
    message: "Your PC has been delivered. We hope you love it!",
  },
  ready_for_pickup: {
    title: 'Ready for Pickup!',
    color: '#00ff88',
    message: 'Your PC build is ready! You can pick it up at your earliest convenience.',
  },
  cancelled: {
    title: 'Order Cancelled',
    color: '#ff6b6b',
    message: "Your order has been cancelled. If you didn't request this, please contact us immediately.",
  },
  refunded: {
    title: 'Refund Processed',
    color: '#ffaa00',
    message: 'A refund has been processed for your order. Please allow 5-10 business days for the refund to appear.',
  },
};

export function orderStatusUpdateHtml(data: StatusUpdateData): string {
  const info = statusMessages[data.newStatus] || {
    title: 'Order Update',
    color: '#00d4ff',
    message: `Your order status has been updated to: ${data.newStatus.replace(/_/g, ' ')}.`,
  };

  let trackingHtml = '';
  if (data.trackingNumber && (data.newStatus === 'shipped' || data.newStatus === 'delivered')) {
    const carrierUrls: Record<string, string> = {
      ups: `https://www.ups.com/track?tracknum=${data.trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?trknbr=${data.trackingNumber}`,
      usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${data.trackingNumber}`,
    };
    const trackingUrl = data.carrier ? carrierUrls[data.carrier.toLowerCase()] : null;

    trackingHtml = `
      <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin:20px 0;">
        <p style="color:#8a8a9a;margin:0 0 4px;font-size:13px;">TRACKING DETAILS</p>
        <table style="width:100%;border-collapse:collapse;">
          ${data.carrier ? `<tr><td style="color:#8a8a9a;padding:6px 0;">Carrier</td><td style="color:#e8e8ec;padding:6px 0;text-align:right;text-transform:uppercase;">${data.carrier}</td></tr>` : ''}
          <tr><td style="color:#8a8a9a;padding:6px 0;">Tracking #</td><td style="color:#00d4ff;padding:6px 0;text-align:right;font-weight:600;">${data.trackingNumber}</td></tr>
          ${data.estimatedDelivery ? `<tr><td style="color:#8a8a9a;padding:6px 0;">Est. Delivery</td><td style="color:#e8e8ec;padding:6px 0;text-align:right;">${new Date(data.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</td></tr>` : ''}
        </table>
        ${trackingUrl ? `<div style="text-align:center;margin-top:12px;"><a href="${trackingUrl}" style="display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#00d4ff,#00ff88);color:#0a0a0f;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Track Your Package</a></div>` : ''}
      </div>
    `;
  }

  let notesHtml = '';
  if (data.adminNotes) {
    notesHtml = `
      <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#8a8a9a;margin:0 0 4px;font-size:13px;">NOTE FROM OUR TEAM</p>
        <p style="color:#e8e8ec;margin:0;">${data.adminNotes}</p>
      </div>
    `;
  }

  return wrapper(`
    <h1 style="color:${info.color};font-size:22px;margin:0 0 8px;">${info.title}</h1>
    <p style="color:#8a8a9a;margin:0 0 24px;">Hi ${data.name}, here's an update on your order.</p>

    <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#8a8a9a;padding:6px 0;">Order</td>
            <td style="color:#00d4ff;padding:6px 0;text-align:right;font-weight:600;">${data.orderId}</td></tr>
        <tr><td style="color:#8a8a9a;padding:6px 0;">Service</td>
            <td style="color:#e8e8ec;padding:6px 0;text-align:right;">${data.service}</td></tr>
        <tr><td style="color:#8a8a9a;padding:6px 0;">Status</td>
            <td style="color:${info.color};padding:6px 0;text-align:right;font-weight:600;text-transform:capitalize;">${data.newStatus.replace(/_/g, ' ')}</td></tr>
      </table>
    </div>

    <p style="color:#e8e8ec;margin:0 0 8px;">${info.message}</p>
    ${trackingHtml}
    ${notesHtml}

    <div style="text-align:center;margin:24px 0 16px;">
      <a href="https://inspirepc.com/account/orders/${data.orderId}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#00d4ff,#00ff88);color:#0a0a0f;border-radius:12px;text-decoration:none;font-weight:600;">
        View Order Details
      </a>
    </div>

    <p style="color:#8a8a9a;font-size:13px;margin:16px 0 0;">Questions? Reply to this email or call (330) 314-8860.</p>
  `);
}

export function paymentConfirmationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'N/A';
  return wrapper(`
    <h1 style="color:#00ff88;font-size:22px;margin:0 0 8px;">Payment Received!</h1>
    <p style="color:#8a8a9a;margin:0 0 24px;">Thank you, ${order.name}. Your payment has been processed.</p>

    <div style="background:#0a0a0f;border-radius:8px;padding:16px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#8a8a9a;padding:6px 0;">Order</td>
            <td style="color:#00d4ff;padding:6px 0;text-align:right;font-weight:600;">${order.orderId}</td></tr>
        <tr><td style="color:#8a8a9a;padding:6px 0;">Service</td>
            <td style="color:#e8e8ec;padding:6px 0;text-align:right;">${order.service}</td></tr>
        <tr><td style="color:#8a8a9a;padding:6px 0;">Amount Paid</td>
            <td style="color:#00ff88;padding:6px 0;text-align:right;font-weight:600;">${total}</td></tr>
      </table>
    </div>

    <p style="color:#e8e8ec;margin:0 0 8px;">We'll begin working on your build shortly. You'll receive updates as we progress.</p>
    <p style="color:#8a8a9a;font-size:13px;margin:16px 0 0;">Questions? Reply to this email or call (330) 314-8860.</p>
  `);
}
