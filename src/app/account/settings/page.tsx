import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/user-auth';
import { ChevronLeft } from 'lucide-react';

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const providerLabel = user.provider === 'google' ? 'Google' : 'Discord';

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/account" className="inline-flex items-center gap-1 text-sm text-silver hover:text-pearl transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-display font-bold text-pearl mb-8">Account Settings</h1>

        {/* Profile Info */}
        <div className="card mb-6">
          <h2 className="font-display font-semibold text-pearl mb-6">Profile</h2>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-steel">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric to-volt flex items-center justify-center">
                <span className="text-2xl font-bold text-midnight">
                  {(user.name || user.email)[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="font-display font-semibold text-pearl">{user.name || 'No name set'}</p>
              <p className="text-sm text-silver">{user.email}</p>
            </div>
          </div>

          <dl className="space-y-4">
            <div>
              <dt className="text-xs text-silver uppercase tracking-wider mb-1">Name</dt>
              <dd className="text-pearl">{user.name || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs text-silver uppercase tracking-wider mb-1">Email</dt>
              <dd className="text-pearl">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-silver uppercase tracking-wider mb-1">Connected Account</dt>
              <dd className="inline-flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                  user.provider === 'google'
                    ? 'bg-white/5 border-white/20 text-pearl'
                    : 'bg-[#5865F2]/10 border-[#5865F2]/30 text-[#5865F2]'
                }`}>
                  {providerLabel}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-silver uppercase tracking-wider mb-1">Member Since</dt>
              <dd className="text-pearl">
                {new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </dd>
            </div>
          </dl>

          <p className="text-xs text-silver mt-6">
            Profile information is managed by your {providerLabel} account.
          </p>
        </div>
      </div>
    </div>
  );
}
