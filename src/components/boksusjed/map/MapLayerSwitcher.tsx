import type { MapLayer } from '../../../types/boksusjed';
import { MAP_LAYER_OPTIONS } from '../../../utils/mapLayers';
import { FilterPills } from '../FilterPills';

interface MapLayerSwitcherProps {
  active: MapLayer;
  onChange: (layer: MapLayer) => void;
}

export function MapLayerSwitcher({ active, onChange }: MapLayerSwitcherProps) {
  return (
    <FilterPills
      items={MAP_LAYER_OPTIONS}
      active={active}
      onChange={onChange}
      layoutId="mapLayerSwitcher"
    />
  );
}
