'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@/lib/types';

export default function DashboardNav({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-primary">Blur</h1>
          {user?.is_plus && (
            <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
              Plus ⭐
            </span>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-accent/10 px-3 py-1.5 rounded-full">
            <span className="text-xl">💎</span>
            <span className="font-semibold text-accent">{user?.coins || 0}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">{user?.username}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
