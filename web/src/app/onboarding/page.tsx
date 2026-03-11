'use client';

import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Eye, TrendingUp, ArrowRight, Check } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Send,
    title: 'Send Mysterious Messages',
    description: 'Upload photos and send them as blurred messages to anyone. The mystery is half the fun!',
    tip: 'Choose difficulty levels: easy (3 credits), medium (5), or hard (10)'
  },
  {
    id: 2,
    icon: Eye,
    title: 'Unlock & Discover',
    description: 'Receive blurs from others and unlock them with credits or by inviting friends.',
    tip: 'Each blur requires credits based on its difficulty level'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Earn Real Money',
    description: 'When someone unlocks your blur, you earn 95% of the unlock value. Request payouts anytime!',
    tip: 'Minimum payout is $10 - you can track earnings in real-time'
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete and redirect
      localStorage.setItem('onboarding_completed', 'true');
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    router.push('/dashboard');
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full space-y-8 animate-fade-in">
        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= currentStep 
                  ? 'w-16 bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'w-8 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <GlassCard className="p-12 space-y-8 text-center" glow gradient="purple">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-glow-pulse">
              <step.icon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {step.title}
            </h2>
            <p className="text-xl text-white/80 max-w-lg mx-auto">
              {step.description}
            </p>
          </div>

          {/* Tip */}
          <div className="inline-flex items-start gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-left">
            <div className="w-6 h-6 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-white text-sm">Pro Tip</div>
              <div className="text-white/70 text-sm">{step.tip}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <GlassButton
              variant="primary"
              size="lg"
              glow
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </GlassButton>
            
            {currentStep < steps.length - 1 && (
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={handleSkip}
                className="w-full sm:w-auto"
              >
                Skip Tutorial
              </GlassButton>
            )}
          </div>

          {/* Step indicator */}
          <div className="text-white/50 text-sm">
            Step {currentStep + 1} of {steps.length}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
