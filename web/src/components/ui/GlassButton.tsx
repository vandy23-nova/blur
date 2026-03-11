'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export function GlassButton({ 
  children, 
  className,
  variant = 'primary',
  size = 'md',
  glow = false,
  disabled,
  ...props 
}: GlassButtonProps) {
  const variants = {
    primary: cn(
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'text-white font-semibold',
      'hover:from-purple-600 hover:to-pink-600',
      'shadow-[0_0_30px_rgba(236,72,153,0.4)]',
      glow && 'shadow-[0_0_50px_rgba(236,72,153,0.6)]'
    ),
    secondary: cn(
      'backdrop-blur-xl bg-white/10 border border-white/20',
      'text-white font-medium',
      'hover:bg-white/20',
      'shadow-lg'
    ),
    ghost: cn(
      'bg-transparent border border-white/10',
      'text-white/80 font-medium',
      'hover:bg-white/5 hover:text-white'
    )
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden',
        'transition-all duration-300',
        'active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
