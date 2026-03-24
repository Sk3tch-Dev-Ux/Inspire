'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

export default function OrderSuccessContent() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-electric" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-pearl">
              Order <span className="gradient-text">Submitted!</span>
            </h1>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-silver max-w-lg mx-auto"
          >
            Thank you! We've received your build request and will be in touch within 24 hours.
          </motion.p>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
