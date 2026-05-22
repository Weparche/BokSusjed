import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Accessibility } from 'lucide-react';
import { impactMetrics } from '../../data/boksusjedImpactMock';

interface ModulePromoCardsProps {
  alertCount?: number;
  openTasks?: number;
  newAccessibility?: number;
}

export function ModulePromoCards({
  alertCount = 2,
  openTasks = 4,
  newAccessibility = 12,
}: ModulePromoCardsProps) {
  return (
    <div className="space-y-3">
      <Link
        to="/boksusjed/otporan-kvart"
        className="surface-card group block border-orange-100 bg-gradient-to-br from-orange-50/80 to-paper-2 p-4 transition-shadow hover:shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-orange-100 text-orange-700">
            <Shield className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-ink">OtporanKvart aktivan</h3>
            <p className="mt-1 text-sm text-muted">
              {alertCount} lokalna upozorenja i {openTasks} otvorena zadatka pomoći u tvojoj blizini.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2">
              Vidi krizne zadatke
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <Link
        to="/boksusjed/dostupan-kvart"
        className="surface-card group block border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-paper-2 p-4 transition-shadow hover:shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] bg-emerald-100 text-emerald-700">
            <Accessibility className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-ink">DostupanKvart</h3>
            <p className="mt-1 text-sm text-muted">
              {newAccessibility} novih oznaka pristupačnosti u Trešnjevci. Pomogni označiti rampe,
              liftove i prepreke.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2">
              Vidi kartu pristupačnosti
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>

      <ImpactSummaryStrip />
    </div>
  );
}

export function ImpactSummaryStrip() {
  const highlights = impactMetrics.slice(0, 4);
  return (
    <div className="rounded-[var(--radius-input)] border border-rule bg-paper-3/80 px-3 py-3">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {highlights.map((m) => (
          <span key={m.id} className="text-xs font-semibold text-ink-2">
            <span className="text-accent">{m.value}</span> {m.label.toLowerCase()}
          </span>
        ))}
      </div>
      <Link
        to="/boksusjed/impact"
        className="mt-2 inline-flex text-xs font-semibold text-accent hover:underline"
      >
        Vidi učinak u kvartu →
      </Link>
    </div>
  );
}
