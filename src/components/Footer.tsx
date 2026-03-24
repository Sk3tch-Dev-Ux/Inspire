import Link from 'next/link'
import { Cpu, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  services: [
    { href: '/services', label: 'PC Building' },
    { href: '/troubleshooting', label: 'Troubleshooting & Repair' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/gallery', label: 'Build Gallery' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/warranty', label: 'Warranty' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/pricing#faq', label: 'FAQs' },
  ],
  getStarted: [
    { href: '/order', label: 'Book a Build' },
    { href: '/troubleshooting', label: 'Get PC Help' },
    { href: '/contact', label: 'Request a Quote' },
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
              Professional PC building, troubleshooting, diagnostics, and upgrade services. Your parts, our expertise.
            </p>
            <div className="space-y-3">
              <a href="mailto:support@inspirepc.com" className="flex items-center gap-3 text-silver hover:text-electric transition-colors text-sm">
                <Mail className="w-4 h-4" />
                support@inspirepc.com
              </a>
              <a href="tel:+13303148860" className="flex items-center gap-3 text-silver hover:text-electric transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (330) 314-8860
              </a>
              <div className="flex items-center gap-3 text-silver text-sm">
                <MapPin className="w-4 h-4" />
                Girard, OH 44420
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
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

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
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

          {/* Get Started Links */}
          <div>
            <h4 className="font-display font-semibold text-pearl mb-6">Get Started</h4>
            <ul className="space-y-3">
              {footerLinks.getStarted.map((link) => (
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
