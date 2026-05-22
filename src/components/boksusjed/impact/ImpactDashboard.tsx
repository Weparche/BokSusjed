import { Download } from 'lucide-react';
import { impactMetrics, impactTimeline, VALID_POSITIONING_COPY } from '../../../data/boksusjedImpactMock';
import { ImpactMetricCard } from './ImpactMetricCard';

const SECTIONS = [
  { title: 'Povezanost susjeda', category: 'community' as const },
  { title: 'Pristupačnost kvarta', category: 'accessibility' as const },
  { title: 'Otpornost na poremećaje', category: 'resilience' as const },
  { title: 'Pomoć ranjivim skupinama', category: 'help' as const },
];

export function ImpactDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {impactMetrics.map((m) => (
          <ImpactMetricCard key={m.id} metric={m} />
        ))}
      </div>

      {SECTIONS.map((section) => {
        const items = impactMetrics.filter((m) => m.category === section.category);
        if (items.length === 0) return null;
        return (
          <section key={section.title}>
            <h2 className="font-display text-lg font-semibold text-ink">{section.title}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {items.map((m) => (
                <div key={m.id} className="rounded-[var(--radius-input)] border border-rule bg-paper-2 px-4 py-3">
                  <p className="text-sm font-semibold text-ink">
                    {m.value} · {m.label}
                  </p>
                  <p className="text-xs text-muted">{m.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section>
        <h2 className="font-display text-lg font-semibold text-ink">Primjer rješavanja prepreke</h2>
        <ol className="mt-4 space-y-3">
          {impactTimeline.map((step, i) => (
            <li key={step.step} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  step.done ? 'bg-accent text-accent-ink' : 'bg-paper-3 text-muted'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-sm ${step.done ? 'font-semibold text-ink' : 'text-muted'}`}>
                {step.step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <p className="rounded-[var(--radius-input)] bg-paper-3 px-4 py-3 text-sm text-ink-2">
        {VALID_POSITIONING_COPY}
      </p>

      <button type="button" className="btn-secondary tap-scale inline-flex w-full items-center justify-center gap-2 py-3 text-sm lg:max-w-sm">
        <Download className="h-4 w-4" />
        Preuzmi demo izvještaj
      </button>
    </div>
  );
}
