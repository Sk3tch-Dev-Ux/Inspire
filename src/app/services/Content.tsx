import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import {
  Wrench,
  ListChecks,
  Settings,
  HardDrive,
  Cpu,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Zap,
  AlertTriangle,
  Shield,
} from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Standard PC Assembly',
    description: 'Complete assembly of your parts with professional cable management, BIOS configuration, and stress testing.',
    features: [
      'Full system assembly',
      'Professional cable management',
      'BIOS setup & optimization',
      'Stress testing & benchmarking',
      'OS installation (if provided)',
    ],
    price: '$150',
    turnaround: '3-5 business days',
  },
  {
    icon: Zap,
    title: 'Express Build',
    description: 'Same expert assembly with priority turnaround. Perfect when you need your build fast.',
    features: [
      'Everything in Standard Build',
      '24-48 hour turnaround',
      'Priority support',
      'Extended stress testing',
      'Detailed benchmark report',
    ],
    price: '$300',
    turnaround: '24-48 hours',
  },
  {
    icon: ListChecks,
    title: 'Budget Build Planning',
    description: 'Tell us your budget and goals. We\'ll create a custom PC Part Picker list with compatible, optimized components.',
    features: [
      'Personalized consultation',
      'PC Part Picker parts list',
      'Compatibility verification',
      'Performance optimization',
      'No obligation to buy',
    ],
    price: '$49',
    note: 'Credited toward build service',
    turnaround: '1-2 business days',
  },
  {
    icon: Settings,
    title: 'System Optimization',
    description: 'Already have a PC? We\'ll tune your system for maximum performance with driver updates and OS optimization.',
    features: [
      'Driver updates',
      'Windows optimization',
      'Startup cleanup',
      'Basic overclocking (if capable)',
      'Performance benchmarking',
    ],
    price: '$79',
    turnaround: '1-2 business days',
  },
  {
    icon: Cpu,
    title: 'Component Upgrades',
    description: 'Need to swap out your CPU, GPU, or storage? We\'ll handle the upgrade and make sure everything works perfectly.',
    features: [
      'Component installation',
      'Driver configuration',
      'Compatibility check',
      'Testing & verification',
      'Old part return',
    ],
    price: '$49',
    turnaround: '1-2 business days',
  },
  {
    icon: HardDrive,
    title: 'Data & OS Services',
    description: 'Operating system installation, data migration from your old PC, and backup solutions.',
    features: [
      'Windows/Linux installation',
      'Driver installation',
      'Data migration',
      'Software setup',
      'Backup configuration',
    ],
    price: '$39',
    turnaround: '1-2 business days',
  },
]

export default function ServicesContent() {
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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-silver text-lg">
              Custom PC building, troubleshooting, repairs, and upgrades. We offer a complete range of services to keep your PC running perfectly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <AnimatedSection
                key={service.title}
                className="card group h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                  <service.icon className="w-7 h-7 text-electric" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                  {service.title}
                </h3>

                <p className="text-silver text-sm mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-pearl">
                      <CheckCircle className="w-4 h-4 text-volt shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-steel">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-display font-bold gradient-text">
                        {service.price}
                      </span>
                      {service.note && (
                        <p className="text-xs text-silver">{service.note}</p>
                      )}
                    </div>
                    <span className="text-xs text-silver">{service.turnaround}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting & Repair Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Troubleshooting & <span className="gradient-text">Repair Services</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Having PC problems? We offer comprehensive diagnostics, repairs, and optimization services.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: AlertTriangle,
                title: 'Hardware Diagnostics',
                description: 'Complete system scan to identify hardware issues, failing components, and connectivity problems.',
                price: '$49',
                turnaround: '1-2 business days',
              },
              {
                icon: Settings,
                title: 'Software Troubleshooting',
                description: 'Fix crashes, freezes, blue screens, driver issues, and general Windows problems.',
                price: '$39',
                turnaround: '1-2 business days',
              },
              {
                icon: Shield,
                title: 'Virus & Malware Removal',
                description: 'Professional scanning, removal, and protection setup to keep your system secure.',
                price: '$59',
                turnaround: '1-2 business days',
              },
              {
                icon: Cpu,
                title: 'Component Upgrades',
                description: 'Install new RAM, storage drives, GPUs, CPUs, or cooling solutions with full testing.',
                price: '$49+',
                turnaround: '1-2 business days',
              },
              {
                icon: HardDrive,
                title: 'Data Recovery',
                description: 'Recover files from failing drives, corrupted storage, or deleted partitions.',
                price: '$79+',
                turnaround: '2-5 business days',
              },
              {
                icon: Zap,
                title: 'Performance Optimization',
                description: 'Optimize system settings, cleanup bloatware, and maximize your PC\'s speed.',
                price: '$79',
                turnaround: '1-2 business days',
              },
            ].map((service) => (
              <AnimatedSection
                key={service.title}
                className="card group h-full flex flex-col bg-obsidian"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-6 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                  <service.icon className="w-7 h-7 text-electric" />
                </div>

                <h3 className="font-display text-xl font-semibold mb-3 text-pearl">
                  {service.title}
                </h3>

                <p className="text-silver text-sm mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-steel">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-display font-bold gradient-text">
                      {service.price}
                    </span>
                    <span className="text-xs text-silver">{service.turnaround}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mb-16">
            <Link href="/troubleshooting" className="inline-flex items-center gap-2 text-electric hover:text-volt transition-colors text-lg font-semibold">
              View All Repair Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Budget Build Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
                Build Based on <span className="gradient-text">Budget</span>
              </h2>
              <p className="text-silver text-lg mb-6">
                Not sure where to start? Our Budget Build Planning service takes the guesswork out of PC building. Tell us what you want to do and how much you want to spend, and we&apos;ll create a complete parts list using PC Part Picker.
              </p>
              <p className="text-silver mb-8">
                You&apos;ll see exactly what each component costs and where to buy them. No hidden fees, no markup on parts—just honest recommendations from experienced builders.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-obsidian rounded-xl border border-steel">
                  <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                    <span className="text-electric font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pearl mb-1">Tell Us Your Goals</h4>
                    <p className="text-sm text-silver">Gaming at 1440p? Video editing? General use? Let us know.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-obsidian rounded-xl border border-steel">
                  <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                    <span className="text-electric font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pearl mb-1">Set Your Budget</h4>
                    <p className="text-sm text-silver">We&apos;ll optimize for the best performance at your price point.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-obsidian rounded-xl border border-steel">
                  <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                    <span className="text-electric font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-pearl mb-1">Get Your Parts List</h4>
                    <p className="text-sm text-silver">Receive a PC Part Picker list with everything you need.</p>
                  </div>
                </div>
              </div>

              <Link href="/order" className="btn-primary inline-flex items-center gap-2">
                Request a Build Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>

            <AnimatedSection>
              <div className="gradient-border">
                <div className="bg-obsidian p-8 rounded-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-midnight" />
                    </div>
                    <div>
                      <p className="font-display font-semibold text-lg text-pearl">PC Part Picker Integration</p>
                      <p className="text-sm text-silver">Transparent, real-time pricing</p>
                    </div>
                  </div>

                  <p className="text-silver mb-6">
                    We use PC Part Picker to build your parts list because it shows you:
                  </p>

                  <ul className="space-y-3 mb-6">
                    {[
                      'Real-time prices from multiple retailers',
                      'Automatic compatibility checking',
                      'Power supply requirements',
                      'Price history and alerts',
                      'User reviews and ratings',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-pearl">
                        <CheckCircle className="w-4 h-4 text-volt shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-silver">
                    You buy the parts directly from retailers—we don&apos;t mark anything up or take a cut.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              The Build <span className="gradient-text">Process</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Here&apos;s what happens when you choose Inspire for your build.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We discuss your needs, review your parts list, and confirm compatibility.' },
              { step: '02', title: 'Parts Arrival', desc: 'Ship your parts to us or drop them off. We inspect everything on arrival.' },
              { step: '03', title: 'Assembly', desc: 'Expert assembly with attention to cable management, thermals, and aesthetics.' },
              { step: '04', title: 'Testing', desc: 'Stress testing, benchmarking, and burn-in to ensure stability.' },
            ].map((item) => (
              <AnimatedSection
                key={item.step}
                className="text-center"
              >
                <div className="text-5xl font-display font-bold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2 text-pearl">
                  {item.title}
                </h3>
                <p className="text-silver text-sm">
                  {item.desc}
                </p>
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
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
              Whether you're building a new PC or need to fix and optimize your current system, we're here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/order" className="btn-primary">
                Book a Service
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
