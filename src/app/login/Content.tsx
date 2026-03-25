'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { AlertCircle } from 'lucide-react'

const errorMessages: Record<string, string> = {
  google_denied: 'Google sign-in was cancelled.',
  discord_denied: 'Discord sign-in was cancelled.',
  google_auth_failed: 'Could not connect to Google. Please try again.',
  discord_auth_failed: 'Could not connect to Discord. Please try again.',
  google_callback_failed: 'Google sign-in failed. Please try again.',
  discord_callback_failed: 'Discord sign-in failed. Please try again.',
  invalid_state: 'Session expired. Please try again.',
}

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3 text-pearl">
            Sign in to <span className="gradient-text">Inspire PC</span>
          </h1>
          <p className="text-silver">
            Track your orders, get build updates, and chat with our AI assistant.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-coral/10 border border-coral/30 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
            <p className="text-sm text-coral">
              {errorMessages[error] || 'Something went wrong. Please try again.'}
            </p>
          </div>
        )}

        <div className="card space-y-4">
          <a
            href="/api/auth/login/google"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white hover:bg-gray-50 text-gray-800 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </a>

          <a
            href="/api/auth/login/discord"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Continue with Discord
          </a>
        </div>

        <p className="text-center text-sm text-silver mt-8">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-electric hover:text-volt transition-colors">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-electric hover:text-volt transition-colors">Privacy Policy</Link>.
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-silver hover:text-pearl transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginContent() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-silver">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
