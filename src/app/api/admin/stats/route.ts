import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const [orderStats, statusBreakdown, recentOrders, recentContacts, contactCount] = await Promise.all([
      query<{ total: string; revenue: string }>(`SELECT COUNT(*) as total, COALESCE(SUM(total_cents), 0) as revenue FROM orders`),
      query<{ status: string; count: string }>(`SELECT status, COUNT(*) as count FROM orders GROUP BY status ORDER BY count DESC`),
      query(`SELECT order_id, name, email, service, status, total_cents, created_at FROM orders ORDER BY created_at DESC LIMIT 10`),
      query(`SELECT id, name, email, subject, created_at, read_at FROM contacts ORDER BY created_at DESC LIMIT 5`),
      query<{ total: string; unread: string }>(`SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE read_at IS NULL) as unread FROM contacts`),
    ]);

    return NextResponse.json({
      orders: {
        total: parseInt(orderStats[0]?.total || '0'),
        revenue: parseInt(orderStats[0]?.revenue || '0'),
        byStatus: statusBreakdown.reduce((acc: Record<string, number>, row) => {
          acc[row.status] = parseInt(row.count);
          return acc;
        }, {}),
      },
      contacts: {
        total: parseInt(contactCount[0]?.total || '0'),
        unread: parseInt(contactCount[0]?.unread || '0'),
      },
      recentOrders,
      recentContacts,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
