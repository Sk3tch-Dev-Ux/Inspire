'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, X, MessageSquare, Mail, FileText } from 'lucide-react'

const actions = [
  {
    icon: MessageSquare,
    label: 'Discord (fastest)',
    href: 'https://discord.gg/inspire',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email Us',
    href: 'mailto:hello@inspirepc.com',
    external: true,
  },
  {
    icon: FileText,
    label: 'Request a Quote',
    href: '/quote',
    external: false,
  },
]

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === '/contact' || pathname === '/quote') return null

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Menu */}
      <div
        className={`absolute bottom-16 right-0 mb-2 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-carbon border border-steel rounded-2xl p-2 shadow-2xl shadow-black/50 min-w-[200px]">
          {actions.map((action) => {
            const content = (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-steel/40 transition-colors cursor-pointer">
                <action.icon className="w-4 h-4 text-flame" />
                <span className="text-sm text-bone font-medium">{action.label}</span>
              </div>
            )

            return action.external ? (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
              >
                {content}
              </a>
            ) : (
              <Link
                key={action.label}
                href={action.href}
                onClick={() => setIsOpen(false)}
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-steel/80 rotate-0'
            : 'bg-flame hover:shadow-flame/30 hover:shadow-xl'
        }`}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-bone" />
        ) : (
          <MessageCircle className="w-5 h-5 text-ink" />
        )}
      </button>
    </div>
  )
}
