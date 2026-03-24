import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold bg-gradient-to-r from-electric to-volt bg-clip-text text-transparent mb-4">
          404
        </p>
        <h1 className="font-display text-2xl font-bold text-pearl mb-3">
          Page Not Found
        </h1>
        <p className="text-silver mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
