const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-amber', bg: 'bg-amber/10 border-amber/30' },
  awaiting_payment: { label: 'Awaiting Payment', color: 'text-amber', bg: 'bg-amber/10 border-amber/30' },
  paid: { label: 'Paid', color: 'text-electric', bg: 'bg-electric/10 border-electric/30' },
  confirmed: { label: 'Confirmed', color: 'text-electric', bg: 'bg-electric/10 border-electric/30' },
  in_progress: { label: 'In Progress', color: 'text-volt', bg: 'bg-volt/10 border-volt/30' },
  completed: { label: 'Completed', color: 'text-volt', bg: 'bg-volt/10 border-volt/30' },
  shipped: { label: 'Shipped', color: 'text-volt', bg: 'bg-volt/10 border-volt/30' },
  delivered: { label: 'Delivered', color: 'text-volt', bg: 'bg-volt/10 border-volt/30' },
  ready_for_pickup: { label: 'Ready for Pickup', color: 'text-electric', bg: 'bg-electric/10 border-electric/30' },
  cancelled: { label: 'Cancelled', color: 'text-coral', bg: 'bg-coral/10 border-coral/30' },
  refunded: { label: 'Refunded', color: 'text-coral', bg: 'bg-coral/10 border-coral/30' },
  payment_failed: { label: 'Payment Failed', color: 'text-coral', bg: 'bg-coral/10 border-coral/30' },
}

export default function OrderStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, color: 'text-silver', bg: 'bg-steel/10 border-steel/30' }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  )
}
