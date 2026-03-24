import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
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
  AlertCircle,
  TrendingUp,
  Image as ImageIcon
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

export default function HomeContent() {
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

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column — Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-steel/50 border border-steel mb-8">
                <span className="w-2 h-2 rounded-full bg-volt" />
                <span className="text-sm text-silver">Professional PC Assembly Service</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-pearl">
                Your Parts, Our{' '}
                <span className="gradient-text">Expertise</span>
              </h1>

              <p className="text-lg md:text-xl text-silver mb-10 max-w-2xl">
                Custom PC building, troubleshooting & diagnostics, or upgrading your existing system. We handle it all with expert craftsmanship and attention to detail.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/order" className="btn-primary">
                  <span className="flex items-center gap-2">
                    Book a Build
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link href="/troubleshooting" className="btn-secondary">
                  Get PC Help
                </Link>
              </div>
            </div>

            {/* Right Column — Services Card */}
            <div className="hidden lg:block">
              <div className="w-full max-w-sm ml-auto rounded-3xl bg-gradient-to-br from-steel/50 to-obsidian border border-steel overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-volt/10" />
                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                      <Zap className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <p className="text-xs text-silver">Our Services</p>
                      <p className="font-display font-semibold text-pearl">We Offer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['Custom PC Building', 'Troubleshooting', 'Hardware Diagnostics', 'Component Upgrades', 'Performance Optimization'].map((service) => (
                      <div key={service} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-volt" />
                        <span className="text-pearl">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              A simple process to get your PC built by professionals.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div key={step.title} className="card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                    <step.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                    {step.title}
                  </h3>
                  <p className="text-silver text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              From building custom PCs to fixing problems and boosting performance, we&apos;ve got all your PC needs covered.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Wrench,
                  title: 'Custom PC Building',
                  description: 'You pick the parts, we build it right',
                  href: '/services',
                },
                {
                  icon: AlertCircle,
                  title: 'Troubleshooting & Repair',
                  description: 'Diagnostics, fixes, and virus removal',
                  href: '/troubleshooting',
                },
                {
                  icon: TrendingUp,
                  title: 'Upgrades & Optimization',
                  description: 'Boost your existing PC\'s performance',
                  href: '/troubleshooting',
                },
              ].map((service) => (
                <div key={service.title} className="card group flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                    <service.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-pearl">
                    {service.title}
                  </h3>
                  <p className="text-silver text-sm mb-6 flex-grow">
                    {service.description}
                  </p>
                  <Link href={service.href} className="inline-flex items-center gap-2 text-electric hover:text-volt transition-colors">
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              We Build for Every <span className="gradient-text">Purpose</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Whatever your use case, we have the expertise to assemble it perfectly.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                    <useCase.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-pearl">
                    {useCase.title}
                  </h3>
                  <p className="text-silver text-sm">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Build Gallery Teaser Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Featured <span className="gradient-text">Builds</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Check out some of the amazing systems we&apos;ve assembled.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                { name: 'Gaming Powerhouse', specs: '4070 Ti, 7800X3D' },
                { name: 'Creator Workstation', specs: 'RTX 4080, 7950X' },
                { name: 'Esports Machine', specs: '4070, 7700X' },
                { name: 'Budget 1080p', specs: '4060 Ti, 5700X3D' },
              ].map((build) => (
                <div key={build.name} className="card group cursor-pointer">
                  <div className="w-full h-48 bg-gradient-to-br from-steel/30 to-obsidian rounded-lg flex items-center justify-center mb-4 group-hover:from-electric/20 group-hover:to-volt/20 transition-colors">
                    <ImageIcon className="w-12 h-12 text-steel" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-pearl mb-1">
                    {build.name}
                  </h3>
                  <p className="text-sm text-silver">
                    {build.specs}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <div className="text-center">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-electric hover:text-volt transition-colors text-lg font-semibold">
              View Full Gallery
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Why Choose <span className="gradient-text">Inspire</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              We&apos;re not just builders—we&apos;re enthusiasts who care about every detail.
            </p>
          </AnimatedSection>

          <AnimatedSection>
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
              ].map((feature) => (
                <div key={feature.title} className="card group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                    <feature.icon className="w-7 h-7 text-electric" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                    {feature.title}
                  </h3>
                  <p className="text-silver text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-electric/20 to-transparent rounded-full blur-[100px]" />
        </div>

        <AnimatedSection className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
            Ready to Get <span className="gradient-text">Started</span>?
          </h2>
          <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
            Whether you&apos;re building a custom PC, need troubleshooting help, or want to upgrade your existing system, we&apos;re here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/order" className="btn-primary">
              <span className="flex items-center gap-2">
                Book a Service
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
