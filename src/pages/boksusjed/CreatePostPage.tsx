import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { neighborhood } from '../../data/boksusjedMock';
import type { GeoPoint } from '../../utils/geo';
import type { PostType } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { CREATE_POST_TYPES } from '../../utils/postHelpers';
import { easeOut, motionDuration, pillTransition } from '../../utils/motion';
import { LocationPicker } from '../../components/boksusjed/LocationPicker';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

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
  const [submitting, setSubmitting] = useState(false);

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
      });

      showToast(
        mapPoint
          ? `Objava je dodana u ${neighborhood.name} i vidljiva je na karti.`
          : `Objava je dodana u ${neighborhood.name}.`,
      );
      navigate('/boksusjed');
    }, reduced ? 0 : 180);
  };

  return (
    <PageLayout aside={null}>
      <PageHeader title="Što želiš objaviti?" showBack />

      <form onSubmit={handleSubmit} className="page-container mx-auto max-w-2xl space-y-5 px-4 pt-3 lg:px-0 lg:pt-4">
        <div>
          <p className="field-label">Tip objave</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {CREATE_POST_TYPES.map((item) => {
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
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
