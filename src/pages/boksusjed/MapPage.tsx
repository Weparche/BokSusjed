import { useState } from 'react';
import type { MapFilter } from '../../types/boksusjed';
import { MAP_FILTERS } from '../../utils/postHelpers';
import { FilterPills } from '../../components/boksusjed/FilterPills';
import { MapView } from '../../components/boksusjed/MapView';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

export function MapPage() {
  const [filter, setFilter] = useState<MapFilter>('all');

  return (
    <PageLayout aside={null}>
      <PageHeader
        title="Mapa kvarta"
        subtitle="Pronađi što se događa u tvom kvartu."
      />

      <div className="page-container px-4 pt-2 lg:px-0 lg:pt-4">
        <FilterPills
          items={MAP_FILTERS}
          active={filter}
          onChange={setFilter}
          layoutId="mapFilterPill"
        />
      </div>

      <MapView filter={filter} onFilterChange={setFilter} />
    </PageLayout>
  );
}
