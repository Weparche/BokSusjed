import { useState } from 'react';
import type { MapLayer } from '../../types/boksusjed';
import { MapView } from '../../components/boksusjed/MapView';
import { MapLayerSwitcher } from '../../components/boksusjed/map/MapLayerSwitcher';
import { PageLayout } from '../../components/boksusjed/PageLayout';
import { PageHeader } from '../../components/boksusjed/PageHeader';

export function MapPage() {
  const [layer, setLayer] = useState<MapLayer>('posts');

  return (
    <PageLayout aside={null}>
      <PageHeader title="Mapa kvarta" subtitle="Layeri: objave, pomoć, OtporanKvart i DostupanKvart." />

      <div className="page-container hidden px-4 pt-2 sm:block lg:px-0 lg:pt-4">
        <MapLayerSwitcher active={layer} onChange={setLayer} />
      </div>

      <MapView layer={layer} onLayerChange={setLayer} />
    </PageLayout>
  );
}
