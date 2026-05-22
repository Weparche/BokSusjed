import { Link } from 'react-router-dom';
import { ListTodo, Shield } from 'lucide-react';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { vulnerableSummary } from '../../data/boksusjedResilienceMock';
import { PRIVACY_LINES } from '../../utils/moduleHelpers';
import { CrisisCheckInCard } from '../../components/boksusjed/resilience/CrisisCheckInCard';
import { HelpTaskCard } from '../../components/boksusjed/resilience/HelpTaskCard';
import { ResilienceAlertCard } from '../../components/boksusjed/resilience/ResilienceAlertCard';
import { ResilienceSummary } from '../../components/boksusjed/resilience/ResilienceSummary';
import { SafePointCard } from '../../components/boksusjed/resilience/SafePointCard';
import { EmptyState } from '../../components/boksusjed/EmptyState';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

export function OtporanKvartPage() {
  const {
    resilienceAlerts,
    helpTasks,
    safePoints,
    acceptHelpTask,
    completeHelpTask,
    submitCheckIn,
    lastCheckIn,
    showToast,
  } = useBoksusjed();

  const activeAlerts = resilienceAlerts.filter((a) => a.status !== 'resolved');
  const openTasks = helpTasks.filter((t) => t.status !== 'completed');

  return (
    <PageLayout aside={null}>
      <PageHeader
        title="OtporanKvart"
        subtitle="Kad se dogodi problem u kvartu, susjedi znaju kome treba pomoć."
        showBack
      />

      <div className="page-container space-y-6 px-4 pb-8 pt-3 lg:px-0 lg:pt-4">
        <div className="surface-card border-orange-100 bg-gradient-to-br from-orange-50/70 to-paper-2 p-5">
          <h2 className="font-display text-xl font-semibold text-ink">
            Otporniji kvart počinje od susjeda
          </h2>
          <p className="mt-2 text-sm text-muted">
            Prati lokalne poremećaje, ponudi pomoć i provjeri treba li netko u tvojoj blizini
            podršku.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link to="/boksusjed/pomoc" className="btn-primary tap-scale flex-1 py-3 text-center text-sm">
              Ponudi pomoć
            </Link>
            <Link to="/boksusjed/objavi" className="btn-secondary tap-scale flex-1 py-3 text-center text-sm">
              Prijavi potrebu
            </Link>
          </div>
        </div>

        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Aktivni alerti</h2>
          {activeAlerts.length === 0 ? (
            <EmptyState icon={Shield} title="Nema aktivnih upozorenja u tvom kvartu." />
          ) : (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <ResilienceAlertCard
                  key={alert.id}
                  alert={alert}
                  actionLabel={
                    alert.type === 'power_outage'
                      ? 'Vidi koga treba provjeriti'
                      : alert.type === 'heat_wave'
                        ? 'Pokreni check-in'
                        : alert.type === 'water_outage'
                          ? 'Ponudi dostavu vode'
                          : 'Saznaj više'
                  }
                  onAction={() => showToast('Otvaranje detalja alerta (demo).')}
                />
              ))}
            </div>
          )}
        </section>

        <ResilienceSummary summary={vulnerableSummary} />

        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Mikro-zadaci pomoći</h2>
          {openTasks.length === 0 ? (
            <EmptyState icon={ListTodo} title="Trenutno nema otvorenih kriznih zadataka." />
          ) : (
            <div className="space-y-3">
              {openTasks.map((task) => (
                <HelpTaskCard
                  key={task.id}
                  task={task}
                  onAccept={acceptHelpTask}
                  onComplete={completeHelpTask}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-display text-lg font-semibold text-ink">Sigurne točke</h2>
          <div className="space-y-3">
            {safePoints.map((point) => (
              <SafePointCard key={point.id} point={point} />
            ))}
          </div>
        </section>

        <CrisisCheckInCard onSubmit={submitCheckIn} lastChoice={lastCheckIn} />

        <p className="text-xs text-muted">{PRIVACY_LINES[3]}</p>
      </div>
    </PageLayout>
  );
}
