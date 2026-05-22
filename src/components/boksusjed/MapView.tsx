import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Crosshair, SlidersHorizontal } from 'lucide-react';
import type { LayerMapPin, MapLayer } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { layerPinsForLayer } from '../../utils/mapLayers';
import { collapseTransition } from '../../utils/motion';
import { LeafletMap } from './LeafletMap';
import { MapBottomSheet } from './map/MapBottomSheet';
import { MapLayerSwitcher } from './map/MapLayerSwitcher';
import { MapLegend } from './map/MapLegend';

interface MapViewProps {
  layer: MapLayer;
  onLayerChange: (layer: MapLayer) => void;
}

export function MapView({ layer, onLayerChange }: MapViewProps) {
  const reduced = useReducedMotion();
  const { posts, userLocation, refreshLocation, resilienceAlerts, helpTasks, safePoints, accessibilityPoints } =
    useBoksusjed();
  const [selectedPin, setSelectedPin] = useState<LayerMapPin | null>(null);
  const [showLayers, setShowLayers] = useState(false);
  const [flyToCenter, setFlyToCenter] = useState(0);
  const [flyToUser, setFlyToUser] = useState(0);

  const layerPins = useMemo(
    () =>
      layerPinsForLayer(layer, posts, userLocation, {
        alerts: resilienceAlerts,
        tasks: helpTasks,
        safePts: safePoints,
        accessPts: accessibilityPoints,
      }).sort((a, b) => a.distanceMeters - b.distanceMeters),
    [layer, posts, userLocation, resilienceAlerts, helpTasks, safePoints, accessibilityPoints],
  );

  const handleLocate = async () => {
    const point = await refreshLocation();
    if (point) {
      setFlyToUser((n) => n + 1);
    } else {
      setFlyToCenter((n) => n + 1);
    }
  };

  return (
    <div className="relative flex flex-1 flex-col lg:flex-row lg:gap-6 lg:px-8 lg:pb-8">
      <div className="relative flex flex-1 flex-col lg:min-h-[560px]">
        <div className="relative mx-4 mb-3 overflow-hidden rounded-[var(--radius-card)] border border-rule shadow-[inset_0_1px_2px_oklch(0.24_0.025_145_/_0.04)] lg:mx-0 lg:mb-0 lg:h-full lg:flex-1">
          <div className="relative aspect-[4/5] min-h-[340px] w-full lg:aspect-auto lg:min-h-[560px] lg:h-full">
            <LeafletMap
              layerPins={layerPins}
              selectedLayerPin={selectedPin}
              onSelectLayerPin={setSelectedPin}
              flyToCenter={flyToCenter}
              flyToUser={flyToUser}
              userLocation={userLocation}
            />
            <div className="absolute left-3 top-3 z-[1000] hidden sm:block">
              <MapLegend />
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-2">
            <motion.button
              type="button"
              onClick={() => void handleLocate()}
              whileTap={reduced ? undefined : { scale: 0.92 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-paper-2 text-ink-2 shadow-[var(--shadow-card)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              aria-label="Lociraj me"
              title="Moja lokacija"
            >
              <Crosshair className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setShowLayers((v) => !v)}
              whileTap={reduced ? undefined : { scale: 0.92 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-[var(--shadow-card)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden ${
                showLayers
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-rule bg-paper-2 text-ink-2 hover:bg-paper-3'
              }`}
              aria-label="Layeri"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showLayers && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={collapseTransition(!!reduced)}
              className="mx-4 mb-3 space-y-2 overflow-hidden lg:hidden"
            >
              <MapLayerSwitcher active={layer} onChange={onLayerChange} />
              <MapLegend />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-4 rounded-t-[var(--radius-card)] border border-b-0 border-rule bg-paper-2 p-4 shadow-[var(--shadow-lift)] lg:hidden">
        <MapBottomSheet pins={layerPins} selectedPin={selectedPin} onSelectPin={setSelectedPin} />
      </div>

      <div className="hidden lg:flex lg:w-80 lg:shrink-0 lg:flex-col lg:gap-4 lg:rounded-[var(--radius-card)] lg:border lg:border-rule lg:bg-paper-2 lg:p-5 lg:shadow-[var(--shadow-card)]">
        <MapLayerSwitcher active={layer} onChange={onLayerChange} />
        <MapLegend />
        <MapBottomSheet pins={layerPins} selectedPin={selectedPin} onSelectPin={setSelectedPin} />
      </div>
    </div>
  );
}
