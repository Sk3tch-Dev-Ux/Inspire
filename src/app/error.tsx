'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-coral mb-4">Oops</p>
        <h1 className="font-display text-2xl font-bold text-pearl mb-3">
          Something went wrong
        </h1>
        <p className="text-silver mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-primary">
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
