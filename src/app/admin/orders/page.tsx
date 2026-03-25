'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Search,
  ChevronDown,
  ChevronUp,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

interface Order {
  id: string
  order_id: string
  service: string
  addons: string[]
  has_own_parts: boolean
  budget_range: string
  use_case: string
  pcpartpicker_url: string
  parts_list: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  notes: string
  status: string
  stripe_session_id: string
  stripe_payment_intent_id: string
  total_cents: number
  created_at: string
  updated_at: string
}

const STATUSES = ['all', 'pending', 'awaiting_payment', 'paid', 'confirmed', 'in_progress', 'completed', 'shipped', 'cancelled', 'refunded', 'payment_failed']
const UPDATABLE_STATUSES = ['pending', 'awaiting_payment', 'paid', 'confirmed', 'in_progress', 'completed', 'shipped', 'cancelled']

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  awaiting_payment: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  paid: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  confirmed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  in_progress: 'bg-electric/20 text-electric border-electric/30',
  completed: 'bg-volt/20 text-volt border-volt/30',
  shipped: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-steel/30 text-silver border-steel',
  refunded: 'bg-coral/20 text-coral border-coral/30',
  payment_failed: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function StatusBadge({ status }: { status: string }) {
  const colors = statusColors[status] || 'bg-steel/30 text-silver border-steel'
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full border ${colors}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '25' })
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (search) params.set('search', search)

      const res = await fetch(`/api/admin/orders?${params}`)
      const data = await res.json()
      setOrders(data.orders || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, search])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearch(searchInput)
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o))
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-pearl mb-8">Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-[250px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-silver" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, email, or order ID..."
              className="input-field w-full pl-10"
            />
          </div>
          <button type="submit" className="btn-secondary px-4">Search</button>
        </form>

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="input-field"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 text-electric animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-obsidian rounded-xl border border-steel p-12 text-center text-silver">
          No orders found.
        </div>
      ) : (
        <div className="bg-obsidian rounded-xl border border-steel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-steel text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Service</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-xs font-semibold text-silver uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel">
                {orders.map((order) => (
                  <OrderRow
                    key={order.order_id}
                    order={order}
                    expanded={expandedOrder === order.order_id}
                    onToggle={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
                    onUpdateStatus={updateStatus}
                    updating={updatingStatus === order.order_id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-steel/30 text-silver hover:text-pearl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-silver">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-steel/30 text-silver hover:text-pearl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

function OrderRow({
  order,
  expanded,
  onToggle,
  onUpdateStatus,
  updating,
}: {
  order: Order
  expanded: boolean
  onToggle: () => void
  onUpdateStatus: (id: string, status: string) => void
  updating: boolean
}) {
  return (
    <>
      <tr className="hover:bg-steel/10 transition-colors cursor-pointer" onClick={onToggle}>
        <td className="px-4 py-3 text-sm font-mono text-electric">{order.order_id}</td>
        <td className="px-4 py-3">
          <div className="text-sm text-pearl">{order.name}</div>
          <div className="text-xs text-silver">{order.email}</div>
        </td>
        <td className="px-4 py-3 text-sm text-pearl capitalize">{order.service}</td>
        <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
        <td className="px-4 py-3 text-sm text-pearl">
          {order.total_cents ? `$${(order.total_cents / 100).toFixed(2)}` : '—'}
        </td>
        <td className="px-4 py-3 text-sm text-silver">
          {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </td>
        <td className="px-4 py-3">
          {expanded ? <ChevronUp className="w-4 h-4 text-silver" /> : <ChevronDown className="w-4 h-4 text-silver" />}
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={7} className="px-6 py-6 bg-midnight/50">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Details */}
              <div>
                <h4 className="text-xs font-semibold text-silver uppercase tracking-wider mb-3">Customer Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-silver">Name:</span> <span className="text-pearl">{order.name}</span></div>
                  <div><span className="text-silver">Email:</span> <span className="text-pearl">{order.email}</span></div>
                  <div><span className="text-silver">Phone:</span> <span className="text-pearl">{order.phone || '—'}</span></div>
                  {order.address && (
                    <div><span className="text-silver">Address:</span> <span className="text-pearl">{order.address}, {order.city}, {order.state} {order.zip}</span></div>
                  )}
                </div>
              </div>

              {/* Build Details */}
              <div>
                <h4 className="text-xs font-semibold text-silver uppercase tracking-wider mb-3">Build Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-silver">Service:</span> <span className="text-pearl capitalize">{order.service}</span></div>
                  <div><span className="text-silver">Has Own Parts:</span> <span className="text-pearl">{order.has_own_parts ? 'Yes' : 'No'}</span></div>
                  {order.budget_range && <div><span className="text-silver">Budget:</span> <span className="text-pearl">{order.budget_range}</span></div>}
                  {order.use_case && <div><span className="text-silver">Use Case:</span> <span className="text-pearl">{order.use_case}</span></div>}
                  {order.pcpartpicker_url && (
                    <div>
                      <span className="text-silver">PCPartPicker:</span>{' '}
                      <a href={order.pcpartpicker_url} target="_blank" rel="noopener noreferrer" className="text-electric hover:text-volt inline-flex items-center gap-1">
                        View List <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  {order.addons && Array.isArray(order.addons) && order.addons.length > 0 && (
                    <div><span className="text-silver">Add-ons:</span> <span className="text-pearl">{order.addons.join(', ')}</span></div>
                  )}
                </div>
              </div>

              {/* Parts List */}
              {order.parts_list && (
                <div className="md:col-span-2">
                  <h4 className="text-xs font-semibold text-silver uppercase tracking-wider mb-2">Parts List</h4>
                  <pre className="text-sm text-pearl bg-obsidian p-4 rounded-lg border border-steel whitespace-pre-wrap">{order.parts_list}</pre>
                </div>
              )}

              {/* Notes */}
              {order.notes && (
                <div className="md:col-span-2">
                  <h4 className="text-xs font-semibold text-silver uppercase tracking-wider mb-2">Notes</h4>
                  <p className="text-sm text-pearl bg-obsidian p-4 rounded-lg border border-steel">{order.notes}</p>
                </div>
              )}

              {/* Status Update */}
              <div className="md:col-span-2 flex items-center gap-4 pt-4 border-t border-steel">
                <span className="text-sm text-silver">Update Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.order_id, e.target.value)}
                  disabled={updating}
                  className="input-field text-sm"
                >
                  {UPDATABLE_STATUSES.map(s => (
                    <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                  ))}
                </select>
                {updating && <Loader2 className="w-4 h-4 text-electric animate-spin" />}

                {order.stripe_session_id && (
                  <span className="text-xs text-silver ml-auto">
                    Stripe: {order.stripe_session_id.slice(0, 20)}...
                  </span>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
