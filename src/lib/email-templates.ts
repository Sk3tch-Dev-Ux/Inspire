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

// Brand-aligned palette (Inspire Development).
const C = {
  ink: '#0A0A0A',
  carbon: '#1A1A1A',
  steel: '#2D2D2D',
  mute: '#7A7A7A',
  bone: '#FAFAF7',
  flame: '#FF6B1A',
  flameGlow: '#FF8742',
};

function wrapper(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.ink};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:24px;font-weight:700;color:${C.bone};letter-spacing:1px;">INSPIRE</span>
      <span style="font-size:24px;font-weight:700;color:${C.flame};letter-spacing:1px;">⚡</span>
      <span style="font-size:13px;font-weight:500;color:${C.mute};letter-spacing:3px;text-transform:uppercase;display:block;margin-top:4px;">Development</span>
    </div>
    <div style="background:${C.carbon};border:1px solid ${C.steel};border-radius:12px;padding:32px;">
      ${content}
    </div>
    <div style="text-align:center;margin-top:24px;color:${C.mute};font-size:13px;">
      <p>Inspire Development</p>
      <p>hello@inspirepc.com</p>
    </div>
  </div>
</body>
</html>`;
}

export function orderConfirmationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'TBD';
  const addonsHtml = order.addons.length
    ? order.addons.map(a => `<li style="color:${C.bone};padding:4px 0;">${a}</li>`).join('')
    : `<li style="color:${C.mute};">None</li>`;

  return wrapper(`
    <h1 style="color:${C.flame};font-size:22px;margin:0 0 8px;">Project Request Received</h1>
    <p style="color:${C.mute};margin:0 0 24px;">Thanks, ${order.name}. We&apos;ve got your details and will be in touch shortly.</p>

    <div style="background:${C.ink};border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="color:${C.mute};margin:0 0 4px;font-size:13px;">REFERENCE</p>
      <p style="color:${C.flame};font-size:18px;font-weight:600;margin:0;">${order.orderId}</p>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Service</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};text-align:right;">${order.service}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Estimated total</td>
          <td style="color:${C.flame};padding:8px 0;border-bottom:1px solid ${C.steel};text-align:right;font-weight:600;">${total}</td></tr>
    </table>

    <p style="color:${C.mute};font-size:13px;margin:0 0 8px;">ADD-ONS</p>
    <ul style="margin:0 0 24px;padding-left:20px;">${addonsHtml}</ul>

    <p style="color:${C.bone};margin:0 0 8px;">We&apos;ll reach out within <strong style="color:${C.flame};">24 hours</strong> to scope the work and confirm next steps.</p>
    <p style="color:${C.mute};font-size:13px;margin:16px 0 0;">Questions? Reply to this email or ping us on Discord.</p>
  `);
}

export function orderNotificationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'Not set';
  return wrapper(`
    <h1 style="color:${C.flame};font-size:22px;margin:0 0 16px;">New Project Request</h1>

    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};width:120px;">Reference</td>
          <td style="color:${C.flame};padding:8px 0;border-bottom:1px solid ${C.steel};font-weight:600;">${order.orderId}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Name</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${order.name}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Email</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${order.email}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Phone</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${order.phone || '—'}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Service</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${order.service}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Add-ons</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${order.addons.join(', ') || 'None'}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Estimate</td>
          <td style="color:${C.flame};padding:8px 0;border-bottom:1px solid ${C.steel};font-weight:600;">${total}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;">Notes</td>
          <td style="color:${C.bone};padding:8px 0;">${order.notes || 'None'}</td></tr>
    </table>
  `);
}

export function contactAutoReplyHtml(contact: ContactData): string {
  return wrapper(`
    <h1 style="color:${C.flame};font-size:22px;margin:0 0 8px;">We Got Your Message</h1>
    <p style="color:${C.mute};margin:0 0 24px;">Hi ${contact.name}, thanks for reaching out.</p>

    <p style="color:${C.bone};margin:0 0 16px;">We received your message about <strong style="color:${C.flame};">&ldquo;${contact.subject}&rdquo;</strong> and will reply within 24 hours.</p>

    <div style="background:${C.ink};border-radius:8px;padding:16px;margin-bottom:20px;">
      <p style="color:${C.mute};margin:0 0 4px;font-size:13px;">YOUR MESSAGE</p>
      <p style="color:${C.bone};margin:0;white-space:pre-wrap;">${contact.message}</p>
    </div>

    <p style="color:${C.mute};font-size:13px;margin:0;">Need a faster response? Ping us on Discord.</p>
  `);
}

export function contactNotificationHtml(contact: ContactData): string {
  return wrapper(`
    <h1 style="color:${C.flame};font-size:22px;margin:0 0 16px;">New Contact Form Submission</h1>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};width:100px;">Name</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${contact.name}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Email</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${contact.email}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Phone</td>
          <td style="color:${C.bone};padding:8px 0;border-bottom:1px solid ${C.steel};">${contact.phone || 'Not provided'}</td></tr>
      <tr><td style="color:${C.mute};padding:8px 0;border-bottom:1px solid ${C.steel};">Subject</td>
          <td style="color:${C.flame};padding:8px 0;border-bottom:1px solid ${C.steel};font-weight:600;">${contact.subject}</td></tr>
    </table>

    <div style="background:${C.ink};border-radius:8px;padding:16px;">
      <p style="color:${C.mute};margin:0 0 4px;font-size:13px;">MESSAGE</p>
      <p style="color:${C.bone};margin:0;white-space:pre-wrap;">${contact.message}</p>
    </div>
  `);
}

export function welcomeEmailHtml(data: { name: string; email: string }): string {
  return wrapper(`
    <h1 style="color:${C.flame};font-size:22px;margin:0 0 8px;">Welcome to Inspire Development</h1>
    <p style="color:${C.mute};margin:0 0 24px;">Hi ${data.name}, glad to have you on board.</p>

    <p style="color:${C.bone};margin:0 0 16px;">With your account you can:</p>

    <ul style="padding-left:20px;margin:0 0 24px;">
      <li style="color:${C.bone};padding:4px 0;">Track project status and milestones in real time.</li>
      <li style="color:${C.bone};padding:4px 0;">Review past requests and quotes.</li>
      <li style="color:${C.bone};padding:4px 0;">Chat with our AI assistant for quick questions.</li>
      <li style="color:${C.bone};padding:4px 0;">Get build updates and notifications.</li>
    </ul>

    <div style="text-align:center;margin-bottom:16px;">
      <a href="https://inspirepc.com/account" style="display:inline-block;padding:14px 32px;background:${C.flame};color:${C.ink};border-radius:12px;text-decoration:none;font-weight:600;">
        View Your Dashboard
      </a>
    </div>

    <p style="color:${C.mute};font-size:13px;margin:16px 0 0;">Ready to start something? <a href="https://inspirepc.com/quote" style="color:${C.flame};text-decoration:none;">Request a quote</a>.</p>
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
    title: 'Project Confirmed',
    color: C.flame,
    message: 'We&apos;ve confirmed your project and will begin work shortly.',
  },
  in_progress: {
    title: 'Work In Progress',
    color: C.flame,
    message: 'Heads up — we&apos;ve started building. We&apos;ll send updates as milestones land.',
  },
  completed: {
    title: 'Project Complete',
    color: C.flameGlow,
    message: 'Your project is complete. Check the dashboard for the deliverables.',
  },
  shipped: {
    title: 'Project Delivered',
    color: C.flameGlow,
    message: 'Your project has been delivered. Details below.',
  },
  delivered: {
    title: 'Delivery Confirmed',
    color: C.flameGlow,
    message: 'Delivery confirmed. Hope it&apos;s working out — let us know if anything needs a touch-up.',
  },
  ready_for_pickup: {
    title: 'Ready to Hand Off',
    color: C.flameGlow,
    message: 'Your project is ready. Reach out and we&apos;ll get the handoff scheduled.',
  },
  cancelled: {
    title: 'Project Cancelled',
    color: '#ff6b6b',
    message: 'This project has been cancelled. If you didn&apos;t request that, please contact us right away.',
  },
  refunded: {
    title: 'Refund Processed',
    color: '#ffaa00',
    message: 'A refund has been processed. Allow 5-10 business days for it to clear.',
  },
};

export function orderStatusUpdateHtml(data: StatusUpdateData): string {
  const info = statusMessages[data.newStatus] || {
    title: 'Project Update',
    color: C.flame,
    message: `Your project status is now: ${data.newStatus.replace(/_/g, ' ')}.`,
  };

  let trackingHtml = '';
  if (data.trackingNumber && (data.newStatus === 'shipped' || data.newStatus === 'delivered')) {
    trackingHtml = `
      <div style="background:${C.ink};border-radius:8px;padding:16px;margin:20px 0;">
        <p style="color:${C.mute};margin:0 0 4px;font-size:13px;">DELIVERY DETAILS</p>
        <table style="width:100%;border-collapse:collapse;">
          ${data.carrier ? `<tr><td style="color:${C.mute};padding:6px 0;">Method</td><td style="color:${C.bone};padding:6px 0;text-align:right;text-transform:uppercase;">${data.carrier}</td></tr>` : ''}
          <tr><td style="color:${C.mute};padding:6px 0;">Reference</td><td style="color:${C.flame};padding:6px 0;text-align:right;font-weight:600;">${data.trackingNumber}</td></tr>
          ${data.estimatedDelivery ? `<tr><td style="color:${C.mute};padding:6px 0;">Est. Delivery</td><td style="color:${C.bone};padding:6px 0;text-align:right;">${new Date(data.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</td></tr>` : ''}
        </table>
      </div>
    `;
  }

  let notesHtml = '';
  if (data.adminNotes) {
    notesHtml = `
      <div style="background:${C.ink};border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:${C.mute};margin:0 0 4px;font-size:13px;">NOTE FROM US</p>
        <p style="color:${C.bone};margin:0;">${data.adminNotes}</p>
      </div>
    `;
  }

  return wrapper(`
    <h1 style="color:${info.color};font-size:22px;margin:0 0 8px;">${info.title}</h1>
    <p style="color:${C.mute};margin:0 0 24px;">Hi ${data.name}, here&apos;s an update on your project.</p>

    <div style="background:${C.ink};border-radius:8px;padding:16px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:${C.mute};padding:6px 0;">Reference</td>
            <td style="color:${C.flame};padding:6px 0;text-align:right;font-weight:600;">${data.orderId}</td></tr>
        <tr><td style="color:${C.mute};padding:6px 0;">Service</td>
            <td style="color:${C.bone};padding:6px 0;text-align:right;">${data.service}</td></tr>
        <tr><td style="color:${C.mute};padding:6px 0;">Status</td>
            <td style="color:${info.color};padding:6px 0;text-align:right;font-weight:600;text-transform:capitalize;">${data.newStatus.replace(/_/g, ' ')}</td></tr>
      </table>
    </div>

    <p style="color:${C.bone};margin:0 0 8px;">${info.message}</p>
    ${trackingHtml}
    ${notesHtml}

    <div style="text-align:center;margin:24px 0 16px;">
      <a href="https://inspirepc.com/account/orders/${data.orderId}" style="display:inline-block;padding:14px 32px;background:${C.flame};color:${C.ink};border-radius:12px;text-decoration:none;font-weight:600;">
        View Project Details
      </a>
    </div>

    <p style="color:${C.mute};font-size:13px;margin:16px 0 0;">Questions? Reply to this email or ping us on Discord.</p>
  `);
}

export function paymentConfirmationHtml(order: OrderData): string {
  const total = order.totalCents ? `$${(order.totalCents / 100).toFixed(2)}` : 'N/A';
  return wrapper(`
    <h1 style="color:${C.flameGlow};font-size:22px;margin:0 0 8px;">Payment Received</h1>
    <p style="color:${C.mute};margin:0 0 24px;">Thanks, ${order.name}. Your payment has cleared.</p>

    <div style="background:${C.ink};border-radius:8px;padding:16px;margin-bottom:20px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:${C.mute};padding:6px 0;">Reference</td>
            <td style="color:${C.flame};padding:6px 0;text-align:right;font-weight:600;">${order.orderId}</td></tr>
        <tr><td style="color:${C.mute};padding:6px 0;">Service</td>
            <td style="color:${C.bone};padding:6px 0;text-align:right;">${order.service}</td></tr>
        <tr><td style="color:${C.mute};padding:6px 0;">Amount Paid</td>
            <td style="color:${C.flameGlow};padding:6px 0;text-align:right;font-weight:600;">${total}</td></tr>
      </table>
    </div>

    <p style="color:${C.bone};margin:0 0 8px;">We&apos;re kicking the work off now. You&apos;ll get updates as we hit milestones.</p>
    <p style="color:${C.mute};font-size:13px;margin:16px 0 0;">Questions? Reply to this email or ping us on Discord.</p>
  `);
}
