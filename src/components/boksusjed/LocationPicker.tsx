import { MapPin, Navigation } from 'lucide-react';
import { mapCenter } from '../../data/boksusjedMock';
import type { GeoPoint } from '../../utils/geo';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { LeafletMap } from './LeafletMap';

interface LocationPickerProps {
  value: GeoPoint | null;
  onChange: (point: GeoPoint | null) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { userLocation, refreshLocation, locationStatus, locationError } = useBoksusjed();

  const handleUseMyLocation = async () => {
    const point = await refreshLocation();
    if (point) onChange(point);
  };

  const handleUseNeighborhood = () => {
    onChange({ lat: mapCenter.lat, lng: mapCenter.lng });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <label className="field-label mb-0">Lokacija na karti (opcionalno)</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-semibold text-muted hover:text-ink-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Ukloni pin
          </button>
        )}
      </div>

      <p className="text-xs text-muted">
        Klikni na kartu gdje se događa. Puna adresa se ne prikazuje — samo približna lokacija u kvartu.
      </p>

      <div className="overflow-hidden rounded-[var(--radius-card)] border border-rule shadow-[inset_0_1px_2px_oklch(0.24_0.025_145_/_0.04)]">
        <div className="h-[220px] w-full lg:h-[260px]">
          <LeafletMap
            pickerMode
            pins={[]}
            pickerValue={value}
            onPickerChange={onChange}
            userLocation={userLocation}
            className="h-full w-full z-0"
            zoom={16}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void handleUseMyLocation()}
          disabled={locationStatus === 'loading'}
          className="btn-secondary px-3 py-2 text-xs disabled:opacity-50"
        >
          <Navigation className="h-3.5 w-3.5 text-accent" />
          {locationStatus === 'loading' ? 'Lociram...' : 'Moja lokacija'}
        </button>
        <button
          type="button"
          onClick={handleUseNeighborhood}
          className="btn-secondary px-3 py-2 text-xs"
        >
          <MapPin className="h-3.5 w-3.5 text-accent" />
          Centar kvarta
        </button>
      </div>

      {value ? (
        <p className="rounded-[var(--radius-input)] bg-accent-soft px-3 py-2 text-xs font-medium text-accent-strong">
          Pin postavljen · {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
        </p>
      ) : (
        <p className="text-xs text-muted">Nema odabrane lokacije — objava će biti vidljiva samo u feedu.</p>
      )}

      {locationError && (
        <p className="rounded-[var(--radius-input)] bg-warm px-3 py-2 text-xs text-warm-ink">{locationError}</p>
      )}
    </div>
  );
}
