import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { rateLimit } from '@/lib/rate-limit';
import { verifyUserToken } from '@/lib/user-auth';
import { query } from '@/lib/db';
import { buildSystemPrompt } from '@/lib/chat-knowledge';

const ORDER_TOOL: Anthropic.Tool = {
  name: 'lookup_orders',
  description: 'Look up the customer\'s orders. If order_id is provided, returns that specific order. Otherwise returns their recent orders.',
  input_schema: {
    type: 'object' as const,
    properties: {
      order_id: {
        type: 'string',
        description: 'Optional specific order ID (e.g. INS-1234567890)',
      },
    },
    required: [],
  },
};

interface OrderRow {
  order_id: string;
  service: string;
  status: string;
  total_cents: number | null;
  addons: string[] | null;
  use_case: string | null;
  created_at: string;
  updated_at: string;
}

interface OrderSummaryRow {
  order_id: string;
  service: string;
  status: string;
  total_cents: number | null;
  created_at: string;
}

async function lookupOrders(userId: string, orderId?: string) {
  if (orderId) {
    const result = await query<OrderRow>(
      `SELECT order_id, service, status, total_cents, addons, use_case, created_at, updated_at
       FROM orders WHERE order_id = $1 AND user_id = $2`,
      [orderId, userId]
    );
    if (result.length === 0) return { error: 'Order not found or does not belong to this account.' };
    const o = result[0];
    return {
      order_id: o.order_id,
      service: o.service,
      status: o.status,
      total: o.total_cents ? `$${(o.total_cents / 100).toFixed(2)}` : 'Not set',
      addons: o.addons || [],
      use_case: o.use_case,
      placed: o.created_at,
      last_updated: o.updated_at,
    };
  }

  const result = await query<OrderSummaryRow>(
    `SELECT order_id, service, status, total_cents, created_at
     FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10`,
    [userId]
  );

  if (result.length === 0) return { message: 'No orders found for this account.' };

  return {
    orders: result.map((o) => ({
      order_id: o.order_id,
      service: o.service,
      status: o.status,
      total: o.total_cents ? `$${(o.total_cents / 100).toFixed(2)}` : 'Not set',
      placed: o.created_at,
    })),
  };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const { success } = rateLimit(ip, 20, 60_000);
  if (!success) {
    return NextResponse.json({ error: 'Too many messages. Please wait a moment.' }, { status: 429 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Chat is not configured.' }, { status: 500 });
  }

  const body = await request.json();
  const { message, history } = body as {
    message: string;
    history: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  if (!message || typeof message !== 'string' || message.length > 2000) {
    return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
  }

  // Check auth
  const token = request.cookies.get('user_token')?.value;
  let userId: string | null = null;
  if (token) {
    const payload = await verifyUserToken(token);
    if (payload) userId = payload.sub;
  }

  const isAuthenticated = !!userId;
  const systemPrompt = buildSystemPrompt(isAuthenticated);
  const tools = isAuthenticated ? [ORDER_TOOL] : [];

  // Build messages
  const messages: Anthropic.MessageParam[] = [
    ...(history || []).slice(-10).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
    { role: 'user', content: message },
  ];

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    // Initial call
    let response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
      tools: tools.length > 0 ? tools : undefined,
    });

    // Handle tool use loop
    while (response.stop_reason === 'tool_use') {
      const toolBlock = response.content.find(
        (b): b is Anthropic.ContentBlock & { type: 'tool_use' } => b.type === 'tool_use'
      );
      if (!toolBlock || !userId) break;

      const input = toolBlock.input as { order_id?: string };
      const toolResult = await lookupOrders(userId, input.order_id);

      messages.push({ role: 'assistant', content: response.content });
      messages.push({
        role: 'user',
        content: [
          {
            type: 'tool_result',
            tool_use_id: toolBlock.id,
            content: JSON.stringify(toolResult),
          },
        ],
      });

      response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages,
        tools,
      });
    }

    // Extract text from response
    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');

    return NextResponse.json({ response: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Failed to get response. Please try again.' }, { status: 500 });
  }
}
