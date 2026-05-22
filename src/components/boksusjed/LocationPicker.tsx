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
        <label className="text-sm font-semibold text-slate-700">Lokacija na karti (opcionalno)</label>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Ukloni pin
          </button>
        )}
      </div>

      <p className="text-xs text-slate-500">
        Klikni na kartu gdje se događa. Puna adresa se ne prikazuje — samo približna lokacija u kvartu.
      </p>

      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
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
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 disabled:opacity-50"
        >
          <Navigation className="h-3.5 w-3.5 text-brand-600" />
          {locationStatus === 'loading' ? 'Lociram...' : 'Moja lokacija'}
        </button>
        <button
          type="button"
          onClick={handleUseNeighborhood}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"
        >
          <MapPin className="h-3.5 w-3.5 text-brand-600" />
          Centar kvarta
        </button>
      </div>

      {value ? (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          Pin postavljen · {value.lat.toFixed(4)}, {value.lng.toFixed(4)}
        </p>
      ) : (
        <p className="text-xs text-slate-400">Nema odabrane lokacije — objava će biti vidljiva samo u feedu.</p>
      )}

      {locationError && (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">{locationError}</p>
      )}
    </div>
  );
}
