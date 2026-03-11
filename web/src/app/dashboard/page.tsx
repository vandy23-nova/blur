'use client';

import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Coins, 
  TrendingUp, 
  Send, 
  Eye, 
  Plus,
  Sparkles,
  Lock,
  Unlock
} from 'lucide-react';

interface Blur {
  id: string;
  image_url: string;
  message?: string;
  unlocked: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  sender_username?: string;
}

export default function DashboardPage() {
  const [credits, setCredits] = useState(10);
  const [earnings, setEarnings] = useState(0);
  const [blurs, setBlurs] = useState<Blur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setBlurs([
        {
          id: '1',
          image_url: 'https://picsum.photos/400/600',
          message: 'Can you guess who sent this? 😏',
          unlocked: false,
          difficulty: 'medium',
          created_at: new Date().toISOString(),
          sender_username: 'mysterious_sender'
        },
        {
          id: '2',
          image_url: 'https://picsum.photos/400/601',
          unlocked: true,
          difficulty: 'easy',
          created_at: new Date().toISOString(),
          sender_username: 'friend123'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const creditCost = {
    easy: 3,
    medium: 5,
    hard: 10
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-purple">Blur</span>
          </div>
          
          <Link href="/credits">
            <GlassButton variant="secondary" size="sm">
              <span className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                {credits} Credits
              </span>
            </GlassButton>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3" glow gradient="purple">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Credits Balance</div>
              <Coins className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-4xl font-bold text-white">{credits}</div>
            <Link href="/credits">
              <GlassButton variant="ghost" size="sm" className="w-full">
                Buy More
              </GlassButton>
            </Link>
          </GlassCard>

          <GlassCard className="p-6 space-y-3" glow gradient="pink">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Total Earnings</div>
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-4xl font-bold text-white">${(earnings / 100).toFixed(2)}</div>
            <Link href="/earnings">
              <GlassButton variant="ghost" size="sm" className="w-full">
                View Earnings
              </GlassButton>
            </Link>
          </GlassCard>

          <GlassCard className="p-6 space-y-3" glow gradient="cyan">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Blurs Received</div>
              <Eye className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-4xl font-bold text-white">{blurs.length}</div>
            <Link href="/send">
              <GlassButton variant="ghost" size="sm" className="w-full">
                Send Blur
              </GlassButton>
            </Link>
          </GlassCard>
        </div>

        {/* Send Button - Prominent CTA */}
        <Link href="/send">
          <GlassCard className="p-8 cursor-pointer group" hover glow>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Send a New Blur</h3>
                <p className="text-white/70">Upload a photo and send it to someone special</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-white" />
              </div>
            </div>
          </GlassCard>
        </Link>

        {/* Your Blurs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Your Blurs</h2>
            <GlassButton variant="ghost" size="sm">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Filter
              </span>
            </GlassButton>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-96" />
              ))}
            </div>
          ) : blurs.length === 0 ? (
            <GlassCard className="p-12 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <Eye className="w-12 h-12 text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-white">No Blurs Yet</h3>
              <p className="text-white/70 max-w-md mx-auto">
                You haven't received any blurs yet. Share your profile to start receiving mysterious messages!
              </p>
              <Link href="/send">
                <GlassButton variant="primary" size="md" glow>
                  Send Your First Blur
                </GlassButton>
              </Link>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blurs.map((blur) => (
                <Link key={blur.id} href={`/blur/${blur.id}`}>
                  <GlassCard className="overflow-hidden group cursor-pointer" hover>
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={blur.image_url}
                        alt="Blur"
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          blur.unlocked ? 'blur-0' : 'blur-effect'
                        }`}
                      />
                      
                      {/* Overlay */}
                      {!blur.unlocked && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
                          <div className="text-center space-y-3 p-6">
                            <Lock className="w-12 h-12 text-white mx-auto animate-glow-pulse" />
                            <div className="text-white font-bold text-lg">Locked</div>
                            <div className="glass px-4 py-2 rounded-full inline-flex items-center gap-2">
                              <Coins className="w-4 h-4 text-yellow-400" />
                              <span className="text-white">{creditCost[blur.difficulty]} Credits</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {blur.unlocked && (
                        <div className="absolute top-4 right-4">
                          <div className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Unlock className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-white">Unlocked</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-2">
                      {blur.message && (
                        <p className="text-white/90 text-sm line-clamp-2">{blur.message}</p>
                      )}
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <span>{blur.unlocked ? `From @${blur.sender_username}` : 'From mysterious sender'}</span>
                        <span>{new Date(blur.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
