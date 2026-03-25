import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (status && status !== 'all') {
      sql += ` AND status = $${paramIndex++}`;
      params.push(status);
    }

    if (search) {
      sql += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR order_id ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    // Get total count
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*)');
    const countResult = await query<{ count: string }>(countSql, params);
    const total = parseInt(countResult[0]?.count || '0');

    // Get paginated results
    sql += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(limit, offset);

    const orders = await query(sql, params);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
