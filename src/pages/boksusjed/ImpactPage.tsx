import { ImpactDashboard } from '../../components/boksusjed/impact/ImpactDashboard';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

export function ImpactPage() {
  return (
    <PageLayout aside={null}>
      <PageHeader
        title="Učinak u kvartu"
        subtitle="Društveni učinak pilot projekta u Trešnjevci."
        showBack
      />

      <div className="page-container px-4 pb-8 pt-3 lg:px-0 lg:pt-4">
        <ImpactDashboard />
      </div>
    </PageLayout>
  );
}
