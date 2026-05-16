'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, MessageSquare } from 'lucide-react';

/**
 * Global error boundary for the App Router.
 *
 * Reached when an unhandled error escapes a server component, a
 * generateMetadata call, or a client component during render. Logs
 * the digest to the console so it can be cross-referenced with the
 * server logs, then offers two outs: retry (calls reset) or jump
 * to Discord and tell me what happened.
 *
 * NOTE: Cannot export `metadata` from a client error.tsx — Next
 * renders the document title from the route segment that crashed.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Caught by app/error.tsx', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-ink">
      <div className="text-center max-w-md">
        <p className="font-display text-6xl sm:text-7xl font-bold gradient-text mb-4">
          Oops
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-bone mb-3">
          Something went wrong
        </h1>
        <p className="text-mute mb-2 leading-relaxed">
          An unexpected error hit this page. Try again — if it keeps
          happening, ping me in Discord with what you were doing.
        </p>
        {error.digest && (
          <p className="font-mono text-xs text-mute/70 mb-8">
            ref: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary" type="button">
            <span className="flex items-center gap-2">
              <RefreshCw size={16} />
              Try again
            </span>
          </button>
          <Link href="https://discord.gg/inspire-dev" className="btn-secondary">
            <span className="flex items-center gap-2">
              <MessageSquare size={16} />
              Tell me about it
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
