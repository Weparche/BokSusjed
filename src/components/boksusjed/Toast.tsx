import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { easeOut, motionDuration } from '../../utils/motion';

export function ToastContainer() {
  const { toasts, dismissToast } = useBoksusjed();
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: motionDuration(!!reduced, 250), ease: easeOut }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-[var(--radius-card)] border border-rule bg-paper-2 px-4 py-3 shadow-[var(--shadow-lift)]"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
            <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-full p-1 text-muted hover:bg-paper-3 hover:text-ink-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              aria-label="Zatvori"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
