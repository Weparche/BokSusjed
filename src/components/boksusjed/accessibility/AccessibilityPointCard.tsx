import { Check, ThumbsUp } from 'lucide-react';
import type { AccessibilityPoint } from '../../../types/boksusjed';
import { accessibilityStatusLabel } from '../../../utils/moduleHelpers';

interface AccessibilityPointCardProps {
  point: AccessibilityPoint;
  onConfirm?: (id: string) => void;
}

export function AccessibilityPointCard({ point, onConfirm }: AccessibilityPointCardProps) {
  const isBarrier = ['dangerous_curb', 'broken_elevator', 'inaccessible_entrance'].includes(
    point.type,
  );

  return (
    <article className="surface-card p-4">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] ${
            isBarrier ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          <ThumbsUp className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              isBarrier
                ? 'border-red-200 bg-red-100 text-red-800'
                : 'border-emerald-200 bg-emerald-100 text-emerald-800'
            }`}
          >
            {isBarrier ? 'Prijavljena prepreka' : accessibilityStatusLabel(point.status)}
          </span>
          <h3 className="mt-2 font-display text-base font-semibold text-ink">{point.title}</h3>
          <p className="mt-1 text-sm text-muted">{point.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {point.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-semibold text-ink-2"
              >
                {tag}
              </span>
            ))}
          </div>
          {!isBarrier && point.confirmationsCount > 0 && (
            <p className="mt-2 text-xs font-medium text-accent">
              Potvrdilo {point.confirmationsCount} susjeda
            </p>
          )}
        </div>
      </div>
      {!isBarrier && onConfirm && (
        <button
          type="button"
          onClick={() => onConfirm(point.id)}
          className="btn-secondary tap-scale mt-4 inline-flex w-full items-center justify-center gap-2 text-sm"
        >
          <Check className="h-4 w-4" />
          Potvrdi pristupačnost
        </button>
      )}
    </article>
  );
}
