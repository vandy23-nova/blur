'use client';

import { GlassCard } from '../../../components/ui/GlassCard';
import { GlassButton } from '../../../components/ui/GlassButton';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft,
  Coins,
  Users,
  Lock,
  Unlock,
  Eye,
  Calendar,
  Share2
} from 'lucide-react';

interface Blur {
  id: string;
  image_url: string;
  message?: string;
  unlocked: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  sender_username?: string;
  sender_avatar?: string;
}

const creditCosts = {
  easy: 3,
  medium: 5,
  hard: 10
};

export default function BlurPage() {
  const params = useParams();
  const router = useRouter();
  const [blur, setBlur] = useState<Blur | null>(null);
  const [userCredits, setUserCredits] = useState(10);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // TODO: Fetch real blur data from API
    setTimeout(() => {
      setBlur({
        id: params.id as string,
        image_url: 'https://picsum.photos/400/600',
        message: 'Can you guess who sent this? 😏',
        unlocked: false,
        difficulty: 'medium',
        created_at: new Date().toISOString(),
        sender_username: 'mysterious_sender'
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleUnlockWithCredits = async () => {
    if (!blur || blur.unlocked) return;

    const cost = creditCosts[blur.difficulty];
    
    if (userCredits < cost) {
      router.push('/credits');
      return;
    }

    setUnlocking(true);

    try {
      const response = await fetch('/api/blurs/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blurId: blur.id,
          method: 'credits'
        })
      });

      if (response.ok) {
        setUserCredits(prev => prev - cost);
        setBlur({ ...blur, unlocked: true, sender_username: 'john_doe' });
        setTimeout(() => setRevealed(true), 100);
      } else {
        throw new Error('Failed to unlock');
      }
    } catch (error) {
      console.error('Unlock failed:', error);
      alert('Failed to unlock blur. Please try again.');
    } finally {
      setUnlocking(false);
    }
  };

  const handleInviteFriends = () => {
    // TODO: Implement invite system
    alert('Invite 3 friends to unlock this blur for free! Feature coming soon.');
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this mysterious blur!',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blur) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Blur Not Found</h2>
          <Link href="/dashboard">
            <GlassButton variant="primary">Back to Dashboard</GlassButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const cost = creditCosts[blur.difficulty];
  const canAfford = userCredits >= cost;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <GlassButton variant="ghost" size="sm">
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </span>
            </GlassButton>
          </Link>

          <GlassButton variant="ghost" size="sm" onClick={handleShare}>
            <span className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </span>
          </GlassButton>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Card */}
          <GlassCard className="overflow-hidden" glow={blur.unlocked}>
            <div className="relative aspect-[3/4]">
              <img
                src={blur.image_url}
                alt="Blur"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  blur.unlocked && revealed ? 'blur-0' : 'blur-effect'
                }`}
              />
              
              {/* Overlay when locked */}
              {!blur.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Lock className="w-20 h-20 text-white mx-auto animate-glow-pulse" />
                    <div className="text-white text-2xl font-bold">Locked</div>
                    <div className="glass px-6 py-3 rounded-full inline-flex items-center gap-3">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-white text-lg font-semibold">{cost} Credits</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Details & Actions */}
          <div className="space-y-6">
            {/* Info Card */}
            <GlassCard className="p-6 space-y-4" gradient="purple">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {blur.unlocked ? `From @${blur.sender_username}` : 'From Mysterious Sender'}
                  </div>
                  <div className="text-sm text-white/60 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(blur.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {blur.message && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/90">{blur.message}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  blur.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  blur.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {blur.difficulty.toUpperCase()}
                </div>
                <div className="text-white/60 text-sm">• {cost} credits to unlock</div>
              </div>
            </GlassCard>

            {/* Unlock Options */}
            {!blur.unlocked ? (
              <div className="space-y-4">
                {/* Credits Option */}
                <GlassCard className="p-6 space-y-4" glow={canAfford} gradient={canAfford ? 'purple' : 'none'}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Use Credits</div>
                        <div className="text-sm text-white/60">You have {userCredits} credits</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{cost}</div>
                  </div>

                  <GlassButton
                    variant={canAfford ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                    glow={canAfford}
                    disabled={!canAfford || unlocking}
                    onClick={handleUnlockWithCredits}
                  >
                    {unlocking ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Unlocking...
                      </span>
                    ) : canAfford ? (
                      <span className="flex items-center gap-2">
                        <Unlock className="w-5 h-5" />
                        Unlock Now
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Coins className="w-5 h-5" />
                        Buy More Credits
                      </span>
                    )}
                  </GlassButton>

                  {!canAfford && (
                    <Link href="/credits">
                      <GlassButton variant="ghost" size="sm" className="w-full">
                        Get {cost - userCredits} more credits
                      </GlassButton>
                    </Link>
                  )}
                </GlassCard>

                {/* Invite Friends Option */}
                <GlassCard className="p-6 space-y-4" gradient="cyan">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">Invite Friends</div>
                        <div className="text-sm text-white/60">Get 3 friends to join</div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gradient-cyan">FREE</div>
                  </div>

                  <GlassButton
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    onClick={handleInviteFriends}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Invite & Unlock Free
                    </span>
                  </GlassButton>

                  <p className="text-xs text-white/50 text-center">
                    Invite 3 friends who sign up and this blur unlocks for free
                  </p>
                </GlassCard>
              </div>
            ) : (
              <GlassCard className="p-8 text-center space-y-4" glow gradient="purple">
                <Unlock className="w-16 h-16 text-green-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Unlocked!</h3>
                <p className="text-white/70">
                  This blur is now revealed. The sender earned ${((cost * 0.10 * 0.95).toFixed(2))} from this unlock.
                </p>
                <Link href="/send">
                  <GlassButton variant="primary" size="md" glow>
                    Send Your Own Blur
                  </GlassButton>
                </Link>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
