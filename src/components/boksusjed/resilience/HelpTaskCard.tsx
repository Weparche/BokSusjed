import { Check, HandHeart } from 'lucide-react';
import type { HelpTask } from '../../../types/boksusjed';
import { formatDistance } from '../../../utils/formatTime';
import { taskStatusLabel } from '../../../utils/moduleHelpers';

interface HelpTaskCardProps {
  task: HelpTask;
  onAccept?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function HelpTaskCard({ task, onAccept, onComplete }: HelpTaskCardProps) {
  const isOpen = task.status === 'open';
  const isAccepted = task.status === 'accepted';

  return (
    <article className="surface-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-violet-50 text-violet-600">
          <HandHeart className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800">
              {taskStatusLabel(task.status)}
            </span>
            {task.privacyLevel === 'protected' && (
              <span className="rounded-full bg-paper-3 px-2 py-0.5 text-[10px] font-bold uppercase text-muted">
                Privatno
              </span>
            )}
          </div>
          <h3 className="mt-2 font-display text-base font-semibold text-ink">{task.title}</h3>
          <p className="mt-1 text-sm text-muted">{task.description}</p>
          <p className="mt-2 text-xs font-semibold text-accent">
            {formatDistance(task.distanceMeters)}
          </p>
        </div>
      </div>
      {isOpen && onAccept && (
        <button
          type="button"
          onClick={() => onAccept(task.id)}
          className="btn-primary tap-scale mt-4 w-full text-sm"
        >
          Preuzmi zadatak
        </button>
      )}
      {isAccepted && onComplete && (
        <button
          type="button"
          onClick={() => onComplete(task.id)}
          className="btn-secondary tap-scale mt-4 inline-flex w-full items-center justify-center gap-2 text-sm"
        >
          <Check className="h-4 w-4" />
          Označi riješeno
        </button>
      )}
    </article>
  );
}
