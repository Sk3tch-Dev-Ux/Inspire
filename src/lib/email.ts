import { Resend } from 'resend';
import {
  orderConfirmationHtml,
  orderNotificationHtml,
  contactAutoReplyHtml,
  contactNotificationHtml,
  paymentConfirmationHtml,
  welcomeEmailHtml,
  orderStatusUpdateHtml,
} from './email-templates';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = 'Inspire PC <noreply@inspirepc.com>';
const SUPPORT = 'support@inspirepc.com';

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

export async function sendOrderConfirmation(order: OrderData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: order.email,
    subject: `Order Confirmed - ${order.orderId}`,
    html: orderConfirmationHtml(order),
  });
}

export async function sendOrderNotification(order: OrderData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: SUPPORT,
    subject: `New Order: ${order.orderId} - ${order.service}`,
    html: orderNotificationHtml(order),
  });
}

export async function sendContactAutoReply(contact: ContactData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: contact.email,
    subject: `We received your message - ${contact.subject}`,
    html: contactAutoReplyHtml(contact),
  });
}

export async function sendContactNotification(contact: ContactData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: SUPPORT,
    subject: `New Contact: ${contact.subject} from ${contact.name}`,
    html: contactNotificationHtml(contact),
  });
}

export async function sendWelcomeEmail(data: { name: string; email: string }) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Welcome to Inspire PC!',
    html: welcomeEmailHtml(data),
  });
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

const statusSubjects: Record<string, string> = {
  confirmed: 'Order Confirmed',
  in_progress: 'Build Started',
  completed: 'Build Complete',
  shipped: 'Your PC Has Shipped',
  delivered: 'PC Delivered',
  ready_for_pickup: 'Ready for Pickup',
  cancelled: 'Order Cancelled',
  refunded: 'Refund Processed',
};

export async function sendOrderStatusUpdate(data: StatusUpdateData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  const subject = statusSubjects[data.newStatus] || 'Order Update';
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `${subject} - ${data.orderId}`,
    html: orderStatusUpdateHtml(data),
  });
}

export async function sendPaymentConfirmation(order: OrderData) {
  const resend = getResend();
  if (!resend) return console.log('RESEND_API_KEY not set, skipping email');
  return resend.emails.send({
    from: FROM,
    to: order.email,
    subject: `Payment Received - ${order.orderId}`,
    html: paymentConfirmationHtml(order),
  });
}
