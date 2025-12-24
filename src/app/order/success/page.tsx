'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronRight, Mail, Package, Calendar } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-volt" />
          </div>

          <h1 className="section-title mb-4">
            Order <span className="gradient-text">Confirmed!</span>
          </h1>

          <p className="section-subtitle mx-auto mb-12">
            Thank you for choosing Inspire. We&apos;re excited to build your dream PC. You&apos;ll receive a confirmation email shortly with your order details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card text-center">
              <Mail className="w-8 h-8 text-electric mx-auto mb-3" />
              <h3 className="font-display font-semibold mb-1">Confirmation Email</h3>
              <p className="text-silver text-sm">Check your inbox</p>
            </div>
            <div className="card text-center">
              <Calendar className="w-8 h-8 text-electric mx-auto mb-3" />
              <h3 className="font-display font-semibold mb-1">Build Time</h3>
              <p className="text-silver text-sm">5-7 business days</p>
            </div>
            <div className="card text-center">
              <Package className="w-8 h-8 text-electric mx-auto mb-3" />
              <h3 className="font-display font-semibold mb-1">Shipping Updates</h3>
              <p className="text-silver text-sm">Tracking sent via email</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              <span className="flex items-center gap-2">
                Back to Home
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/warranty" className="btn-secondary">
              View Warranty Info
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
