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

const categorySurfaces = {
  majstori: 'bg-trust text-trust-ink',
  hrana: 'bg-warm text-warm-ink',
  djeca: 'bg-paper-3 text-ink',
  ljepota: 'bg-accent-soft text-accent-strong',
  ljubimci: 'bg-warm text-warm-ink',
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
  const surface = categorySurfaces[service.category];

  return (
    <motion.article
      whileHover={
        canHover && !reduced
          ? { y: -2, boxShadow: 'var(--shadow-lift)' }
          : undefined
      }
      transition={{ duration: motionDuration(!!reduced, 200) }}
      className="surface-card surface-card-hover p-4 md:transition-shadow"
    >
      <div className="flex gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-card)] ${surface}`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-ink">{service.name}</h3>
              <p className="text-xs font-medium text-accent">
                Preporučilo {service.recommendedByCount} susjeda
              </p>
            </div>
            <span className="rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
              {SERVICE_CATEGORY_LABELS[service.category]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{service.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {service.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent-strong"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            {service.phone && (
              <a
                href={`tel:${service.phone.replace(/\s/g, '')}`}
                className="btn-primary tap-scale flex-1 px-3 py-2.5 text-sm"
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
                className="btn-secondary tap-scale flex-1 border-accent-soft bg-accent-soft/50 px-3 py-2.5 text-sm text-accent-strong hover:bg-accent-soft"
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
