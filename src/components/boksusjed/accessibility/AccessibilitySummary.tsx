import { PRIVACY_LINES } from '../../../utils/moduleHelpers';

export function AccessibilitySummary() {
  return (
    <div className="rounded-[var(--radius-card)] border border-emerald-100 bg-emerald-50/60 p-4">
      <p className="text-sm font-medium text-emerald-900">
        Tvoje prijave pomažu roditeljima, starijima i osobama s invaliditetom sigurnije se kretati
        kvartom.
      </p>
      <p className="mt-2 text-xs text-emerald-800">{PRIVACY_LINES[0]}</p>
    </div>
  );
}
