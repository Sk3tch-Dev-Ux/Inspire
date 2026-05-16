import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'That page doesn’t exist (or it used to and got pivoted out). Head back home or drop into the Discord.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-ink">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl sm:text-8xl font-bold gradient-text mb-4">
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-bone mb-3">
          Page not found
        </h1>
        <p className="text-mute mb-8 leading-relaxed">
          That route doesn&rsquo;t exist — could be a typo, could be a page
          that got pivoted out of the site. Head back home or drop into the
          Discord and I&rsquo;ll point you the right way.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <span className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to home
            </span>
          </Link>
          <a
            href="https://discord.gg/inspire-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <span className="flex items-center gap-2">
              <MessageSquare size={16} />
              Ask in Discord
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
