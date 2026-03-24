import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import {
  Wrench,
  Zap,
  Shield,
  Cpu,
  HardDrive,
  TrendingUp,
  AlertCircle,
  Thermometer,
  Power,
  Lock,
  Gauge,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    icon: Zap,
    title: 'Hardware Diagnostics',
    description: 'Full system diagnostic to identify failing components and hardware issues.',
    features: [
      'Full system diagnostic scan',
      'Identify failing components',
      'Thermal analysis',
      'Benchmark testing',
      'Detailed report',
    ],
    price: '$49',
    turnaround: '1-2 business days',
  },
  {
    icon: Shield,
    title: 'Software Troubleshooting',
    description: 'Fix OS issues, driver conflicts, blue screens, and system performance problems.',
    features: [
      'OS issue diagnosis',
      'Driver conflict resolution',
      'Blue screen debugging',
      'Performance analysis',
      'System stability testing',
    ],
    price: '$39',
    turnaround: '1-2 business days',
  },
  {
    icon: Lock,
    title: 'Virus & Malware Removal',
    description: 'Deep scan and removal of malware, with security setup and system cleanup.',
    features: [
      'Deep malware scan',
      'Malware removal',
      'Security software setup',
      'System cleanup',
      'Preventative security config',
    ],
    price: '$59',
    turnaround: '1-2 business days',
  },
  {
    icon: Cpu,
    title: 'Component Upgrades',
    description: 'CPU, GPU, RAM, and storage swaps with compatibility checks and testing.',
    features: [
      'Component installation',
      'Compatibility verification',
      'Driver configuration',
      'Performance testing',
      'System optimization',
    ],
    price: '$49+',
    turnaround: '1-2 business days',
  },
  {
    icon: HardDrive,
    title: 'Data Recovery',
    description: 'Recover files from failing or corrupted drives with backup and migration setup.',
    features: [
      'Failing drive recovery',
      'File recovery',
      'Data backup setup',
      'Migration assistance',
      'Recovery verification',
    ],
    price: '$79+',
    turnaround: '2-5 business days',
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimization',
    description: 'System tune-up with driver updates, startup cleanup, and benchmarking.',
    features: [
      'Driver updates',
      'Startup optimization',
      'System tune-up',
      'Thermal optimization',
      'Benchmarking report',
    ],
    price: '$79',
    turnaround: '1-2 business days',
  },
]

const commonIssues = [
  {
    icon: Thermometer,
    title: 'Overheating',
    description: 'CPU or GPU running too hot, fan noise, thermal throttling.',
  },
  {
    icon: AlertCircle,
    title: 'Blue Screens',
    description: 'Windows crash errors, system instability, unexpected reboots.',
  },
  {
    icon: Gauge,
    title: 'Slow Performance',
    description: 'Sluggish startup, lag during use, high CPU or disk usage.',
  },
  {
    icon: Power,
    title: "Won't Boot",
    description: 'Computer fails to start, stuck on logo, no display output.',
  },
  {
    icon: HardDrive,
    title: 'Hard Drive Issues',
    description: 'Clicking sounds, corrupted files, drive not recognized.',
  },
  {
    icon: Zap,
    title: 'Random Shutdowns',
    description: 'Power failure, system instability, unexpected power loss.',
  },
]

export default function TroubleshootingContent() {
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
              Troubleshooting & <span className="gradient-text">Repair Services</span>
            </h1>
            <p className="text-silver text-lg">
              Your PC is having issues? We diagnose problems, troubleshoot software and hardware, and perform upgrades. Ship your computer to us or drop it off, and we'll get it running again.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <AnimatedSection key={service.title}>
                <div className="card group h-full flex flex-col">
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
                      </div>
                      <span className="text-xs text-silver">{service.turnaround}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-pearl">
              Common Issues We <span className="gradient-text">Fix</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto">
              Experiencing one of these problems? We can help.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonIssues.map((issue) => (
              <AnimatedSection key={issue.title}>
                <div className="card group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-4 group-hover:from-electric/30 group-hover:to-volt/30 transition-colors">
                    <issue.icon className="w-6 h-6 text-electric" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-pearl">
                    {issue.title}
                  </h3>
                  <p className="text-silver text-sm">
                    {issue.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
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
              Getting your PC fixed is simple and straightforward.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Describe Your Issue', desc: 'Tell us what\'s happening with your PC—symptoms, errors, or performance problems.' },
              { step: '02', title: 'Drop Off or Ship', desc: 'Bring your computer to us or ship it. We inspect everything and provide a diagnosis.' },
              { step: '03', title: 'We Diagnose & Fix', desc: 'Our experts troubleshoot, diagnose, and perform all necessary repairs and upgrades.' },
              { step: '04', title: 'Pick Up or Ship Back', desc: 'Your fixed PC is ready. Pick it up or we\'ll ship it back to you with full testing.' },
            ].map((item) => (
              <AnimatedSection key={item.step} className="text-center">
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

      {/* Why Choose Inspire Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-pearl">
                Why Choose <span className="gradient-text">Inspire</span>
              </h2>
              <p className="text-silver text-lg mb-6">
                When your PC needs repair, you want experts you can trust. We've spent years building computers and fixing every problem that comes with them.
              </p>
              <ul className="space-y-4">
                {[
                  'Expert diagnosis and transparent communication',
                  'Honest pricing with no hidden fees',
                  'Fast turnaround on most repairs',
                  'Comprehensive testing before return',
                  'Warranty on all repair work',
                  'Data security and privacy guaranteed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                    <span className="text-pearl">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection className="gradient-border">
              <div className="bg-obsidian p-8 rounded-xl">
                <h3 className="text-2xl font-display font-semibold mb-6 text-pearl">Our Process</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                      <span className="text-electric font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pearl mb-1">Assessment</h4>
                      <p className="text-sm text-silver">Initial diagnostic scan and issue identification.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                      <span className="text-electric font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pearl mb-1">Quote</h4>
                      <p className="text-sm text-silver">Transparent pricing estimate provided upfront.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                      <span className="text-electric font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pearl mb-1">Repair</h4>
                      <p className="text-sm text-silver">Professional repair and testing by our experts.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center shrink-0">
                      <span className="text-electric font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pearl mb-1">Delivery</h4>
                      <p className="text-sm text-silver">Return your fully tested and fixed PC.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
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
              Having PC <span className="gradient-text">Problems?</span>
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10">
              Let's get your computer fixed fast. Contact us to describe your issue or drop off your PC today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
