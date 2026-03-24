'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Shield, 
  Check, 
  X, 
  HelpCircle,
  ChevronRight,
  Mail,
  MessageSquare
} from 'lucide-react'

const covered = [
  'Assembly defects or errors',
  'Cable management issues',
  'Improper component seating',
  'Thermal paste application problems',
  'BIOS configuration errors',
  'POST/boot issues caused by our assembly',
  'Damage during our handling of parts',
]

const notCovered = [
  'Defective components (manufacturer warranty)',
  'Physical damage after delivery',
  'Software issues or viruses',
  'Overclocking damage',
  'Modifications made after delivery',
  'Normal wear and tear',
  'Damage from power surges or outages',
]

const faqs = [
  {
    q: 'What does the workmanship warranty cover?',
    a: 'Our warranty covers any issues that arise from our assembly work. If a component isn\'t seated properly, cables are connected incorrectly, or there\'s any other problem with how we built your PC, we\'ll fix it at no charge.',
  },
  {
    q: 'What about component warranties?',
    a: 'Since you purchase the parts yourself, component warranties are handled directly with the manufacturers or retailers. We can help guide you through the RMA process if needed.',
  },
  {
    q: 'How do I make a warranty claim?',
    a: 'Contact us via email or phone with a description of the issue. We\'ll troubleshoot with you and determine if it\'s covered. If so, we\'ll arrange for you to ship the PC back or schedule a local drop-off.',
  },
  {
    q: 'Do I have to pay for shipping for warranty service?',
    a: 'If the issue is covered under our workmanship warranty, we\'ll cover the cost of return shipping. You\'re responsible for shipping the PC to us.',
  },
  {
    q: 'What if a part is DOA (Dead on Arrival)?',
    a: 'We test all components during the build process. If we discover a DOA part, we\'ll notify you immediately so you can arrange an RMA with the retailer. This is not covered by our workmanship warranty since it\'s a manufacturer defect.',
  },
  {
    q: 'Can I extend the warranty?',
    a: 'Yes! Our standard 30-day warranty can be extended to 90 days for an additional $29, or to 1 year for $79. Extended warranties must be purchased at the time of your build order.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function WarrantyPage() {
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
            <h1 className="section-title mb-6">
              Workmanship <span className="gradient-text">Warranty</span>
            </h1>
            <p className="section-subtitle">
              Every build is backed by our commitment to quality. If we made a mistake, we&apos;ll make it right.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Warranty Tiers */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Warranty <span className="gradient-text">Options</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Choose the coverage that&apos;s right for you.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Standard',
                duration: '30 Days',
                price: 'Included',
                features: [
                  'Assembly defect coverage',
                  'Email support',
                  'Free repair labor',
                ],
                popular: false,
              },
              {
                name: 'Extended',
                duration: '90 Days',
                price: '+$29',
                features: [
                  'Everything in Standard',
                  'Priority support',
                  'Extended coverage period',
                ],
                popular: true,
              },
              {
                name: 'Premium',
                duration: '1 Year',
                price: '+$79',
                features: [
                  'Everything in Extended',
                  'Phone support',
                  'Expedited repairs',
                  'One free system checkup',
                ],
                popular: false,
              },
            ].map((tier) => (
              <motion.div
                key={tier.name}
                variants={itemVariants}
                className={`card relative h-full flex flex-col ${
                  tier.popular ? 'ring-2 ring-electric' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-electric to-volt text-midnight text-sm font-semibold rounded-full">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <Shield className="w-12 h-12 text-electric mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-semibold mb-1">{tier.name}</h3>
                  <p className="text-3xl font-bold gradient-text">{tier.duration}</p>
                  <p className="text-silver">{tier.price}</p>
                </div>

                <ul className="space-y-3 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-pearl">
                      <Check className="w-5 h-5 text-volt shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coverage Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              What&apos;s <span className="gradient-text">Covered</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-obsidian rounded-xl border border-volt/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-volt/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-volt" />
                </div>
                <h3 className="font-display text-xl font-semibold text-pearl">Covered</h3>
              </div>
              <ul className="space-y-3">
                {covered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-silver">
                    <Check className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 bg-obsidian rounded-xl border border-coral/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-coral" />
                </div>
                <h3 className="font-display text-xl font-semibold text-pearl">Not Covered</h3>
              </div>
              <ul className="space-y-3">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-silver">
                    <X className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Warranty <span className="gradient-text">Claim Process</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Simple steps to get your issue resolved.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Contact Us', desc: 'Email or call us with a description of the issue.' },
              { step: '02', title: 'Troubleshoot', desc: 'We\'ll work with you to diagnose the problem.' },
              { step: '03', title: 'Ship or Drop Off', desc: 'Send the PC to us or bring it to our workshop.' },
              { step: '04', title: 'Repair & Return', desc: 'We\'ll fix the issue and ship it back to you.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-display font-bold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-silver text-sm">
                  {item.desc}
                </p>
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
            <h2 className="section-title mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={itemVariants}
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
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title mb-4">
              Need to File a <span className="gradient-text">Claim</span>?
            </h2>
            <p className="section-subtitle mx-auto">
              Contact us and we&apos;ll get you sorted out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.a
              href="mailto:support@inspirepc.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-midnight rounded-xl border border-steel hover:border-electric/50 transition-colors flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center">
                <Mail className="w-6 h-6 text-electric" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-pearl">Email Support</h3>
                <p className="text-silver text-sm">support@inspirepc.com</p>
              </div>
            </motion.a>

            <motion.a
              href="tel:+13303148860"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-midnight rounded-xl border border-steel hover:border-electric/50 transition-colors flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-volt/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-volt" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-pearl">Phone Support</h3>
                <p className="text-silver text-sm">(330) 314-8860</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
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
            <h2 className="section-title mb-6">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="section-subtitle mx-auto mb-10">
              Every build comes with our 30-day workmanship warranty included.
            </p>
            <Link href="/order" className="btn-primary inline-flex items-center gap-2">
              Book Your Build
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
