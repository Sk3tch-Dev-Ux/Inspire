'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Wrench, 
  Zap, 
  Shield, 
  CheckCircle, 
  ChevronRight, 
  Monitor,
  Gamepad2,
  Briefcase,
  Palette,
  Package,
  ListChecks,
  ExternalLink
} from 'lucide-react'

const processSteps = [
  {
    icon: ListChecks,
    title: '1. Plan Your Build',
    description: 'Choose your parts yourself, or let us create a PC Part Picker list based on your budget.',
  },
  {
    icon: Package,
    title: '2. Send Your Parts',
    description: 'Ship your components to us or drop them off at our workshop.',
  },
  {
    icon: Wrench,
    title: '3. We Build It',
    description: 'Expert assembly with meticulous cable management and thorough testing.',
  },
  {
    icon: Zap,
    title: '4. Ready to Go',
    description: 'Pick up your completed build or have it shipped directly to you.',
  },
]

const useCases = [
  {
    icon: Gamepad2,
    title: 'Gaming',
    description: 'From budget 1080p builds to 4K powerhouses.',
  },
  {
    icon: Briefcase,
    title: 'Workstation',
    description: 'Professional systems for demanding workflows.',
  },
  {
    icon: Palette,
    title: 'Content Creation',
    description: 'Optimized for editing, rendering, and streaming.',
  },
  {
    icon: Monitor,
    title: 'Home & Office',
    description: 'Reliable everyday computers built to last.',
  },
]

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-volt/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-midnight)_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-steel/50 border border-steel mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-volt animate-pulse" />
              <span className="text-sm text-silver">Professional PC Assembly Service</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-pearl">
              Your Parts, Our{' '}
              <span className="gradient-text">Expertise</span>
            </h1>

            <p className="text-lg md:text-xl text-silver mb-10 max-w-2xl">
              You choose and buy the components. We build it right. Professional PC assembly with meticulous cable management, thorough testing, and expert craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/order" className="btn-primary">
                <span className="flex items-center gap-2">
                  Book Your Build
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View Services
              </Link>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-steel/50 to-obsidian border border-steel overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-volt/10" />
                <div className="absolute top-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <p className="text-xs text-silver">Build Service</p>
                      <p className="font-display font-semibold text-pearl">What We Do</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-volt" />
                      <span className="text-pearl">Expert Assembly</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-volt" />
                      <span className="text-pearl">Cable Management</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-volt" />
                      <span className="text-pearl">Stress Testing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-volt" />
                      <span className="text-pearl">OS Installation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-volt" />
                      <span className="text-pearl">BIOS Configuration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              A simple process to get your PC built by professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                  <step.icon className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                  {step.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Planning Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
                Not Sure What Parts to <span className="gradient-text">Buy?</span>
              </h2>
              <p className="text-silver text-lg mb-6">
                Tell us your budget and what you want to do with your PC. We&apos;ll create a custom parts list on PC Part Picker so you can see exactly what your build will cost before you buy anything.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Personalized parts recommendations',
                  'Guaranteed compatibility',
                  'Transparent pricing via PC Part Picker',
                  'No obligation to use our build service',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-pearl">
                    <CheckCircle className="w-5 h-5 text-volt shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                Learn About Budget Builds
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="gradient-border"
            >
              <div className="bg-obsidian p-8 rounded-xl">
                <h3 className="text-2xl font-display font-semibold mb-6 text-pearl">Example Budget Ranges</h3>
                <div className="space-y-4">
                  {[
                    { budget: '$800 - $1,000', use: 'Entry Gaming / Everyday', fps: '1080p 60+ FPS' },
                    { budget: '$1,200 - $1,500', use: 'Mid-Range Gaming', fps: '1440p 60+ FPS' },
                    { budget: '$2,000 - $2,500', use: 'High-End Gaming / Streaming', fps: '1440p 144+ FPS' },
                    { budget: '$3,000+', use: 'Enthusiast / Workstation', fps: '4K Gaming / Pro Apps' },
                  ].map((tier) => (
                    <div key={tier.budget} className="flex justify-between items-center p-4 bg-steel/30 rounded-lg">
                      <div>
                        <p className="font-semibold text-pearl">{tier.budget}</p>
                        <p className="text-sm text-silver">{tier.use}</p>
                      </div>
                      <span className="text-electric text-sm">{tier.fps}</span>
                    </div>
                  ))}
                </div>
                <p className="text-silver text-sm mt-4 text-center">
                  * Prices are for parts only. Build service fee is separate.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              We Build for Every <span className="gradient-text">Purpose</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Whatever your use case, we have the expertise to assemble it perfectly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-opacity">
                  <useCase.icon className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-pearl">
                  {useCase.title}
                </h3>
                <p className="text-silver text-sm">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Why Choose <span className="gradient-text">Inspire</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              We&apos;re not just builders—we&apos;re enthusiasts who care about every detail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Wrench,
                title: 'Expert Assembly',
                description: 'Years of experience building everything from budget rigs to high-end enthusiast systems.',
              },
              {
                icon: Shield,
                title: 'Workmanship Warranty',
                description: 'Our builds are backed by a warranty covering any assembly-related issues.',
              },
              {
                icon: Zap,
                title: 'Thorough Testing',
                description: 'Every build is stress-tested and benchmarked before it leaves our workshop.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                  {feature.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
              Ready to Get Your PC <span className="gradient-text">Built Right</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
              Whether you have your parts ready or need help planning your build, we&apos;re here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/order" className="btn-primary">
                <span className="flex items-center gap-2">
                  Book Your Build
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
