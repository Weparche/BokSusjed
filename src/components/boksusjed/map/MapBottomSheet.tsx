import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { LayerMapPin } from '../../../types/boksusjed';
import { formatDistance } from '../../../utils/formatTime';
import { LAYER_PIN_COLORS } from '../../../utils/mapPinIconHtml';
import { easeOut, motionDuration } from '../../../utils/motion';

interface MapBottomSheetProps {
  pins: LayerMapPin[];
  selectedPin: LayerMapPin | null;
  onSelectPin: (pin: LayerMapPin) => void;
}

export function MapBottomSheet({ pins, selectedPin, onSelectPin }: MapBottomSheetProps) {
  const reduced = useReducedMotion();

  return (
    <>
      <h3 className="mb-3 text-sm font-bold text-ink lg:text-base">U blizini</h3>
      <div className="space-y-2 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
        {pins.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted">Nema stavki za odabrani layer.</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {pins.slice(0, 8).map((pin) => {
              const isSelected = selectedPin?.id === pin.id;
              const colors = LAYER_PIN_COLORS[pin.color];

              return (
                <motion.button
                  key={pin.id}
                  type="button"
                  onClick={() => onSelectPin(pin)}
                  layout
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, x: 10, height: 0, marginTop: 0 }}
                  transition={{ duration: motionDuration(!!reduced, 220), ease: easeOut }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${
                    isSelected ? 'bg-accent-soft ring-1 ring-accent-soft' : 'hover:bg-paper-3'
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2"
                    style={{ background: colors.bg, borderColor: colors.border }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: colors.border }}
                    />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-ink">{pin.title}</span>
                    {pin.subtitle && (
                      <span className="block text-xs text-muted">{pin.subtitle}</span>
                    )}
                  </span>
                  <span className="text-xs font-semibold text-accent">
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
