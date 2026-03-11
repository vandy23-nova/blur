import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        'backdrop-blur-xl bg-white/10 border border-white/20',
        'rounded-2xl shadow-2xl p-6',
        'transition-all duration-300',
        hover && 'hover:shadow-3xl hover:border-white/30',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
