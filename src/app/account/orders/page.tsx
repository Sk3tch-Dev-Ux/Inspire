import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/user-auth';
import { query } from '@/lib/db';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { ChevronLeft, Package } from 'lucide-react';

interface Order {
  order_id: string;
  service: string;
  status: string;
  total_cents: number | null;
  created_at: string;
}

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const result = await query<Order>(
    'SELECT order_id, service, status, total_cents, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  );
  const orders = result;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/account" className="inline-flex items-center gap-1 text-sm text-silver hover:text-pearl transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-display font-bold text-pearl mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="w-12 h-12 text-steel mx-auto mb-4" />
            <p className="text-silver mb-4">You haven&apos;t placed any orders yet.</p>
            <Link href="/order" className="btn-primary inline-flex">
              <span>Book a Build</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.order_id}
                href={`/account/orders/${order.order_id}`}
                className="block p-5 bg-obsidian rounded-xl border border-steel hover:border-electric/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-display font-semibold text-pearl">{order.order_id}</p>
                    <p className="text-sm text-silver">
                      {order.service} &middot; {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    {order.total_cents && (
                      <span className="text-sm font-semibold text-pearl">
                        ${(order.total_cents / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
