import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { neighborhood } from '../../data/boksusjedMock';
import type { GeoPoint } from '../../utils/geo';
import type { PostModule, PostType, SafePointService, TaskUrgency } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { CREATE_POST_GROUPS } from '../../utils/postHelpers';
import { easeOut, motionDuration, pillTransition } from '../../utils/motion';
import { LocationPicker } from '../../components/boksusjed/LocationPicker';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

const BARRIER_OPTIONS = [
  'Stepenice bez rampe',
  'Pokvaren lift',
  'Visoki rubnik',
  'Uski ulaz',
  'Nema WC-a',
  'Nepristupačan prijelaz',
  'Drugo',
];

const SAFE_SERVICES: { id: SafePointService; label: string }[] = [
  { id: 'water', label: 'Voda' },
  { id: 'cooling', label: 'Hlađenje' },
  { id: 'heating', label: 'Grijanje' },
  { id: 'charging', label: 'Punjenje mobitela' },
  { id: 'assistance', label: 'Pomoć djelatnika' },
];

function moduleForType(type: PostType): PostModule {
  for (const group of CREATE_POST_GROUPS) {
    if (group.types.some((t) => t.type === type)) return group.module;
  }
  return 'daily';
}

export function CreatePostPage() {
  const navigate = useNavigate();
  const { addPost, showToast } = useBoksusjed();
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);

  const [type, setType] = useState<PostType>('announcement');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [location, setLocation] = useState('');
  const [mapPoint, setMapPoint] = useState<GeoPoint | null>(null);
  const [urgency, setUrgency] = useState<TaskUrgency>('medium');
  const [privacy, setPrivacy] = useState<'public' | 'protected'>('protected');
  const [barrierType, setBarrierType] = useState(BARRIER_OPTIONS[0]);
  const [openingHours, setOpeningHours] = useState('09:00–18:00');
  const [safeServices, setSafeServices] = useState<SafePointService[]>(['water']);
  const [submitting, setSubmitting] = useState(false);

  const isBarrier = type === 'accessibility_barrier';
  const isCrisisHelp = type === 'crisis_help_needed' || type === 'crisis_help_offered';
  const isSafePoint = type === 'safe_point';

  const toggleService = (id: SafePointService) => {
    setSafeServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || submitting) return;

    setSubmitting(true);

    window.setTimeout(() => {
      addPost({
        type,
        title: title.trim(),
        description: description.trim(),
        neighborhood: neighborhood.name,
        tag: tag.trim() || undefined,
        location: location.trim() || undefined,
        lat: mapPoint?.lat,
        lng: mapPoint?.lng,
        module: moduleForType(type),
        urgency: isCrisisHelp ? urgency : undefined,
        privacyLevel: isCrisisHelp ? privacy : undefined,
        barrierType: isBarrier ? barrierType : undefined,
        safePointServices: isSafePoint ? safeServices : undefined,
        openingHours: isSafePoint ? openingHours : undefined,
      });

      showToast(
        mapPoint
          ? `Objava je dodana u ${neighborhood.name} i vidljiva je na karti.`
          : `Objava je dodana u ${neighborhood.name}.`,
      );
      navigate('/boksusjed');
    }, reduced ? 0 : 180);
  };

  const activeGroup = useMemo(
    () => CREATE_POST_GROUPS.find((g) => g.types.some((t) => t.type === type)),
    [type],
  );

  return (
    <PageLayout aside={null}>
      <PageHeader title="Što želiš objaviti?" showBack />

      <form
        onSubmit={handleSubmit}
        className="page-container mx-auto max-w-2xl space-y-5 px-4 pt-3 lg:px-0 lg:pt-4"
      >
        {CREATE_POST_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="field-label">{group.label}</p>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {group.types.map((item) => {
                const Icon = item.icon;
                const isActive = type === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setType(item.type)}
                    className={`relative flex items-center gap-2 rounded-[var(--radius-input)] px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                      isActive ? 'text-accent-strong' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="postTypeActive"
                        className="absolute inset-0 rounded-[var(--radius-input)] border-2 border-accent bg-accent-soft ring-2 ring-accent/20"
                        transition={transition}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-[var(--radius-input)] border border-rule bg-paper-2 hover:border-rule-2" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs sm:text-sm">{item.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {activeGroup && activeGroup.module !== 'daily' && (
          <p className="rounded-[var(--radius-input)] bg-paper-3 px-4 py-2 text-xs text-muted">
            {activeGroup.module === 'resilience'
              ? 'Krizne potrebe dijele se samo uz tvoju privolu.'
              : 'Lokacija se prikazuje okvirno — puna adresa nije javno vidljiva.'}
          </p>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-5">
          <div className="lg:col-span-2">
            <label htmlFor="title" className="field-label">
              Naslov
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kratko i jasno..."
              required
              className="field-input"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="description" className="field-label">
              Opis
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opiši što susjedi trebaju znati..."
              required
              rows={4}
              className="field-input resize-none lg:min-h-[140px]"
            />
          </div>

          {isBarrier && (
            <div className="lg:col-span-2">
              <label htmlFor="barrier-type" className="field-label">
                Tip prepreke
              </label>
              <select
                id="barrier-type"
                value={barrierType}
                onChange={(e) => setBarrierType(e.target.value)}
                className="field-input"
              >
                {BARRIER_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isCrisisHelp && (
            <>
              <div>
                <label htmlFor="urgency" className="field-label">
                  Hitnost
                </label>
                <select
                  id="urgency"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as TaskUrgency)}
                  className="field-input"
                >
                  <option value="low">Niska</option>
                  <option value="medium">Srednja</option>
                  <option value="high">Visoka</option>
                </select>
              </div>
              <div>
                <label htmlFor="privacy" className="field-label">
                  Vidljivost
                </label>
                <select
                  id="privacy"
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value as 'public' | 'protected')}
                  className="field-input"
                >
                  <option value="protected">Privatno (preporučeno)</option>
                  <option value="public">Javno u kvartu</option>
                </select>
              </div>
            </>
          )}

          {isSafePoint && (
            <>
              <div className="lg:col-span-2">
                <p className="field-label">Što nudi sigurna točka</p>
                <div className="flex flex-wrap gap-2">
                  {SAFE_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        safeServices.includes(s.id)
                          ? 'bg-accent text-accent-ink'
                          : 'bg-paper-3 text-ink-2'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="hours" className="field-label">
                  Radno vrijeme
                </label>
                <input
                  id="hours"
                  value={openingHours}
                  onChange={(e) => setOpeningHours(e.target.value)}
                  className="field-input"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="tag" className="field-label">
              Kategorija
            </label>
            <input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="npr. Majstori"
              className="field-input"
            />
          </div>

          <div>
            <label htmlFor="neighborhood" className="field-label">
              Kvart
            </label>
            <input id="neighborhood" value={neighborhood.name} readOnly className="field-input" />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="location" className="field-label">
              Opis lokacije (opcionalno)
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="npr. Ulica grada Vukovara — bez broja kuće"
              className="field-input"
            />
          </div>

          <div className="lg:col-span-2">
            <LocationPicker value={mapPoint} onChange={setMapPoint} />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={!title.trim() || !description.trim() || submitting}
          whileTap={reduced || submitting ? undefined : { scale: 0.98 }}
          animate={submitting && !reduced ? { scale: [1, 0.98, 1] } : { scale: 1 }}
          transition={{ duration: motionDuration(!!reduced, 180), ease: easeOut }}
          className="btn-primary tap-scale w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-50 lg:max-w-md"
        >
          {submitting ? 'Objavljujem...' : 'Objavi u kvartu'}
        </motion.button>
      </form>
    </PageLayout>
  );
}
