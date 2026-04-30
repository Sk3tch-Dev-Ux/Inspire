import Link from 'next/link'
import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

const footerLinks = {
  services: [
    { href: '/services/discord-bots', label: 'Discord Bots' },
    { href: '/services/discord-layouts', label: 'Discord Layouts' },
    { href: '/services/web', label: 'Websites & Web Apps' },
    { href: '/services/game-scripts', label: 'Game Scripts' },
  ],
  company: [
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ],
  getStarted: [
    { href: '/quote', label: 'Request a Quote' },
    { href: '/contact', label: 'Get in Touch' },
    { href: '/portfolio', label: 'See Recent Work' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-steel">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Logo size="md" />
            </Link>
            <p className="text-mute text-sm leading-relaxed mb-6">
              Discord bots, layouts, custom web apps, and game scripts —
              hand-built by a solo developer. Hourly rates with custom quotes
              for bigger projects.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@inspirepc.com" className="flex items-center gap-3 text-mute hover:text-flame transition-colors text-sm">
                <Mail className="w-4 h-4" />
                hello@inspirepc.com
              </a>
              <a href="https://discord.gg/inspire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-mute hover:text-flame transition-colors text-sm">
                <MessageSquare className="w-4 h-4" />
                Discord (fastest)
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-bone mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-mute hover:text-flame transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-bone mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-mute hover:text-flame transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started Links */}
          <div>
            <h4 className="font-display font-semibold text-bone mb-6">Get Started</h4>
            <ul className="space-y-3">
              {footerLinks.getStarted.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-mute hover:text-flame transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-steel flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-mute text-sm">
            © {new Date().getFullYear()} Inspire Development. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-mute hover:text-flame transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-mute hover:text-flame transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
