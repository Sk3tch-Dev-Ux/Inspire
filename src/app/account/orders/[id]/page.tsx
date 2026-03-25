import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/user-auth';
import { query } from '@/lib/db';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { ChevronLeft, CheckCircle, Circle } from 'lucide-react';

interface OrderDetail {
  order_id: string;
  service: string;
  status: string;
  total_cents: number | null;
  addons: string[] | null;
  has_own_parts: boolean;
  budget_range: string | null;
  use_case: string | null;
  pcpartpicker_url: string | null;
  notes: string | null;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

const statusTimeline = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'paid', label: 'Payment Received' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'in_progress', label: 'Building' },
  { key: 'completed', label: 'Build Complete' },
  { key: 'shipped', label: 'Shipped' },
];

function getTimelineIndex(status: string): number {
  const map: Record<string, number> = {
    pending: 0,
    awaiting_payment: 0,
    paid: 1,
    confirmed: 2,
    in_progress: 3,
    completed: 4,
    shipped: 5,
  };
  return map[status] ?? -1;
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;

  const result = await query<OrderDetail>(
    `SELECT order_id, service, status, total_cents, addons, has_own_parts, budget_range,
            use_case, pcpartpicker_url, notes, name, email, phone, created_at, updated_at
     FROM orders WHERE order_id = $1 AND user_id = $2`,
    [id, user.id]
  );

  const order = result[0];
  if (!order) notFound();

  const currentStep = getTimelineIndex(order.status);
  const isCancelled = ['cancelled', 'refunded', 'payment_failed'].includes(order.status);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/account/orders" className="inline-flex items-center gap-1 text-sm text-silver hover:text-pearl transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-display font-bold text-pearl">{order.order_id}</h1>
            <p className="text-sm text-silver mt-1">
              Placed on {new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Status Timeline */}
        {!isCancelled && (
          <div className="card mb-8">
            <h2 className="font-display font-semibold text-pearl mb-6">Order Progress</h2>
            <div className="space-y-4">
              {statusTimeline.map((step, i) => {
                const isComplete = i <= currentStep;
                const isCurrent = i === currentStep;
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    {isComplete ? (
                      <CheckCircle className={`w-5 h-5 shrink-0 ${isCurrent ? 'text-electric' : 'text-volt'}`} />
                    ) : (
                      <Circle className="w-5 h-5 text-steel shrink-0" />
                    )}
                    <span className={`text-sm ${isComplete ? 'text-pearl font-medium' : 'text-silver'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="card mb-8">
          <h2 className="font-display font-semibold text-pearl mb-4">Order Details</h2>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-silver">Service</dt>
              <dd className="text-pearl font-medium">{order.service}</dd>
            </div>
            {order.total_cents && (
              <div className="flex justify-between text-sm">
                <dt className="text-silver">Total</dt>
                <dd className="text-pearl font-medium">${(order.total_cents / 100).toFixed(2)}</dd>
              </div>
            )}
            {order.use_case && (
              <div className="flex justify-between text-sm">
                <dt className="text-silver">Use Case</dt>
                <dd className="text-pearl">{order.use_case}</dd>
              </div>
            )}
            {order.budget_range && (
              <div className="flex justify-between text-sm">
                <dt className="text-silver">Budget</dt>
                <dd className="text-pearl">{order.budget_range}</dd>
              </div>
            )}
            {order.addons && order.addons.length > 0 && (
              <div className="flex justify-between text-sm">
                <dt className="text-silver">Add-ons</dt>
                <dd className="text-pearl text-right">{order.addons.join(', ')}</dd>
              </div>
            )}
            {order.pcpartpicker_url && (
              <div className="flex justify-between text-sm">
                <dt className="text-silver">Parts List</dt>
                <dd>
                  <a href={order.pcpartpicker_url} target="_blank" rel="noopener noreferrer" className="text-electric hover:text-volt transition-colors">
                    View on PCPartPicker
                  </a>
                </dd>
              </div>
            )}
            {order.notes && (
              <div className="pt-2 border-t border-steel">
                <dt className="text-silver text-sm mb-1">Notes</dt>
                <dd className="text-pearl text-sm">{order.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Need Help */}
        <div className="p-5 bg-obsidian rounded-xl border border-steel/50 text-center">
          <p className="text-silver text-sm mb-3">Have questions about your order?</p>
          <Link href="/contact" className="text-electric hover:text-volt transition-colors text-sm font-semibold">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
