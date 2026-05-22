import type { VulnerableHouseholdSummary } from '../../../types/boksusjed';
import { PRIVACY_LINES } from '../../../utils/moduleHelpers';

interface ResilienceSummaryProps {
  summary: VulnerableHouseholdSummary;
}

export function ResilienceSummary({ summary }: ResilienceSummaryProps) {
  const items = [
    `${summary.checkInRequested} kućanstava označilo je da želi check-in tijekom krize`,
    `${summary.waterHelpNeeded} korisnika trebaju pomoć s dostavom vode`,
    `${summary.notificationsOnly} korisnika želi samo obavijesti`,
    `${summary.limitedMobility} korisnika imaju ograničenu pokretljivost`,
  ];

  return (
    <div className="surface-card p-4">
      <h3 className="font-display font-semibold text-ink">Ranjiva kućanstva</h3>
      <p className="mt-1 text-xs text-muted">Agregirano i privatnosno sigurno — bez stvarnih adresa.</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">{PRIVACY_LINES[0]}</p>
    </div>
  );
}
