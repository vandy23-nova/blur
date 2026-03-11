import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import BlurFeed from '../../components/BlurFeed';
import DashboardNav from '../../components/DashboardNav';
import AutoSeedDemo from '../../components/AutoSeedDemo';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const { data: blurs } = await supabase
    .from('blurs')
    .select(`
      *,
      sender:users!blurs_sender_id_fkey(id, username, avatar_url)
    `)
    .eq('receiver_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <AutoSeedDemo userId={session.user.id} hasBlurs={(blurs?.length || 0) > 0} />
      <DashboardNav user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Blurs</h1>
            <p className="text-gray-600 mt-2">
              {blurs?.filter(b => !b.unlocked).length || 0} waiting to be unlocked
            </p>
          </div>
          
          <a 
            href="/send" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Send Blur
          </a>
        </div>

        <BlurFeed initialBlurs={blurs || []} userId={session.user.id} />
      </main>
    </div>
  );
}
