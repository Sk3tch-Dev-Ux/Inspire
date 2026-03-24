'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Check,
  Wrench,
  Zap,
  HelpCircle
} from 'lucide-react'

const services = [
  {
    name: 'Standard Build',
    price: '$150',
    description: 'Complete PC assembly with professional cable management and testing.',
    icon: Wrench,
    turnaround: '3-5 business days',
    features: [
      'Full system assembly',
      'Professional cable management',
      'BIOS configuration',
      'Stress testing (2+ hours)',
      'OS installation (if license provided)',
      'Driver installation',
      'Build photos',
    ],
    popular: true,
  },
  {
    name: 'Express Build',
    price: '$300',
    description: 'Same great service with priority turnaround time.',
    icon: Zap,
    turnaround: '24-48 hours',
    features: [
      'Everything in Standard Build',
      'Priority turnaround',
      'Priority support',
      'Extended stress testing (4+ hours)',
      'Detailed benchmark report',
    ],
    popular: false,
  },
]

const addons = [
  { name: 'Budget Build Planning', price: '$49', note: 'Credited toward build service', desc: 'PC Part Picker list based on your budget' },
  { name: 'Component Upgrade', price: '$49', note: 'per component', desc: 'Swap CPU, GPU, storage, etc.' },
  { name: 'OS Installation Only', price: '$39', note: '', desc: 'Windows or Linux installation + drivers' },
  { name: 'Data Migration', price: '$39', note: '', desc: 'Transfer files from old PC' },
  { name: 'System Optimization', price: '$79', note: '', desc: 'Tune existing PC for performance' },
  { name: 'AIO Cooler Install', price: '$29', note: 'add-on', desc: 'Includes thermal paste application' },
]

const faqs = [
  {
    q: 'Do you sell PC parts or complete systems?',
    a: 'No, we are strictly a build service. You purchase your own parts and we assemble them for you. We can help you choose parts through our Budget Build Planning service.',
  },
  {
    q: 'How does Budget Build Planning work?',
    a: 'Tell us your budget and what you want to use the PC for. We\'ll create a custom parts list on PC Part Picker, showing you exactly what to buy and where. You purchase the parts directly from retailers—we don\'t mark anything up.',
  },
  {
    q: 'How do I get my parts to you?',
    a: 'You can ship them to our workshop or drop them off in person. We\'ll inspect everything on arrival and let you know if anything is missing or DOA.',
  },
  {
    q: 'What if a part arrives dead on arrival (DOA)?',
    a: 'We\'ll identify the issue during our testing phase and let you know. You\'ll need to handle the RMA with the retailer since you purchased the parts. We can help guide you through the process.',
  },
  {
    q: 'How long does a build take?',
    a: 'Standard builds are completed within 3-5 business days. Express builds are 24-48 hours.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'We offer a 30-day workmanship warranty covering any assembly-related issues. Component warranties are handled by the manufacturers since you purchased the parts.',
  },
  {
    q: 'Do you do custom water cooling?',
    a: 'We do not offer custom loop water cooling installation. However, we do install AIO (all-in-one) liquid coolers as an add-on service for $29.',
  },
]

export default function PricingContent() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-volt/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-pearl">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-silver text-lg">
              No hidden fees. No parts markup. Just honest pricing for expert PC assembly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative h-full flex flex-col ${
                  service.popular ? 'ring-2 ring-electric' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-electric to-volt text-midnight text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-electric" />
                </div>

                <h3 className="font-display text-2xl font-semibold mb-2 text-pearl">
                  {service.name}
                </h3>

                <p className="text-silver text-sm mb-2">
                  {service.description}
                </p>

                <p className="text-xs text-silver mb-6">
                  Turnaround: {service.turnaround}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-display font-bold gradient-text">
                    {service.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-pearl">
                      <Check className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/order"
                  className={service.popular ? 'btn-primary w-full text-center' : 'btn-secondary w-full text-center'}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Additional <span className="gradient-text">Services</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Enhance your build with these optional add-ons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-obsidian rounded-xl border border-steel hover:border-electric/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-semibold text-pearl">
                    {addon.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-xl font-bold gradient-text">{addon.price}</span>
                    {addon.note && (
                      <p className="text-xs text-silver">{addon.note}</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-silver">{addon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              What&apos;s <span className="gradient-text">Included</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Every build comes with these services at no extra charge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Parts Inspection', desc: 'We check every component on arrival for damage or defects.' },
              { title: 'Cable Management', desc: 'Clean, organized cables for optimal airflow and aesthetics.' },
              { title: 'BIOS Setup', desc: 'XMP/EXPO enabled, boot order configured, settings optimized.' },
              { title: 'Stress Testing', desc: 'CPU, GPU, and RAM tested under load to ensure stability.' },
              { title: 'Thermal Paste', desc: 'Quality thermal compound applied for optimal cooling.' },
              { title: 'Build Photos', desc: 'We send you photos of your completed build before shipping.' },
              { title: 'Packing & Shipping', desc: 'Carefully packed with GPU support for safe transport.' },
              { title: 'Post-Build Support', desc: 'Questions after your build? We\'re here to help.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-midnight rounded-xl border border-steel"
              >
                <h3 className="font-display font-semibold text-pearl mb-2">{item.title}</h3>
                <p className="text-sm text-silver">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-obsidian rounded-xl border border-steel"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-electric shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-pearl mb-2">{faq.q}</h3>
                    <p className="text-silver text-sm">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-obsidian relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-electric/20 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
              Book your build today or contact us if you have questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/order" className="btn-primary">
                Book Your Build
              </Link>
              <Link href="/services" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
