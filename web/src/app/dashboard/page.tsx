import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import BlurFeed from '../../components/BlurFeed';
import DashboardNav from '../../components/DashboardNav';

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
      <DashboardNav user={user} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Blurs</h1>
          <p className="text-gray-600 mt-2">
            {blurs?.filter(b => !b.unlocked).length || 0} waiting to be unlocked
          </p>
        </div>

        <BlurFeed initialBlurs={blurs || []} userId={session.user.id} />
      </main>
    </div>
  );
}
