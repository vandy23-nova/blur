'use client';

import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: 'purple' | 'pink' | 'cyan' | 'none';
}

export function GlassCard({ 
  children, 
  className, 
  hover = false, 
  glow = false,
  gradient = 'none'
}: GlassCardProps) {
  const gradientClasses = {
    purple: 'bg-gradient-to-br from-purple-500/10 to-transparent',
    pink: 'bg-gradient-to-br from-pink-500/10 to-transparent',
    cyan: 'bg-gradient-to-br from-cyan-500/10 to-transparent',
    none: ''
  };

  return (
    <div
      className={cn(
        // Base glass effect
        'relative backdrop-blur-xl bg-white/5 border border-white/10',
        'rounded-2xl shadow-2xl',
        // Gradient overlay
        gradientClasses[gradient],
        // Hover effect
        hover && 'transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
        // Glow effect
        glow && 'shadow-[0_0_50px_rgba(139,92,246,0.2)]',
        className
      )}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
