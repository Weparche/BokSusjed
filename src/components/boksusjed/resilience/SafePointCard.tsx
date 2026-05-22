import { MapPin, ShieldCheck } from 'lucide-react';
import type { SafePoint, SafePointService } from '../../../types/boksusjed';

const SERVICE_LABELS: Record<SafePointService, string> = {
  water: 'Voda',
  cooling: 'Hlađenje',
  heating: 'Grijanje',
  charging: 'Punjenje mobitela',
  pharmacy: 'Ljekarna',
  shelter: 'Sklonište',
  assistance: 'Pomoć djelatnika',
};

interface SafePointCardProps {
  point: SafePoint;
}

export function SafePointCard({ point }: SafePointCardProps) {
  return (
    <article className="surface-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-sky-50 text-sky-600">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800">
            Sigurna točka
          </span>
          <h3 className="mt-2 font-display text-base font-semibold text-ink">{point.name}</h3>
          <p className="mt-1 text-sm text-muted">{point.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {point.services.map((s) => (
              <span
                key={s}
                className="rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-semibold text-ink-2"
              >
                {SERVICE_LABELS[s] ?? s}
              </span>
            ))}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3 w-3" />
            {point.openingHours}
          </p>
        </div>
      </div>
    </article>
  );
}
