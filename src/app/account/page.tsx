import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/user-auth';
import { query } from '@/lib/db';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { Package, Settings, ChevronRight } from 'lucide-react';

interface Order {
  order_id: string;
  service: string;
  status: string;
  total_cents: number | null;
  created_at: string;
}

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const result = await query<Order>(
    'SELECT order_id, service, status, total_cents, created_at FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT 5',
    [user.id]
  );
  const orders = result;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt="" className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric to-volt flex items-center justify-center">
              <span className="text-2xl font-bold text-midnight">
                {(user.name || user.email)[0].toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-display font-bold text-pearl">
              Welcome back, {user.name || 'there'}
            </h1>
            <p className="text-silver text-sm">{user.email}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <Link href="/account/orders" className="card group flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-electric" />
            </div>
            <div className="flex-grow">
              <h3 className="font-display font-semibold text-pearl">My Orders</h3>
              <p className="text-sm text-silver">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-silver group-hover:text-electric transition-colors" />
          </Link>

          <Link href="/account/settings" className="card group flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center shrink-0">
              <Settings className="w-6 h-6 text-electric" />
            </div>
            <div className="flex-grow">
              <h3 className="font-display font-semibold text-pearl">Settings</h3>
              <p className="text-sm text-silver">Profile & preferences</p>
            </div>
            <ChevronRight className="w-5 h-5 text-silver group-hover:text-electric transition-colors" />
          </Link>
        </div>

        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-pearl">Recent Orders</h2>
            {orders.length > 0 && (
              <Link href="/account/orders" className="text-sm text-electric hover:text-volt transition-colors">
                View All
              </Link>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="card text-center py-12">
              <Package className="w-12 h-12 text-steel mx-auto mb-4" />
              <p className="text-silver mb-4">No orders yet</p>
              <Link href="/order" className="btn-primary inline-flex">
                <span>Book Your First Build</span>
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
                  <div className="flex items-center justify-between gap-4">
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
    </div>
  );
}
