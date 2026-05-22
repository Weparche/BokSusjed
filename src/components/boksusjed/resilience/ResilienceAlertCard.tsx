import { ArrowRight, Shield } from 'lucide-react';
import type { ResilienceAlert } from '../../../types/boksusjed';
import { alertStatusClass, alertStatusLabel } from '../../../utils/moduleHelpers';

interface ResilienceAlertCardProps {
  alert: ResilienceAlert;
  onAction?: () => void;
  actionLabel?: string;
}

export function ResilienceAlertCard({ alert, onAction, actionLabel }: ResilienceAlertCardProps) {
  return (
    <article className="surface-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-red-50 text-red-600">
            <Shield className="h-5 w-5" />
          </span>
          <div>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${alertStatusClass(alert.status)}`}
            >
              {alertStatusLabel(alert.status)}
            </span>
            <h3 className="mt-2 font-display text-base font-semibold text-ink">{alert.title}</h3>
            <p className="mt-1 text-sm text-muted">{alert.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink-2">
              {alert.expectedUntil && <span>Do {alert.expectedUntil}</span>}
              {alert.affectedHouseholds > 0 && (
                <span>· Pogođeno: {alert.affectedHouseholds} kućanstava</span>
              )}
              {alert.severity === 'high' && <span>· Prioritet: Visok</span>}
            </div>
          </div>
        </div>
      </div>
      {onAction && actionLabel && (
        <button type="button" onClick={onAction} className="btn-secondary tap-scale mt-4 w-full text-sm">
          {actionLabel}
          <ArrowRight className="ml-1 inline h-4 w-4" />
        </button>
      )}
    </article>
  );
}
