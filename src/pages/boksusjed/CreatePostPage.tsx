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
          <p className="mb-2 text-sm font-semibold text-slate-700">Tip objave</p>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {CREATE_POST_TYPES.map((item) => {
              const Icon = item.icon;
              const isActive = type === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setType(item.type)}
                  className={`relative flex items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="postTypeActive"
                      className="absolute inset-0 rounded-2xl border-2 border-brand-500 bg-emerald-50 ring-2 ring-brand-500/20"
                      transition={transition}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-2xl border border-slate-200 bg-white hover:border-slate-300" />
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
            <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Naslov
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kratko i jasno..."
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Opis
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opiši što susjedi trebaju znati..."
              required
              rows={4}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 lg:min-h-[140px]"
            />
          </div>

          <div>
            <label htmlFor="tag" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Kategorija
            </label>
            <input
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="npr. Majstori"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label htmlFor="neighborhood" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Kvart
            </label>
            <input
              id="neighborhood"
              value={neighborhood.name}
              readOnly
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-slate-700">
              Opis lokacije (opcionalno)
            </label>
            <input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="npr. Ulica grada Vukovara — bez broja kuće"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
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
          className="w-full rounded-2xl bg-brand-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 lg:max-w-md"
        >
          {submitting ? 'Objavljujem...' : 'Objavi u kvartu'}
        </motion.button>
      </form>
    </PageLayout>
  );
}
