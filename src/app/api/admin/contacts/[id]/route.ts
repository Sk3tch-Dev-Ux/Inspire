import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { read } = await request.json();

    const result = await query(
      'UPDATE contacts SET read_at = $1 WHERE id = $2 RETURNING *',
      [read ? new Date().toISOString() : null, id]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ contact: result[0] });
  } catch (error) {
    console.error('Contact update error:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}
