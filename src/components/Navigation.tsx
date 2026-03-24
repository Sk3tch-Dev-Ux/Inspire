'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Cpu, ChevronRight } from 'lucide-react'

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-steel/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                <Cpu className="w-5 h-5 text-midnight" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric to-volt blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Inspire
            </span>
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

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
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
