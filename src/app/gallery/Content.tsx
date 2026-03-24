// NOTE: Placeholder images can be replaced with real build photos by:
// 1. Adding image files to /public/gallery/ (e.g., build-1.jpg, build-2.jpg)
// 2. Updating the builds array below with actual image paths
// 3. Replacing the gradient placeholder divs with <Image> component from next/image
// Example: src="/gallery/build-1.jpg" alt="Shadow Gaming Rig"

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import {
  Monitor,
  Cpu,
  Gamepad2,
  Zap,
  TrendingUp,
  ArrowRight,
  Award,
  Clock,
  Smile,
} from 'lucide-react'

type BuildCategory = 'All' | 'Gaming' | 'Workstation' | 'Content Creation' | 'Budget'

interface Build {
  id: number
  name: string
  category: Exclude<BuildCategory, 'All'>
  specs: string
  note: string
  icon: React.ReactNode
  gradientFrom: string
  gradientTo: string
}

const builds: Build[] = [
  {
    id: 1,
    name: 'Shadow Gaming Rig',
    category: 'Gaming',
    specs: 'Ryzen 7 7800X3D • RTX 4070 Ti • 32GB DDR5',
    note: 'Premium cable management with custom PSU extensions',
    icon: <Gamepad2 className="w-12 h-12" />,
    gradientFrom: 'from-electric',
    gradientTo: 'to-volt',
  },
  {
    id: 2,
    name: 'Creator Workstation Pro',
    category: 'Content Creation',
    specs: 'Intel i9-14900K • RTX 6000 Ada • 192GB DDR5',
    note: 'Optimized for 4K video rendering and 3D modeling',
    icon: <Monitor className="w-12 h-12" />,
    gradientFrom: 'from-volt',
    gradientTo: 'to-electric',
  },
  {
    id: 3,
    name: 'Budget Beast 1080p',
    category: 'Budget',
    specs: 'Ryzen 5 5600X • RTX 4060 • 16GB DDR4',
    note: 'Great 1080p gaming on a tight budget',
    icon: <Zap className="w-12 h-12" />,
    gradientFrom: 'from-electric',
    gradientTo: 'to-amber',
  },
  {
    id: 4,
    name: 'Ultra Workstation',
    category: 'Workstation',
    specs: 'Intel Xeon W9 • 512GB DDR5 ECC • RTX 5880',
    note: 'Enterprise-grade build with liquid cooling solution',
    icon: <Cpu className="w-12 h-12" />,
    gradientFrom: 'from-volt',
    gradientTo: 'to-coral',
  },
  {
    id: 5,
    name: 'Competitive FPS Beast',
    category: 'Gaming',
    specs: 'Ryzen 9 7950X3D • RTX 4090 • 32GB DDR5',
    note: '360+ FPS capable with custom watercooling',
    icon: <Gamepad2 className="w-12 h-12" />,
    gradientFrom: 'from-coral',
    gradientTo: 'to-electric',
  },
  {
    id: 6,
    name: 'Studio Streaming Setup',
    category: 'Content Creation',
    specs: 'AMD Ryzen 7 7700X • RTX 4080 • 64GB DDR5',
    note: 'Built for streaming with dual-GPU support',
    icon: <Monitor className="w-12 h-12" />,
    gradientFrom: 'from-amber',
    gradientTo: 'to-volt',
  },
  {
    id: 7,
    name: 'Office Workstation',
    category: 'Workstation',
    specs: 'Intel i7-14700 • Radeon Pro W6800 • 32GB DDR5',
    note: 'Silent, efficient, and perfect for professional work',
    icon: <Cpu className="w-12 h-12" />,
    gradientFrom: 'from-electric',
    gradientTo: 'to-coral',
  },
  {
    id: 8,
    name: 'Budget Content Maker',
    category: 'Budget',
    specs: 'Ryzen 5 7600X • RTX 4070 • 32GB DDR5',
    note: 'Solid all-rounder for content creators on a budget',
    icon: <Zap className="w-12 h-12" />,
    gradientFrom: 'from-volt',
    gradientTo: 'to-amber',
  },
  {
    id: 9,
    name: 'High-End Gaming Monster',
    category: 'Gaming',
    specs: 'Intel i9-14900KS • RTX 4090 Ti • 64GB DDR5',
    note: 'Maximum performance with custom RGB lighting',
    icon: <Gamepad2 className="w-12 h-12" />,
    gradientFrom: 'from-coral',
    gradientTo: 'to-volt',
  },
  {
    id: 10,
    name: 'Compact Content Station',
    category: 'Content Creation',
    specs: 'AMD Ryzen 7 7700 • RTX 4060 Ti • 32GB DDR5',
    note: 'Powerful yet compact, perfect for small studios',
    icon: <Monitor className="w-12 h-12" />,
    gradientFrom: 'from-electric',
    gradientTo: 'to-volt',
  },
]

const categories: BuildCategory[] = ['All', 'Gaming', 'Workstation', 'Content Creation', 'Budget']

const stats = [
  { label: '200+', description: 'Builds Completed' },
  { label: '99%', description: 'Satisfaction Rate' },
  { label: '5+', description: 'Years Experience' },
]

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<BuildCategory>('All')

  const filteredBuilds =
    activeCategory === 'All'
      ? builds
      : builds.filter((build) => build.category === activeCategory)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-electric/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-volt/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-pearl">
              Our <span className="gradient-text">Build Gallery</span>
            </h1>
            <p className="text-silver text-lg">
              Explore our portfolio of custom PC builds. From high-end gaming rigs to professional workstations,
              we bring your vision to life with expert craftsmanship and attention to detail.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-obsidian sticky top-20 z-10 border-b border-steel">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-electric to-volt text-midnight font-semibold'
                    : 'bg-steel/30 text-pearl hover:bg-steel/50 border border-steel'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBuilds.map((build, index) => (
              <motion.div
                key={build.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="card group flex flex-col h-full overflow-hidden"
              >
                {/* Gradient Placeholder Image */}
                <div
                  className={`relative w-full h-48 mb-6 rounded-lg bg-gradient-to-br ${build.gradientFrom} ${build.gradientTo} flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow duration-300`}
                >
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Icon */}
                  <div className="relative text-pearl/60 group-hover:text-pearl transition-colors duration-300">
                    {build.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-pearl group-hover:gradient-text transition-all duration-300">
                      {build.name}
                    </h3>
                  </div>

                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-electric bg-electric/10 rounded-full border border-electric/30">
                      {build.category}
                    </span>
                  </div>

                  {/* Specs */}
                  <p className="text-sm text-silver mb-4 font-mono">
                    {build.specs}
                  </p>

                  {/* Note */}
                  <p className="text-sm text-silver/80 mb-6 flex-grow">
                    {build.note}
                  </p>

                  {/* View Build Button */}
                  <button className="flex items-center gap-2 text-electric font-medium text-sm group/btn hover:gap-3 transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredBuilds.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-silver text-lg">
                No builds found in this category. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-obsidian border-y border-steel">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {index === 0 && <Award className="w-8 h-8 text-electric mr-3" />}
                  {index === 1 && <Smile className="w-8 h-8 text-volt mr-3" />}
                  {index === 2 && <Clock className="w-8 h-8 text-electric mr-3" />}
                  <span className="text-4xl md:text-5xl font-display font-bold gradient-text">
                    {stat.label}
                  </span>
                </div>
                <p className="text-silver font-medium">{stat.description}</p>
              </AnimatedSection>
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
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
              Ready to See Your <span className="gradient-text">Dream Build Here</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
              Join hundreds of satisfied customers who trusted us with their builds. Let&apos;s create something
              extraordinary together.
            </p>
            <Link href="/order" className="btn-primary inline-flex items-center gap-2">
              Start Your Build Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
