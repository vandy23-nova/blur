'use client';

import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Coins, 
  Sparkles,
  Zap,
  Crown,
  Check,
  ArrowLeft
} from 'lucide-react';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  priceId: string; // Stripe Price ID
  popular?: boolean;
  bonus?: number;
}

const packages: CreditPackage[] = [
  {
    id: 'starter',
    credits: 10,
    price: 0.99,
    priceId: 'price_starter' // Replace with real Stripe Price ID
  },
  {
    id: 'popular',
    credits: 50,
    price: 3.99,
    priceId: 'price_popular',
    popular: true,
    bonus: 5
  },
  {
    id: 'value',
    credits: 100,
    price: 6.99,
    priceId: 'price_value',
    bonus: 10
  },
  {
    id: 'premium',
    credits: 500,
    price: 19.99,
    priceId: 'price_premium',
    bonus: 100
  }
];

export default function CreditsPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (pkg: CreditPackage) => {
    setLoading(pkg.id);
    
    try {
      // Call Stripe Checkout API
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: pkg.priceId,
          credits: pkg.credits,
          price: pkg.price
        })
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

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

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Premium Credits</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Buy <span className="text-gradient-purple">Credits</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Unlock mysterious messages and support creators. 
            Each unlock gives 95% to the sender.
          </p>
        </div>

        {/* Credit Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, index) => (
            <GlassCard 
              key={pkg.id}
              className={`p-6 space-y-4 relative ${pkg.popular ? 'border-2 border-purple-500' : ''}`}
              hover
              glow={pkg.popular}
              gradient={pkg.popular ? 'purple' : 'none'}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-white">
                  {pkg.credits}
                  {pkg.bonus && <span className="text-2xl text-purple-400">+{pkg.bonus}</span>}
                </div>
                <div className="text-white/60">Credits</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gradient-purple">
                  ${pkg.price.toFixed(2)}
                </div>
                <div className="text-sm text-white/50">
                  ${(pkg.price / (pkg.credits + (pkg.bonus || 0))).toFixed(3)} per credit
                </div>
              </div>

              <GlassButton
                variant={pkg.popular ? 'primary' : 'secondary'}
                size="md"
                className="w-full"
                glow={pkg.popular}
                onClick={() => handlePurchase(pkg)}
                disabled={loading !== null}
              >
                {loading === pkg.id ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Buy Now
                  </span>
                )}
              </GlassButton>
            </GlassCard>
          ))}
        </div>

        {/* Features */}
        <GlassCard className="p-8 space-y-6" gradient="purple">
          <h3 className="text-2xl font-bold text-white text-center">
            What You Get
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Instant Access',
                description: 'Credits added immediately after purchase'
              },
              {
                icon: Check,
                title: 'Secure Payment',
                description: 'Powered by Stripe - bank-level security'
              },
              {
                icon: Coins,
                title: 'Never Expire',
                description: 'Use your credits anytime, no expiration'
              }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-white">{feature.title}</div>
                  <div className="text-sm text-white/70">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* FAQ */}
        <div className="mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-white text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: 'How much does it cost to unlock a blur?',
                a: '3 credits for easy, 5 for medium, and 10 for hard difficulty blurs.'
              },
              {
                q: 'Do credits expire?',
                a: 'No! Your credits never expire and can be used anytime.'
              },
              {
                q: 'Can I earn credits?',
                a: 'Yes! When someone unlocks your blur, you earn 95% of the value. You can then request a payout.'
              },
              {
                q: 'Is payment secure?',
                a: 'Absolutely. We use Stripe for payments - the same technology used by Amazon, Google, and millions of businesses.'
              }
            ].map((faq, i) => (
              <GlassCard key={i} className="p-6 space-y-2" hover>
                <div className="font-semibold text-white text-lg">{faq.q}</div>
                <div className="text-white/70">{faq.a}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
