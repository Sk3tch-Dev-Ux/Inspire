import Link from 'next/link'
import { CheckCircle, ChevronRight } from 'lucide-react'

export default function OrderSuccessContent() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8 animate-[fadeIn_0.5s_ease-out_both]">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-electric/20 to-volt/20 flex items-center justify-center animate-[scaleIn_0.4s_ease-out_0.2s_both]">
            <CheckCircle className="w-12 h-12 text-electric" />
          </div>

          {/* Heading */}
          <div className="animate-[slideUp_0.4s_ease-out_0.3s_both]">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-pearl">
              Order <span className="gradient-text">Submitted!</span>
            </h1>
          </div>

          {/* Message */}
          <p className="text-lg text-silver max-w-lg mx-auto animate-[slideUp_0.4s_ease-out_0.4s_both]">
            Thank you! We've received your build request and will be in touch within 24 hours.
          </p>

          {/* Back to Home Link */}
          <div className="animate-[slideUp_0.4s_ease-out_0.5s_both]">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              Back to Home
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  )
}
