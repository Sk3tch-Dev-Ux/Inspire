'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, User, LogOut, Package, Settings } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from './AuthProvider'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/troubleshooting', label: 'Repairs' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, loading, logout } = useAuth()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-steel/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 text-sm font-medium text-silver hover:text-pearl transition-colors rounded-lg hover:bg-steel/30"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="Account menu"
                  aria-expanded={showUserMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-steel/30 transition-colors"
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={`${user.name || 'User'} avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                      <span className="text-xs font-bold text-midnight">
                        {(user.name || user.email)[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-sm text-pearl font-medium max-w-[120px] truncate">
                    {user.name || 'Account'}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-obsidian border border-steel rounded-xl shadow-2xl shadow-black/50 py-2 z-50">
                    <Link
                      href="/account"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-silver hover:text-pearl hover:bg-steel/30 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-silver hover:text-pearl hover:bg-steel/30 transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      Orders
                    </Link>
                    <Link
                      href="/account/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-silver hover:text-pearl hover:bg-steel/30 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <div className="border-t border-steel my-1" />
                    <button
                      onClick={() => { setShowUserMenu(false); logout(); }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-coral hover:bg-steel/30 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : !loading ? (
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-medium text-silver hover:text-pearl transition-colors rounded-lg hover:bg-steel/30"
              >
                Sign In
              </Link>
            ) : null}

            <Link href="/order" className="btn-primary">
              <span className="flex items-center gap-2">
                Build Your PC
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            className="md:hidden p-2 rounded-lg hover:bg-steel/30 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-pearl" />
            ) : (
              <Menu className="w-6 h-6 text-pearl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian border-b border-steel"
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-silver hover:text-pearl hover:bg-steel/30 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {!loading && user ? (
                <>
                  <div className="border-t border-steel my-2" />
                  <Link
                    href="/account"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-silver hover:text-pearl hover:bg-steel/30 rounded-lg transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-silver hover:text-pearl hover:bg-steel/30 rounded-lg transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => { setIsOpen(false); logout(); }}
                    className="block w-full text-left px-4 py-3 text-coral hover:bg-steel/30 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : !loading ? (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-electric hover:text-volt hover:bg-steel/30 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              ) : null}

              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="block w-full btn-primary mt-4 text-center"
              >
                <span>Build Your PC</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
