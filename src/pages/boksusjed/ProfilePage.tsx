import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Home, MapPin, Phone, Shield } from 'lucide-react';
import { inviteLink, profileStats } from '../../data/boksusjedMock';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { VERIFIED_LABELS } from '../../types/boksusjed';
import { easeOut, motionDuration } from '../../utils/motion';
import { Avatar } from '../../components/boksusjed/Avatar';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';
import { VerifiedBadge } from '../../components/boksusjed/VerifiedBadge';

export function ProfilePage() {
  const { currentUser } = useBoksusjed();
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch {
      // fallback
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const verificationCards = [
    { icon: Phone, label: 'Mobitel potvrđen', done: true },
    { icon: Home, label: 'Kvart potvrđen', done: true },
    { icon: Shield, label: 'Adresa nije javno vidljiva', done: true },
  ];

  const stats = [
    { value: profileStats.posts, label: 'objava' },
    { value: profileStats.comments, label: 'komentara' },
    { value: profileStats.recommendations, label: 'preporuka' },
    { value: profileStats.help, label: 'pomoći susjedima' },
  ];

  return (
    <PageLayout aside={null}>
      <PageHeader title="Profil" subtitle="Povjerenje i privatnost." />

      <div className="page-container px-4 pt-2 lg:px-0 lg:pt-4">
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-center gap-4">
                <Avatar name={currentUser.name} size="lg" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 lg:text-2xl">{currentUser.name}</h2>
                  <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {currentUser.neighborhood}
                  </div>
                  <div className="mt-2">
                    <VerifiedBadge level={currentUser.verifiedLevel} size="md" />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {VERIFIED_LABELS[currentUser.verifiedLevel]}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600 lg:mt-6">
              Tvoja puna adresa se nikad ne prikazuje javno.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm"
                >
                  <p className="text-2xl font-extrabold text-brand-600">{stat.value}</p>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="grid gap-2">
              {verificationCards.map((card) => (
                <div
                  key={card.label}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 px-4 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                    <card.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-800">{card.label}</span>
                  {card.done && <Check className="h-5 w-5 text-brand-600" />}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
              <h3 className="font-bold text-slate-900">Pozovi susjeda</h3>
              <p className="mt-1 text-sm text-slate-500">
                Podijeli pozivnicu i proširi kvartovsku mrežu povjerenja.
              </p>
              <motion.button
                type="button"
                onClick={handleCopyInvite}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-brand-700 lg:max-w-sm"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span
                      key="copied"
                      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: [0.85, 1.12, 1] }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: motionDuration(!!reduced, 280), ease: easeOut }}
                      className="inline-flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      Kopirano!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: motionDuration(!!reduced, 150) }}
                      className="inline-flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Kopiraj pozivnicu
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
