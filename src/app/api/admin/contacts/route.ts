import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');
    const offset = (page - 1) * limit;

    const countResult = await query<{ count: string }>('SELECT COUNT(*) FROM contacts');
    const total = parseInt(countResult[0]?.count || '0');

    const contacts = await query(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Contacts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
