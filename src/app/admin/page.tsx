'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart,
  DollarSign,
  MessageSquare,
  Clock,
  ChevronRight,
  Loader2,
} from 'lucide-react'

interface Stats {
  orders: {
    total: number
    revenue: number
    byStatus: Record<string, number>
  }
  contacts: {
    total: number
    unread: number
  }
  recentOrders: Array<{
    order_id: string
    name: string
    email: string
    service: string
    status: string
    total_cents: number
    created_at: string
  }>
  recentContacts: Array<{
    id: string
    name: string
    email: string
    subject: string
    created_at: string
    read_at: string | null
  }>
}

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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-electric animate-spin" />
      </div>
    )
  }

  if (!stats) {
    return <div className="text-red-400">Failed to load dashboard data.</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-pearl mb-8">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-obsidian rounded-xl border border-steel">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-electric" />
            </div>
            <span className="text-sm text-silver">Total Orders</span>
          </div>
          <div className="text-3xl font-display font-bold text-pearl">{stats.orders.total}</div>
        </div>

        <div className="p-6 bg-obsidian rounded-xl border border-steel">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-volt/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-volt" />
            </div>
            <span className="text-sm text-silver">Revenue</span>
          </div>
          <div className="text-3xl font-display font-bold text-pearl">
            ${(stats.orders.revenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="p-6 bg-obsidian rounded-xl border border-steel">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm text-silver">Pending Orders</span>
          </div>
          <div className="text-3xl font-display font-bold text-pearl">
            {(stats.orders.byStatus['pending'] || 0) + (stats.orders.byStatus['awaiting_payment'] || 0)}
          </div>
        </div>

        <div className="p-6 bg-obsidian rounded-xl border border-steel">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-coral" />
            </div>
            <span className="text-sm text-silver">Unread Messages</span>
          </div>
          <div className="text-3xl font-display font-bold text-pearl">{stats.contacts.unread}</div>
        </div>
      </div>

      {/* Status Breakdown */}
      {Object.keys(stats.orders.byStatus).length > 0 && (
        <div className="p-6 bg-obsidian rounded-xl border border-steel mb-10">
          <h2 className="font-display font-semibold text-pearl mb-4">Orders by Status</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.orders.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <StatusBadge status={status} />
                <span className="text-sm text-silver font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-obsidian rounded-xl border border-steel overflow-hidden">
          <div className="p-4 border-b border-steel flex items-center justify-between">
            <h2 className="font-display font-semibold text-pearl">Recent Orders</h2>
            <Link href="/admin/orders" className="text-electric text-sm flex items-center gap-1 hover:text-volt transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-steel">
            {stats.recentOrders.length === 0 ? (
              <div className="p-6 text-center text-silver">No orders yet</div>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.order_id} className="p-4 hover:bg-steel/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono text-electric">{order.order_id}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-pearl">{order.name}</span>
                    <span className="text-sm text-silver">
                      {order.total_cents ? `$${(order.total_cents / 100).toFixed(2)}` : '—'}
                    </span>
                  </div>
                  <div className="text-xs text-silver mt-1">
                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-obsidian rounded-xl border border-steel overflow-hidden">
          <div className="p-4 border-b border-steel flex items-center justify-between">
            <h2 className="font-display font-semibold text-pearl">Recent Messages</h2>
            <Link href="/admin/contacts" className="text-electric text-sm flex items-center gap-1 hover:text-volt transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-steel">
            {stats.recentContacts.length === 0 ? (
              <div className="p-6 text-center text-silver">No messages yet</div>
            ) : (
              stats.recentContacts.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-steel/10 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-pearl font-medium">
                      {!contact.read_at && <span className="inline-block w-2 h-2 rounded-full bg-electric mr-2" />}
                      {contact.name}
                    </span>
                    <span className="text-xs text-silver">
                      {new Date(contact.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="text-sm text-silver truncate">{contact.subject}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
