import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { easeOut, motionDuration } from '../../utils/motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionDuration(!!reduced, 300), ease: easeOut }}
      className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-white px-6 py-12 text-center"
    >
      <motion.span
        initial={reduced ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.08, duration: motionDuration(!!reduced, 320), ease: easeOut }}
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
      >
        <Icon className="h-7 w-7" />
      </motion.span>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && <p className="mt-2 max-w-xs text-sm text-slate-500">{description}</p>}
    </motion.div>
  );
}
