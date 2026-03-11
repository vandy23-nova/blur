'use client';

import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, Shield, TrendingUp, Eye, Heart } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-purple">Blur</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <GlassButton variant="ghost" size="sm">
                Login
              </GlassButton>
            </Link>
            <Link href="/signup">
              <GlassButton variant="primary" size="sm" glow>
                Sign Up
              </GlassButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 animate-scale-in">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Premium Mystery Messaging</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <span className="text-white">Send</span>
            <br />
            <span className="text-gradient-purple">Mysterious</span>
            <br />
            <span className="text-white">Messages</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            The most premium way to send secret photos and messages. 
            Unlock with credits, earn from your blurs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/signup">
              <GlassButton variant="primary" size="lg" glow>
                <span className="flex items-center gap-2">
                  Start Sending
                  <Zap className="w-5 h-5" />
                </span>
              </GlassButton>
            </Link>
            <Link href="#features">
              <GlassButton variant="secondary" size="lg">
                Learn More
              </GlassButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-12">
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Blurs Sent', value: '50K+' },
              { label: 'Earnings Paid', value: '$5K+' }
            ].map((stat, i) => (
              <GlassCard key={i} className="p-4 text-center" glow>
                <div className="text-2xl font-bold text-gradient-purple">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-gradient-purple">Blur?</span>
          </h2>
          <p className="text-xl text-white/70">Premium features for premium experiences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Sparkles,
              title: 'Premium Design',
              description: 'Liquid glass aesthetics that feel expensive and exclusive',
              gradient: 'purple'
            },
            {
              icon: TrendingUp,
              title: 'Earn Money',
              description: '95% revenue share - get paid when people unlock your blurs',
              gradient: 'pink'
            },
            {
              icon: Shield,
              title: 'Secure & Private',
              description: 'End-to-end encryption and secure payments via Stripe',
              gradient: 'cyan'
            }
          ].map((feature, i) => (
            <GlassCard 
              key={i} 
              className="p-8 space-y-4" 
              hover
              gradient={feature.gradient as any}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="text-gradient-purple">Works</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { step: '1', title: 'Send a Blur', description: 'Upload a photo, blur it, and send to anyone' },
            { step: '2', title: 'They Unlock', description: 'Receiver spends credits or invites friends to unlock' },
            { step: '3', title: 'You Earn', description: 'Get 95% of unlock value paid directly to you' }
          ].map((item, i) => (
            <GlassCard key={i} className="p-8 flex items-center gap-6" hover>
              <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white">
                {item.step}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <GlassCard className="p-12 text-center space-y-6 max-w-3xl mx-auto" glow gradient="purple">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Start?
          </h2>
          <p className="text-xl text-white/70">
            Join thousands earning money from their mysterious messages
          </p>
          <Link href="/signup">
            <GlassButton variant="primary" size="lg" glow>
              <span className="flex items-center gap-2">
                Get Started Free
                <Heart className="w-5 h-5" />
              </span>
            </GlassButton>
          </Link>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
          <div>© 2024 Blur. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
