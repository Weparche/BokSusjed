import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Home, MapPin, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { inviteLink, profileStats } from '../../data/boksusjedMock';
import { VALID_POSITIONING_COPY } from '../../data/boksusjedImpactMock';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { VERIFIED_LABELS } from '../../types/boksusjed';
import { PRIVACY_DISCLAIMER, PRIVACY_LINES } from '../../utils/moduleHelpers';
import { easeOut, motionDuration } from '../../utils/motion';
import { Avatar } from '../../components/boksusjed/Avatar';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';
import { VerifiedBadge } from '../../components/boksusjed/VerifiedBadge';

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-input)] border border-rule bg-paper-2 px-4 py-3">
      <span className="text-sm font-medium text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-accent' : 'bg-paper-3'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  );
}

export function ProfilePage() {
  const { currentUser, profilePrefs, updateProfilePrefs } = useBoksusjed();
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

  const prefToggles: { key: keyof typeof profilePrefs; label: string }[] = [
    { key: 'crisisAlerts', label: 'Želim primati krizne obavijesti' },
    { key: 'canHelpInCrisis', label: 'Mogu pomoći susjedima u krizi' },
    { key: 'markHouseholdNeeds', label: 'Želim označiti potrebe kućanstva' },
    { key: 'usesStroller', label: 'Koristim dječja kolica' },
    { key: 'limitedMobility', label: 'Imam ograničenu pokretljivost' },
    { key: 'privateCheckInOnly', label: 'Želim samo privatne check-in obavijesti' },
  ];

  const needToggles: { key: keyof typeof profilePrefs; label: string }[] = [
    { key: 'livesAlone', label: 'Osoba živi sama' },
    { key: 'needsPowerOutageHelp', label: 'Treba pomoć kod nestanka struje' },
    { key: 'needsWaterOutageHelp', label: 'Treba pomoć kod nestanka vode' },
    { key: 'needsStepFreeAccess', label: 'Treba pristup bez stepenica' },
    { key: 'needsMedicineHelp', label: 'Treba pomoć s lijekovima' },
  ];

  return (
    <PageLayout aside={null}>
      <PageHeader title="Profil" subtitle="Povjerenje i privatnost." />

      <div className="page-container px-4 pt-2 lg:px-0 lg:pt-4">
        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          <div className="lg:col-span-2">
            <div className="surface-card p-5 lg:p-6">
              <div className="flex items-center gap-4">
                <Avatar name={currentUser.name} size="lg" />
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink lg:text-2xl">
                    {currentUser.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    {currentUser.neighborhood}
                  </div>
                  <div className="mt-2">
                    <VerifiedBadge level={currentUser.verifiedLevel} size="md" />
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {VERIFIED_LABELS[currentUser.verifiedLevel]}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 rounded-[var(--radius-input)] bg-paper-3 px-4 py-3 text-sm text-ink-2 lg:mt-6">
              {PRIVACY_LINES[0]}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-card px-4 py-3 text-center shadow-none">
                  <p className="font-display text-2xl font-semibold text-accent">{stat.value}</p>
                  <p className="text-xs font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              to="/boksusjed/impact"
              className="mt-4 block rounded-[var(--radius-input)] border border-accent-soft bg-accent-soft/40 px-4 py-3 text-sm font-semibold text-accent-strong"
            >
              Vidi učinak u kvartu →
            </Link>
          </div>

          <div className="mt-6 lg:col-span-3 lg:mt-0">
            <div className="grid gap-2">
              {verificationCards.map((card) => (
                <div
                  key={card.label}
                  className="flex items-center gap-3 rounded-[var(--radius-input)] border border-accent-soft bg-accent-soft/50 px-4 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-btn)] bg-paper-2 text-accent shadow-[var(--shadow-card)]">
                    <card.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-ink">{card.label}</span>
                  {card.done && <Check className="h-5 w-5 text-accent" />}
                </div>
              ))}
            </div>

            <div className="surface-card mt-6 p-4 lg:p-6">
              <h3 className="font-display font-semibold text-ink">Moja sigurnost i pristupačnost</h3>
              <p className="mt-1 text-xs text-muted">{PRIVACY_LINES[1]}</p>
              <div className="mt-4 space-y-2">
                {prefToggles.map(({ key, label }) => (
                  <ToggleRow
                    key={key}
                    label={label}
                    checked={Boolean(profilePrefs[key])}
                    onChange={(v) => updateProfilePrefs({ [key]: v })}
                  />
                ))}
              </div>
            </div>

            <div className="surface-card mt-4 p-4 lg:p-6">
              <h3 className="font-display font-semibold text-ink">Privatni profil potreba</h3>
              <p className="mt-1 text-xs text-muted">Agregirano u demo verziji — bez javnih adresa.</p>
              <div className="mt-4 space-y-2">
                {needToggles.map(({ key, label }) => (
                  <ToggleRow
                    key={key}
                    label={label}
                    checked={Boolean(profilePrefs[key])}
                    onChange={(v) => updateProfilePrefs({ [key]: v })}
                  />
                ))}
              </div>
              <div className="mt-4">
                <label htmlFor="emergency-contact" className="field-label">
                  Kontakt člana obitelji (demo)
                </label>
                <input
                  id="emergency-contact"
                  value={profilePrefs.emergencyContact}
                  onChange={(e) => updateProfilePrefs({ emergencyContact: e.target.value })}
                  placeholder="Samo za demo — ne sprema se stvarno"
                  className="field-input"
                />
              </div>
              <p className="mt-3 text-xs text-muted">{PRIVACY_DISCLAIMER}</p>
            </div>

            <p className="mt-4 rounded-[var(--radius-input)] bg-paper-3 px-4 py-3 text-xs text-ink-2">
              {VALID_POSITIONING_COPY}
            </p>

            <div className="surface-card mt-6 p-4 lg:p-6">
              <h3 className="font-display font-semibold text-ink">Pozovi susjeda</h3>
              <p className="mt-1 text-sm text-muted">
                Podijeli pozivnicu i proširi kvartovsku mrežu povjerenja.
              </p>
              <motion.button
                type="button"
                onClick={handleCopyInvite}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="btn-primary tap-scale mt-4 w-full px-4 py-3 text-sm lg:max-w-sm"
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
