import { LAYER_PIN_COLORS } from '../../../utils/mapPinIconHtml';

const LEGEND_ITEMS = [
  { color: 'green' as const, label: 'Pristupačno' },
  { color: 'blue' as const, label: 'Korisna lokacija' },
  { color: 'orange' as const, label: 'Upozorenje' },
  { color: 'red' as const, label: 'Prepreka / krizni problem' },
  { color: 'purple' as const, label: 'Pomoć' },
];

export function MapLegend() {
  return (
    <div className="flex flex-wrap gap-3 rounded-[var(--radius-input)] border border-rule bg-paper-2/95 px-3 py-2 text-[10px] font-semibold text-ink-2 backdrop-blur-sm">
      {LEGEND_ITEMS.map((item) => (
        <span key={item.color} className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full border"
            style={{
              background: LAYER_PIN_COLORS[item.color].bg,
              borderColor: LAYER_PIN_COLORS[item.color].border,
            }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}
