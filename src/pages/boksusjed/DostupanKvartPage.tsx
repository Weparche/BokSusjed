import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import type { AccessibilityFilter } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { matchesAccessibilityFilter } from '../../utils/moduleHelpers';
import { AccessibilityFilterChips } from '../../components/boksusjed/accessibility/AccessibilityFilterChips';
import { AccessibilityPointCard } from '../../components/boksusjed/accessibility/AccessibilityPointCard';
import { AccessibilityReportForm } from '../../components/boksusjed/accessibility/AccessibilityReportForm';
import { AccessibilitySummary } from '../../components/boksusjed/accessibility/AccessibilitySummary';
import { EmptyState } from '../../components/boksusjed/EmptyState';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

export function DostupanKvartPage() {
  const { accessibilityPoints, confirmAccessibility, reportAccessibility } = useBoksusjed();
  const [filter, setFilter] = useState<AccessibilityFilter>('all');

  const filtered = useMemo(
    () => accessibilityPoints.filter((p) => matchesAccessibilityFilter(p.type, filter)),
    [accessibilityPoints, filter],
  );

  return (
    <PageLayout aside={null}>
      <PageHeader
        title="DostupanKvart"
        subtitle="Pronađi mjesta dostupna za kolica, starije i osobe smanjene pokretljivosti."
        showBack
      />

      <div className="page-container space-y-6 px-4 pb-8 pt-3 lg:px-0 lg:pt-4">
        <div className="surface-card border-emerald-100 bg-gradient-to-br from-emerald-50/70 to-paper-2 p-5">
          <h2 className="font-display text-xl font-semibold text-ink">Kvart koji svi mogu koristiti</h2>
          <p className="mt-2 text-sm text-muted">
            Označi rampe, liftove, opasne rubnike, baby-friendly mjesta i lokacije dostupne osobama
            s invaliditetom.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link to="/boksusjed/objavi" className="btn-primary tap-scale flex-1 py-3 text-center text-sm">
              Dodaj pristupačnost
            </Link>
            <a href="#prijava-prepreke" className="btn-secondary tap-scale flex-1 py-3 text-center text-sm">
              Prijavi prepreku
            </a>
          </div>
        </div>

        <AccessibilitySummary />

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Filteri pristupačnosti
          </p>
          <AccessibilityFilterChips active={filter} onChange={setFilter} />
        </div>

        <section>
          {filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nema prijavljenih prepreka za ovaj filter."
              description="Budi prvi susjed koji će označiti pristupačnu lokaciju."
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((point) => (
                <AccessibilityPointCard
                  key={point.id}
                  point={point}
                  onConfirm={confirmAccessibility}
                />
              ))}
            </div>
          )}
        </section>

        <div id="prijava-prepreke">
          <AccessibilityReportForm
            onSubmit={(data) =>
              reportAccessibility({
                ...data,
                status: 'reported',
              })
            }
          />
        </div>
      </div>
    </PageLayout>
  );
}
