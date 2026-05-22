import { useState, type FormEvent } from 'react';
import { neighborhood } from '../../../data/boksusjedMock';
import type { AccessibilityPointType } from '../../../types/boksusjed';

const BARRIER_TYPES: { value: AccessibilityPointType; label: string }[] = [
  { value: 'inaccessible_entrance', label: 'Stepenice bez rampe' },
  { value: 'broken_elevator', label: 'Pokvaren lift' },
  { value: 'dangerous_curb', label: 'Visoki rubnik' },
  { value: 'wide_entrance', label: 'Uski ulaz' },
  { value: 'public_wc', label: 'Nema WC-a' },
  { value: 'safe_crossing', label: 'Nepristupačan prijelaz' },
];

interface AccessibilityReportFormProps {
  onSubmit: (data: {
    type: AccessibilityPointType;
    title: string;
    description: string;
    neighborhood: string;
    tags: string[];
  }) => void;
}

export function AccessibilityReportForm({ onSubmit }: AccessibilityReportFormProps) {
  const [type, setType] = useState<AccessibilityPointType>('inaccessible_entrance');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;
    const label = BARRIER_TYPES.find((b) => b.value === type)?.label ?? 'Prepreka';
    onSubmit({
      type,
      title: location.trim(),
      description: description.trim() || `Prijavljena prepreka: ${label}`,
      neighborhood: neighborhood.name,
      tags: [label],
    });
    setSubmitted(true);
    setLocation('');
    setDescription('');
    window.setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="surface-card space-y-4 p-4">
      <h3 className="font-display font-semibold text-ink">Prijava prepreke</h3>
      <p className="text-xs text-muted">Puna adresa korisnika se ne prikazuje javno.</p>

      <div>
        <label htmlFor="barrier-type" className="field-label">
          Tip prepreke
        </label>
        <select
          id="barrier-type"
          value={type}
          onChange={(e) => setType(e.target.value as AccessibilityPointType)}
          className="field-input"
        >
          {BARRIER_TYPES.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
          <option value="inaccessible_entrance">Drugo</option>
        </select>
      </div>

      <div>
        <label htmlFor="barrier-location" className="field-label">
          Lokacija
        </label>
        <input
          id="barrier-location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="npr. Ulaz u ambulantu — bez broja"
          required
          className="field-input"
        />
      </div>

      <div>
        <label htmlFor="barrier-desc" className="field-label">
          Kratak opis
        </label>
        <textarea
          id="barrier-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Opiši prepreku..."
          className="field-input resize-none"
        />
      </div>

      <div className="rounded-[var(--radius-input)] border border-dashed border-rule bg-paper-3 px-4 py-6 text-center text-xs text-muted">
        Opcionalna slika (placeholder u demo verziji)
      </div>

      {submitted ? (
        <p className="rounded-[var(--radius-input)] bg-accent-soft px-4 py-3 text-sm font-medium text-accent-strong">
          Prijava poslana — hvala što pomažeš kvartu biti dostupnijim.
        </p>
      ) : (
        <button type="submit" className="btn-primary tap-scale w-full py-3 text-sm">
          Pošalji prijavu
        </button>
      )}
    </form>
  );
}
