import type {
  AccessibilityFilter,
  AccessibilityPointType,
  AlertStatus,
  AccessibilityStatus,
  TaskStatus,
} from '../types/boksusjed';

export function alertStatusLabel(status: AlertStatus): string {
  const map: Record<AlertStatus, string> = {
    active: 'Aktivno',
    monitoring: 'Upozorenje',
    resolved: 'Riješeno',
  };
  return map[status];
}

export function alertStatusClass(status: AlertStatus): string {
  if (status === 'active') return 'bg-red-100 text-red-800 border-red-200';
  if (status === 'monitoring') return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-accent-soft text-accent-strong border-accent-soft';
}

export function taskStatusLabel(status: TaskStatus): string {
  const map: Record<TaskStatus, string> = {
    open: 'Otvoreno',
    accepted: 'Preuzeto',
    completed: 'Riješeno',
  };
  return map[status];
}

export function accessibilityStatusLabel(status: AccessibilityStatus): string {
  const map: Record<AccessibilityStatus, string> = {
    verified: 'Potvrđeno',
    reported: 'Prijavljena prepreka',
    needs_review: 'Treba provjeru',
  };
  return map[status];
}

export const ACCESSIBILITY_FILTERS: { id: AccessibilityFilter; label: string }[] = [
  { id: 'all', label: 'Sve' },
  { id: 'no_steps', label: 'Bez stepenica' },
  { id: 'ramp', label: 'Rampa' },
  { id: 'elevator', label: 'Lift' },
  { id: 'baby_friendly', label: 'Baby-friendly' },
  { id: 'public_wc', label: 'Javni WC' },
  { id: 'wide_entrance', label: 'Širok ulaz' },
  { id: 'dangerous_curb', label: 'Opasan rubnik' },
  { id: 'broken_elevator', label: 'Pokvaren lift' },
  { id: 'inaccessible', label: 'Nepristupačno' },
];

const FILTER_TYPE_MAP: Partial<Record<AccessibilityFilter, AccessibilityPointType[]>> = {
  no_steps: ['ramp', 'wide_entrance', 'bench', 'baby_friendly'],
  ramp: ['ramp'],
  elevator: ['elevator'],
  baby_friendly: ['baby_friendly'],
  public_wc: ['public_wc'],
  wide_entrance: ['wide_entrance'],
  dangerous_curb: ['dangerous_curb'],
  broken_elevator: ['broken_elevator'],
  inaccessible: ['inaccessible_entrance', 'dangerous_curb', 'broken_elevator'],
};

export function matchesAccessibilityFilter(
  type: AccessibilityPointType,
  filter: AccessibilityFilter,
): boolean {
  if (filter === 'all') return true;
  const types = FILTER_TYPE_MAP[filter];
  return types?.includes(type) ?? false;
}

export const PRIVACY_DISCLAIMER =
  'Ovi podaci su dio demo prototipa. U produkciji bi se obrađivali uz privolu i stroga pravila privatnosti.';

export const PRIVACY_LINES = [
  'Puna adresa nije javno vidljiva.',
  'Krizne potrebe dijele se samo uz tvoju privolu.',
  'BokSusjed prikazuje lokaciju okvirno, na razini kvarta ili mikrolokacije.',
  PRIVACY_DISCLAIMER,
] as const;
