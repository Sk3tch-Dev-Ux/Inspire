import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

const VALID_STATUSES = ['pending', 'awaiting_payment', 'paid', 'confirmed', 'in_progress', 'completed', 'shipped', 'cancelled', 'refunded', 'payment_failed'];

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

    const result = await query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE order_id = $2 RETURNING *',
      [status, id]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: result[0] });
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
