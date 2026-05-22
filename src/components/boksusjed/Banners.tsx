import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Sparkles, UserPlus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collapseTransition, easeOut } from '../../utils/motion';

interface OnboardingBannerProps {
  visible: boolean;
  onDismiss?: () => void;
}

export function OnboardingBanner({ visible, onDismiss }: OnboardingBannerProps) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0, marginBottom: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto', marginBottom: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0, marginBottom: 0 }}
          transition={collapseTransition(!!reduced)}
          className="overflow-hidden"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-accent-soft bg-accent p-4 text-accent-ink shadow-[var(--shadow-card)]">
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="absolute right-3 top-3 rounded-full p-1 text-accent-ink/70 hover:bg-accent-strong/20 hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
                aria-label="Zatvori"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="flex items-start gap-3 pr-6">
              <motion.span
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduced ? 0 : 0.1, duration: 0.25, ease: easeOut }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-accent-ink/15"
              >
                <Sparkles className="h-5 w-5" />
              </motion.span>
              <div>
                <p className="font-display font-semibold">Dobrodošao u Trešnjevku 👋</p>
                <p className="mt-1 text-sm text-accent-ink/85">
                  Ovdje susjedi dijele preporuke, obavijesti i male usluge.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TrustBanner() {
  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-card)] border border-trust bg-trust px-4 py-3">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-trust-ink" />
      <p className="text-sm text-trust-ink">
        <span className="font-semibold">Privatno i sigurno:</span> puna adresa nije javno vidljiva.
      </p>
    </div>
  );
}

export function InviteCta() {
  return (
    <Link
      to="/boksusjed/profil"
      className="tap-scale surface-card surface-card-hover flex items-center justify-between px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-btn)] bg-accent-soft text-accent">
          <UserPlus className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Pozovi susjeda</p>
          <p className="text-xs text-muted">Samo tvoj kvart</p>
        </div>
      </div>
      <span className="text-xs font-semibold text-accent">Pozovi →</span>
    </Link>
  );
}

export function HelpInfoBanner() {
  return (
    <div className="rounded-[var(--radius-card)] border border-accent-soft bg-accent-soft/60 p-4">
      <p className="font-display font-semibold text-accent-strong">Pomažemo s povjerenjem 💚</p>
      <p className="mt-1 text-sm text-ink-2">
        Svi korisnici su iz tvoje četvrti. Ljubaznost je naša supermoć!
      </p>
    </div>
  );
}

export function WarmCrossLink({
  to,
  title,
  description,
  className = '',
}: {
  to: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`tap-scale warm-panel block rounded-[var(--radius-card)] px-4 py-3 text-sm font-semibold transition hover:shadow-[var(--shadow-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${className}`}
    >
      {title}
      <span className="mt-1 block text-xs font-normal opacity-85">{description}</span>
    </Link>
  );
}
