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
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-600 to-emerald-700 p-4 text-white shadow-lg shadow-emerald-900/10">
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="absolute right-3 top-3 rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
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
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15"
              >
                <Sparkles className="h-5 w-5" />
              </motion.span>
              <div>
                <p className="font-bold">Dobrodošao u Trešnjevku 👋</p>
                <p className="mt-1 text-sm text-emerald-50/90">
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
    <div className="flex items-start gap-3 rounded-[1.25rem] border border-sky-100 bg-sky-50/80 px-4 py-3">
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
      <p className="text-sm text-sky-900">
        <span className="font-semibold">Privatno i sigurno:</span> puna adresa nije javno vidljiva.
      </p>
    </div>
  );
}

export function InviteCta() {
  return (
    <Link
      to="/boksusjed/profil"
      className="tap-scale flex items-center justify-between rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-brand-600">
          <UserPlus className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800">Pozovi susjeda</p>
          <p className="text-xs text-slate-500">Samo tvoj kvart</p>
        </div>
      </div>
      <span className="text-xs font-semibold text-brand-600">Pozovi →</span>
    </Link>
  );
}

export function HelpInfoBanner() {
  return (
    <div className="rounded-[1.5rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-4">
      <p className="font-bold text-emerald-900">Pomažemo s povjerenjem 💚</p>
      <p className="mt-1 text-sm text-emerald-800/80">
        Svi korisnici su iz tvoje četvrti. Ljubaznost je naša supermoć!
      </p>
    </div>
  );
}
