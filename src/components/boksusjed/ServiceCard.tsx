import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageCircle, Star, Wrench } from 'lucide-react';
import type { ServiceRecommendation } from '../../types/boksusjed';
import { SERVICE_CATEGORY_LABELS } from '../../types/boksusjed';
import { motionDuration } from '../../utils/motion';

interface ServiceCardProps {
  service: ServiceRecommendation;
}

const categoryIcons = {
  majstori: Wrench,
  hrana: Star,
  djeca: Star,
  ljepota: Star,
  ljubimci: Star,
};

const categoryColors = {
  majstori: 'from-sky-400 to-blue-500',
  hrana: 'from-orange-400 to-amber-500',
  djeca: 'from-violet-400 to-purple-500',
  ljepota: 'from-pink-400 to-rose-500',
  ljubimci: 'from-amber-400 to-yellow-500',
};

export function ServiceCard({ service }: ServiceCardProps) {
  const reduced = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (min-width: 768px)');
    const update = () => setCanHover(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const Icon = categoryIcons[service.category];
  const gradient = categoryColors[service.category];

  return (
    <motion.article
      whileHover={
        canHover && !reduced
          ? { y: -2, boxShadow: '0 8px 24px -8px rgba(15, 23, 42, 0.12)' }
          : undefined
      }
      transition={{ duration: motionDuration(!!reduced, 200) }}
      className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm md:transition-shadow"
    >
      <div className="flex gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${gradient}`}
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900">{service.name}</h3>
              <p className="text-xs font-medium text-brand-600">
                Preporučilo {service.recommendedByCount} susjeda
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              {SERVICE_CATEGORY_LABELS[service.category]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {service.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            {service.phone && (
              <a
                href={`tel:${service.phone.replace(/\s/g, '')}`}
                className="tap-scale inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                <Phone className="h-4 w-4" />
                Nazovi
              </a>
            )}
            {service.whatsapp && (
              <a
                href={`https://wa.me/${service.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-scale inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
