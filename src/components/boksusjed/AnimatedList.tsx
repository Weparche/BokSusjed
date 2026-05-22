import type { ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/motion';

interface AnimatedListProps {
  listKey: string;
  className?: string;
  children: ReactNode;
}

export function AnimatedList({ listKey, className, children }: AnimatedListProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={listKey}
        className={className}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={staggerContainer(!!reduced)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface AnimatedListItemProps {
  className?: string;
  children: ReactNode;
}

export function AnimatedListItem({ className, children }: AnimatedListItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div className={className} variants={staggerItem(!!reduced)}>
      {children}
    </motion.div>
  );
}
