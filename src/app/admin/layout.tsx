'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, ChevronLeft } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/contacts', label: 'Contacts', icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't wrap login page in admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Sidebar */}
      <aside className="w-64 bg-obsidian border-r border-steel flex flex-col shrink-0">
        <div className="p-6 border-b border-steel">
          <h1 className="font-display font-bold text-lg text-pearl">Inspire Admin</h1>
          <p className="text-xs text-silver mt-1">Management Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-electric/10 text-electric border border-electric/30'
                    : 'text-silver hover:text-pearl hover:bg-steel/30'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-steel space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-silver hover:text-pearl hover:bg-steel/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-silver hover:text-red-400 hover:bg-red-950/30 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
