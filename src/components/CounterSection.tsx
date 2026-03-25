'use client'

import { useEffect, useRef, useState } from 'react'
import { Cpu, Clock, ThumbsUp, Shield } from 'lucide-react'

const stats = [
  { icon: Cpu, value: 150, suffix: '+', label: 'Builds Completed' },
  { icon: Clock, value: 5, suffix: '+', label: 'Years Experience' },
  { icon: ThumbsUp, value: 100, suffix: '%', label: 'Client Satisfaction' },
  { icon: Shield, value: 30, suffix: '-Day', label: 'Warranty Coverage' },
]

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return

    let startTime: number | null = null
    let rafId: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, started])

  return count
}

function CounterItem({ icon: Icon, value, suffix, label, started }: {
  icon: typeof Cpu
  value: number
  suffix: string
  label: string
  started: boolean
}) {
  const count = useCountUp(value, 2000, started)

  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-electric" />
      </div>
      <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm text-silver">{label}</div>
    </div>
  )
}

export default function CounterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 border-y border-steel/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <CounterItem key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  )
}
