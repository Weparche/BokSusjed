import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Crosshair, SlidersHorizontal } from 'lucide-react';
import type { MapFilter, MapPin as MapPinType } from '../../types/boksusjed';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { MAP_FILTERS, matchesMapFilter } from '../../utils/postHelpers';
import { PostTypeIconBadge } from './PostTypeIconBadge';
import { formatDistance } from '../../utils/formatTime';
import { postsToMapPins } from '../../utils/mapPins';
import { collapseTransition, easeOut, motionDuration } from '../../utils/motion';
import { FilterPills } from './FilterPills';
import { LeafletMap } from './LeafletMap';

interface MapViewProps {
  filter: MapFilter;
  onFilterChange: (filter: MapFilter) => void;
}

function NearbyList({
  filteredPins,
  selectedPin,
  setSelectedPin,
  reduced,
}: {
  filteredPins: MapPinType[];
  selectedPin: MapPinType | null;
  setSelectedPin: (pin: MapPinType) => void;
  reduced: boolean;
}) {
  return (
    <>
      <h3 className="mb-3 text-sm font-bold text-slate-800 lg:text-base">U blizini</h3>
      <div className="space-y-2 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
        {filteredPins.length === 0 ? (
          <p className="py-4 text-center text-sm text-slate-500">Nema pinova za odabrani filter.</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredPins.map((pin) => {
              const isSelected = selectedPin?.id === pin.id;

              return (
                <motion.button
                  key={pin.id}
                  type="button"
                  onClick={() => setSelectedPin(pin)}
                  layout
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: 10, height: 0, marginTop: 0 }}
                  transition={{ duration: motionDuration(!!reduced, 220), ease: easeOut }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                    isSelected ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <PostTypeIconBadge type={pin.type} size="list" selected={isSelected} />
                  <span className="flex-1 text-sm font-medium text-slate-800">{pin.title}</span>
                  <span className="text-xs font-semibold text-brand-600">
                    {formatDistance(pin.distanceMeters)}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

export function MapView({ filter, onFilterChange }: MapViewProps) {
  const reduced = useReducedMotion();
  const { posts, userLocation, refreshLocation } = useBoksusjed();
  const [selectedPin, setSelectedPin] = useState<MapPinType | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [flyToCenter, setFlyToCenter] = useState(0);
  const [flyToUser, setFlyToUser] = useState(0);

  const allPins = useMemo(() => postsToMapPins(posts, userLocation), [posts, userLocation]);
  const filteredPins = allPins.filter((pin) => matchesMapFilter(pin.type, filter));

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
        <div className="relative mx-4 mb-3 overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-inner lg:mx-0 lg:mb-0 lg:h-full lg:flex-1">
          <div className="relative aspect-[4/5] min-h-[340px] w-full lg:aspect-auto lg:min-h-[560px] lg:h-full">
            <LeafletMap
              pins={filteredPins}
              selectedPin={selectedPin}
              onSelectPin={setSelectedPin}
              flyToCenter={flyToCenter}
              flyToUser={flyToUser}
              userLocation={userLocation}
            />
          </div>

          <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-2">
            <motion.button
              type="button"
              onClick={() => void handleLocate()}
              whileTap={reduced ? undefined : { scale: 0.92 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md"
              aria-label="Lociraj me"
              title="Moja lokacija"
            >
              <Crosshair className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              whileTap={reduced ? undefined : { scale: 0.92 }}
              animate={{
                backgroundColor: showFilters ? '#16a34a' : '#ffffff',
                color: showFilters ? '#ffffff' : '#475569',
              }}
              transition={{ duration: 0.2 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-md lg:hidden ${
                showFilters ? 'border-brand-500' : 'border-slate-200'
              }`}
              aria-label="Filteri"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={collapseTransition(!!reduced)}
              className="mx-4 mb-3 overflow-hidden lg:hidden"
            >
              <FilterPills
                items={MAP_FILTERS}
                active={filter}
                onChange={onFilterChange}
                layoutId="mapFilterPillOverlay"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-4 rounded-t-[1.5rem] border border-b-0 border-slate-200 bg-white p-4 shadow-lg lg:hidden">
        <NearbyList
          filteredPins={filteredPins}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          reduced={!!reduced}
        />
      </div>

      <div className="hidden lg:flex lg:w-80 lg:shrink-0 lg:flex-col lg:rounded-[1.5rem] lg:border lg:border-slate-200 lg:bg-white lg:p-5 lg:shadow-sm">
        <NearbyList
          filteredPins={filteredPins}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          reduced={!!reduced}
        />
      </div>
    </div>
  );
}
