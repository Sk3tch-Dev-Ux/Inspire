import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendOrderStatusUpdate } from '@/lib/email';

const VALID_STATUSES = [
  'pending', 'awaiting_payment', 'paid', 'confirmed', 'in_progress',
  'completed', 'shipped', 'delivered', 'ready_for_pickup',
  'cancelled', 'refunded', 'payment_failed',
];

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, tracking_number, carrier, shipping_method, estimated_delivery, admin_notes, notify } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

    // Get current order for old status + customer email
    const existing = await query<{
      order_id: string; status: string; name: string; email: string;
      service: string; total_cents: number | null;
    }>(
      'SELECT order_id, status, name, email, service, total_cents FROM orders WHERE order_id = $1',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const oldOrder = existing[0];
    const oldStatus = oldOrder.status;

    // Build dynamic update query
    const updates: string[] = ['status = $1', 'updated_at = NOW()'];
    const values: unknown[] = [status];
    let paramIndex = 2;

    if (tracking_number !== undefined) {
      updates.push(`tracking_number = $${paramIndex++}`);
      values.push(tracking_number || null);
    }
    if (carrier !== undefined) {
      updates.push(`carrier = $${paramIndex++}`);
      values.push(carrier || null);
    }
    if (shipping_method !== undefined) {
      updates.push(`shipping_method = $${paramIndex++}`);
      values.push(shipping_method);
    }
    if (estimated_delivery !== undefined) {
      updates.push(`estimated_delivery = $${paramIndex++}`);
      values.push(estimated_delivery || null);
    }
    if (admin_notes !== undefined) {
      updates.push(`admin_notes = $${paramIndex++}`);
      values.push(admin_notes || null);
    }

    // Set shipped_at timestamp when status changes to shipped
    if (status === 'shipped' && oldStatus !== 'shipped') {
      updates.push(`shipped_at = NOW()`);
    }
    // Set delivered_at timestamp
    if ((status === 'delivered' || status === 'ready_for_pickup') && oldStatus !== 'delivered' && oldStatus !== 'ready_for_pickup') {
      updates.push(`delivered_at = NOW()`);
    }

    values.push(id);

    const result = await query(
      `UPDATE orders SET ${updates.join(', ')} WHERE order_id = $${paramIndex} RETURNING *`,
      values
    );

    // Record status change in history
    if (oldStatus !== status) {
      await query(
        `INSERT INTO order_status_history (order_id, old_status, new_status, note, tracking_number, carrier)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, oldStatus, status, admin_notes || null, tracking_number || null, carrier || null]
      );
    }

    // Send email notification if requested (or auto-notify on key status changes)
    const autoNotifyStatuses = ['confirmed', 'in_progress', 'completed', 'shipped', 'delivered', 'ready_for_pickup'];
    const shouldNotify = notify === true || (notify !== false && oldStatus !== status && autoNotifyStatuses.includes(status));

    if (shouldNotify) {
      try {
        await sendOrderStatusUpdate({
          orderId: oldOrder.order_id,
          name: oldOrder.name,
          email: oldOrder.email,
          service: oldOrder.service,
          oldStatus,
          newStatus: status,
          trackingNumber: tracking_number || result[0]?.tracking_number || null,
          carrier: carrier || result[0]?.carrier || null,
          estimatedDelivery: estimated_delivery || result[0]?.estimated_delivery || null,
          adminNotes: admin_notes || null,
        });
      } catch (emailErr) {
        console.error('Failed to send status update email:', emailErr);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ order: result[0] });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

// GET status history for an order
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const history = await query(
      `SELECT * FROM order_status_history WHERE order_id = $1 ORDER BY created_at DESC`,
      [id]
    );
    return NextResponse.json({ history });
  } catch (error) {
    console.error('Status history error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
