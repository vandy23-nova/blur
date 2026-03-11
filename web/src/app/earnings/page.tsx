'use client';

import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign,
  ArrowLeft,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Earning {
  id: string;
  blur_id: string;
  unlocker_username: string;
  credits_spent: number;
  creator_share_cents: number;
  status: 'pending' | 'available' | 'paid_out';
  created_at: string;
}

interface Payout {
  id: string;
  amount_cents: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requested_at: string;
  completed_at?: string;
}

export default function EarningsPage() {
  const [availableBalance, setAvailableBalance] = useState(1250); // cents
  const [totalEarned, setTotalEarned] = useState(3890); // cents
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingPayout, setRequestingPayout] = useState(false);

  useEffect(() => {
    // TODO: Fetch real data from API
    setTimeout(() => {
      setEarnings([
        {
          id: '1',
          blur_id: 'blur1',
          unlocker_username: 'user123',
          credits_spent: 5,
          creator_share_cents: 48,
          status: 'available',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          blur_id: 'blur2',
          unlocker_username: 'user456',
          credits_spent: 10,
          creator_share_cents: 95,
          status: 'available',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      
      setPayouts([
        {
          id: '1',
          amount_cents: 1000,
          status: 'completed',
          requested_at: new Date(Date.now() - 604800000).toISOString(),
          completed_at: new Date(Date.now() - 518400000).toISOString()
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleRequestPayout = async () => {
    if (availableBalance < 1000) {
      alert('Minimum payout is $10.00');
      return;
    }

    setRequestingPayout(true);

    try {
      const response = await fetch('/api/payouts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_cents: availableBalance
        })
      });

      if (response.ok) {
        alert('Payout requested! We\'ll process it within 3-5 business days.');
        // Refresh data
        window.location.reload();
      } else {
        throw new Error('Failed to request payout');
      }
    } catch (error) {
      console.error('Payout request failed:', error);
      alert('Failed to request payout. Please try again.');
    } finally {
      setRequestingPayout(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const canRequestPayout = availableBalance >= 1000;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <Link href="/dashboard">
          <GlassButton variant="ghost" size="sm">
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </span>
          </GlassButton>
        </Link>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Your <span className="text-gradient-purple">Earnings</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Track your revenue and request payouts. You earn 95% from every unlock.
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3" glow gradient="purple">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Available Balance</div>
              <DollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-4xl font-bold text-white">
              {formatCurrency(availableBalance)}
            </div>
            <div className="text-sm text-white/60">
              {canRequestPayout ? 'Ready to withdraw' : `$${((1000 - availableBalance) / 100).toFixed(2)} until minimum`}
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-3" glow gradient="pink">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Total Earned</div>
              <TrendingUp className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-4xl font-bold text-white">
              {formatCurrency(totalEarned)}
            </div>
            <div className="text-sm text-white/60">
              All-time earnings
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-3" glow gradient="cyan">
            <div className="flex items-center justify-between">
              <div className="text-white/70">Unlocks</div>
              <Eye className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-4xl font-bold text-white">
              {earnings.length}
            </div>
            <div className="text-sm text-white/60">
              Times your blurs were unlocked
            </div>
          </GlassCard>
        </div>

        {/* Request Payout */}
        <GlassCard className="p-8 space-y-4" glow={canRequestPayout} gradient={canRequestPayout ? 'purple' : 'none'}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Request Payout</h3>
              <p className="text-white/70">
                {canRequestPayout 
                  ? 'Withdraw your earnings via Stripe. Minimum $10.00.'
                  : `You need ${formatCurrency(1000 - availableBalance)} more to request a payout (minimum $10.00)`
                }
              </p>
            </div>
            <GlassButton
              variant="primary"
              size="lg"
              glow
              disabled={!canRequestPayout || requestingPayout}
              onClick={handleRequestPayout}
            >
              {requestingPayout ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                `Withdraw ${formatCurrency(availableBalance)}`
              )}
            </GlassButton>
          </div>
        </GlassCard>

        {/* Recent Earnings */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Recent Earnings</h2>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-24" />
              ))}
            </div>
          ) : earnings.length === 0 ? (
            <GlassCard className="p-12 text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <TrendingUp className="w-12 h-12 text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-white">No Earnings Yet</h3>
              <p className="text-white/70 max-w-md mx-auto">
                Send blurs and earn money when people unlock them! You get 95% of every unlock.
              </p>
              <Link href="/send">
                <GlassButton variant="primary" size="md" glow>
                  Send Your First Blur
                </GlassButton>
              </Link>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {earnings.map((earning) => (
                <GlassCard key={earning.id} className="p-6 flex items-center justify-between" hover>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        @{earning.unlocker_username} unlocked your blur
                      </div>
                      <div className="text-sm text-white/60">
                        {earning.credits_spent} credits spent • {new Date(earning.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gradient-purple">
                      +{formatCurrency(earning.creator_share_cents)}
                    </div>
                    <div className="text-xs text-white/60 capitalize">
                      {earning.status}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Payout History */}
        {payouts.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Payout History</h2>
            
            <div className="space-y-4">
              {payouts.map((payout) => {
                const statusIcons = {
                  pending: <Clock className="w-5 h-5 text-yellow-400" />,
                  processing: <Clock className="w-5 h-5 text-blue-400" />,
                  completed: <CheckCircle className="w-5 h-5 text-green-400" />,
                  failed: <AlertCircle className="w-5 h-5 text-red-400" />
                };

                return (
                  <GlassCard key={payout.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {statusIcons[payout.status]}
                      <div>
                        <div className="text-white font-semibold">
                          {payout.status === 'completed' ? 'Paid out' : 'Payout ' + payout.status}
                        </div>
                        <div className="text-sm text-white/60">
                          Requested {new Date(payout.requested_at).toLocaleDateString()}
                          {payout.completed_at && ` • Completed ${new Date(payout.completed_at).toLocaleDateString()}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {formatCurrency(payout.amount_cents)}
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
