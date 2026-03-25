import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/user-auth';
import { query } from '@/lib/db';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import { ChevronLeft, CheckCircle, Circle, Truck, MapPin, Package, ExternalLink, Clock } from 'lucide-react';

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
  tracking_number: string | null;
  carrier: string | null;
  shipping_method: string | null;
  estimated_delivery: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

interface StatusHistoryEntry {
  id: string;
  old_status: string | null;
  new_status: string;
  note: string | null;
  tracking_number: string | null;
  carrier: string | null;
  created_at: string;
}

const statusTimeline = [
  { key: 'pending', label: 'Order Placed', icon: 'package' },
  { key: 'paid', label: 'Payment Received', icon: 'check' },
  { key: 'confirmed', label: 'Confirmed', icon: 'check' },
  { key: 'in_progress', label: 'Building', icon: 'build' },
  { key: 'completed', label: 'Build Complete', icon: 'check' },
  { key: 'shipped', label: 'Shipped / Ready', icon: 'truck' },
  { key: 'delivered', label: 'Delivered', icon: 'mappin' },
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
    ready_for_pickup: 5,
    delivered: 6,
  };
  return map[status] ?? -1;
}

function getCarrierTrackingUrl(carrier: string | null, trackingNumber: string): string | null {
  if (!carrier) return null;
  const urls: Record<string, string> = {
    ups: `https://www.ups.com/track?tracknum=${trackingNumber}`,
    fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
    usps: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    dhl: `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${trackingNumber}`,
  };
  return urls[carrier.toLowerCase()] || null;
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;

  const result = await query<OrderDetail>(
    `SELECT order_id, service, status, total_cents, addons, has_own_parts, budget_range,
            use_case, pcpartpicker_url, notes, name, email, phone,
            tracking_number, carrier, shipping_method, estimated_delivery,
            shipped_at, delivered_at, admin_notes,
            created_at, updated_at
     FROM orders WHERE order_id = $1 AND user_id = $2`,
    [id, user.id]
  );

  const order = result[0];
  if (!order) notFound();

  // Fetch status history
  let statusHistory: StatusHistoryEntry[] = [];
  try {
    statusHistory = await query<StatusHistoryEntry>(
      `SELECT id, old_status, new_status, note, tracking_number, carrier, created_at
       FROM order_status_history WHERE order_id = $1 ORDER BY created_at DESC LIMIT 20`,
      [id]
    );
  } catch {
    // Table may not exist yet if migration hasn't run
  }

  const currentStep = getTimelineIndex(order.status);
  const isCancelled = ['cancelled', 'refunded', 'payment_failed'].includes(order.status);
  const isShipped = order.status === 'shipped' || order.status === 'delivered';
  const isLocalPickup = order.shipping_method === 'local_pickup' || order.status === 'ready_for_pickup';
  const trackingUrl = order.tracking_number ? getCarrierTrackingUrl(order.carrier, order.tracking_number) : null;

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

        {/* Cancelled / Refunded Banner */}
        {isCancelled && (
          <div className={`p-4 rounded-xl mb-8 border ${
            order.status === 'cancelled' ? 'bg-steel/10 border-steel text-silver' :
            order.status === 'refunded' ? 'bg-amber-900/10 border-amber-500/30 text-amber-400' :
            'bg-red-900/10 border-red-500/30 text-red-400'
          }`}>
            <p className="text-sm font-medium">
              {order.status === 'cancelled' && 'This order has been cancelled.'}
              {order.status === 'refunded' && 'A refund has been processed for this order. Please allow 5-10 business days.'}
              {order.status === 'payment_failed' && 'Payment failed for this order. Please contact us for assistance.'}
            </p>
          </div>
        )}

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
                      {step.key === 'shipped' && isLocalPickup ? 'Ready for Pickup' : step.label}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-electric bg-electric/10 px-2 py-0.5 rounded-full border border-electric/30">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-silver mt-4">
              Last updated: {new Date(order.updated_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>
        )}

        {/* Shipping / Tracking Card */}
        {(isShipped || isLocalPickup || order.tracking_number) && (
          <div className="card mb-8 border-electric/30">
            <div className="flex items-center gap-2 mb-4">
              {isLocalPickup ? (
                <MapPin className="w-5 h-5 text-electric" />
              ) : (
                <Truck className="w-5 h-5 text-electric" />
              )}
              <h2 className="font-display font-semibold text-pearl">
                {isLocalPickup ? 'Pickup Details' : 'Shipping Details'}
              </h2>
            </div>

            {isLocalPickup ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-midnight rounded-lg border border-steel">
                  <MapPin className="w-4 h-4 text-volt mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-pearl font-medium">Inspire PC</p>
                    <p className="text-xs text-silver">Girard, OH 44420</p>
                    <p className="text-xs text-silver mt-1">Call (330) 314-8860 to schedule pickup</p>
                  </div>
                </div>
              </div>
            ) : (
              <dl className="space-y-3">
                {order.carrier && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-silver">Carrier</dt>
                    <dd className="text-pearl font-medium uppercase">{order.carrier}</dd>
                  </div>
                )}
                {order.tracking_number && (
                  <div className="flex justify-between text-sm items-center">
                    <dt className="text-silver">Tracking Number</dt>
                    <dd className="text-electric font-mono font-medium">
                      {trackingUrl ? (
                        <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-volt transition-colors">
                          {order.tracking_number}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        order.tracking_number
                      )}
                    </dd>
                  </div>
                )}
                {order.estimated_delivery && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-silver">Estimated Delivery</dt>
                    <dd className="text-pearl font-medium">
                      {new Date(order.estimated_delivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </dd>
                  </div>
                )}
                {order.shipped_at && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-silver">Shipped On</dt>
                    <dd className="text-pearl">
                      {new Date(order.shipped_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </dd>
                  </div>
                )}
                {order.delivered_at && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-silver">Delivered On</dt>
                    <dd className="text-volt font-medium">
                      {new Date(order.delivered_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </dd>
                  </div>
                )}
                {trackingUrl && (
                  <div className="pt-2">
                    <a
                      href={trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center text-sm py-3 inline-flex items-center justify-center gap-2"
                    >
                      <Package className="w-4 h-4" />
                      <span>Track Your Package</span>
                    </a>
                  </div>
                )}
              </dl>
            )}
          </div>
        )}

        {/* Admin Note (if present) */}
        {order.admin_notes && (
          <div className="p-4 rounded-xl mb-8 bg-electric/5 border border-electric/20">
            <p className="text-xs text-electric font-semibold uppercase tracking-wider mb-1">Note from our team</p>
            <p className="text-sm text-pearl">{order.admin_notes}</p>
          </div>
        )}

        {/* Order Details */}
        <div className="card mb-8">
          <h2 className="font-display font-semibold text-pearl mb-4">Order Details</h2>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-silver">Service</dt>
              <dd className="text-pearl font-medium capitalize">{order.service}</dd>
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
                  <a href={order.pcpartpicker_url} target="_blank" rel="noopener noreferrer" className="text-electric hover:text-volt transition-colors inline-flex items-center gap-1">
                    View on PCPartPicker <ExternalLink className="w-3 h-3" />
                  </a>
                </dd>
              </div>
            )}
            {order.notes && (
              <div className="pt-2 border-t border-steel">
                <dt className="text-silver text-sm mb-1">Your Notes</dt>
                <dd className="text-pearl text-sm">{order.notes}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Status History */}
        {statusHistory.length > 0 && (
          <div className="card mb-8">
            <h2 className="font-display font-semibold text-pearl mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric" />
              Update History
            </h2>
            <div className="space-y-3">
              {statusHistory.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-electric mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-pearl font-medium capitalize">
                        {entry.new_status.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-silver">
                        {new Date(entry.created_at).toLocaleString('en-US', {
                          month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-silver text-xs mt-0.5">{entry.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
