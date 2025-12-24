import Link from 'next/link'
import { Cpu, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/warranty', label: 'Warranty' },
  ],
  support: [
    { href: '/order', label: 'Build Your PC' },
    { href: '/warranty', label: 'Warranty Claims' },
    { href: '#', label: 'Support Center' },
    { href: '#', label: 'FAQs' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-steel">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                <Cpu className="w-5 h-5 text-midnight" />
              </div>
              <span className="font-display text-xl font-bold">Inspire</span>
            </Link>
            <p className="text-silver text-sm leading-relaxed mb-6">
              Premium custom-built computers crafted for performance, reliability, and your unique needs.
            </p>
            <div className="space-y-3">
              <a href="mailto:hello@inspire-pcs.com" className="flex items-center gap-3 text-silver hover:text-electric transition-colors text-sm">
                <Mail className="w-4 h-4" />
                hello@inspire-pcs.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-3 text-silver hover:text-electric transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (555) 123-4567
              </a>
              <div className="flex items-center gap-3 text-silver text-sm">
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver hover:text-electric transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-silver hover:text-electric transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Stay Updated</h4>
            <p className="text-silver text-sm mb-4">
              Get the latest news on builds, deals, and tech tips.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field text-sm"
              />
              <button type="submit" className="btn-primary w-full">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-steel flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-silver text-sm">
            © {new Date().getFullYear()} Inspire Custom PCs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-silver hover:text-electric transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-silver hover:text-electric transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
