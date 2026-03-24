'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Wrench,
  Heart,
  Shield,
  Users,
  ChevronRight
} from 'lucide-react'

const stats = [
  { value: '500+', label: 'PCs Built' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '5+', label: 'Years Experience' },
  { value: '48hr', label: 'Avg. Turnaround' },
]

const values = [
  {
    icon: Wrench,
    title: 'Craftsmanship',
    description: 'Every build receives the same attention to detail, whether it\'s a budget rig or a high-end workstation.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We\'re PC enthusiasts first. Building computers isn\'t just our job—it\'s what we love doing.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    description: 'No upselling, no parts markup. We give honest recommendations and transparent pricing.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We\'re here to help, whether you\'re a first-time builder or a seasoned enthusiast.',
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

export default function AboutContent() {
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
              About <span className="gradient-text">Inspire</span>
            </h1>
            <p className="section-subtitle">
              We&apos;re a small team of PC enthusiasts who believe everyone deserves a professionally built computer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-silver">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-silver">
                <p>
                  Inspire started with a simple observation: too many people were paying premium prices for prebuilt PCs with subpar components, or struggling through their first build alone without proper guidance.
                </p>
                <p>
                  We saw an opportunity to do things differently. Instead of selling marked-up systems, we focused on what we do best—building. You choose the parts (or let us help you pick them), and we handle the assembly with the care and expertise every build deserves.
                </p>
                <p>
                  Our model is transparent: you buy parts directly from retailers at the best prices, and you pay us a fair fee for our labor and expertise. No hidden markups, no compromises on quality.
                </p>
                <p>
                  Today, we&apos;ve built hundreds of systems for gamers, creators, professionals, and everyday users. Each one gets the same attention to detail—because that&apos;s what we&apos;d want for our own rigs.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="gradient-border"
            >
              <div className="bg-obsidian p-8 rounded-xl">
                <h3 className="text-2xl font-display font-semibold mb-6">Why We&apos;re Different</h3>
                <ul className="space-y-4">
                  {[
                    'We don\'t sell parts—you buy directly from retailers',
                    'No markup on components, ever',
                    'Transparent, flat-rate service fees',
                    'We help you plan builds for any budget',
                    'PC Part Picker integration for real pricing',
                    'Workmanship warranty on every build',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-volt mt-2 shrink-0" />
                      <span className="text-pearl">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="section-subtitle mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="card group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                  <value.icon className="w-7 h-7 text-electric" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {value.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-xl text-silver leading-relaxed">
              To make professional PC building accessible to everyone. Whether you&apos;re on a tight budget or building your dream machine, you deserve expert assembly, honest advice, and a PC that&apos;s built to last.
            </p>
          </motion.div>
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
            <h2 className="section-title mb-6">
              Ready to Work <span className="gradient-text">Together</span>?
            </h2>
            <p className="section-subtitle mx-auto mb-10">
              Let&apos;s build something great.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/order" className="btn-primary">
                <span className="flex items-center gap-2">
                  Book Your Build
                  <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
