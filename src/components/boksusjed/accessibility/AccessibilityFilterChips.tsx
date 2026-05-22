import type { AccessibilityFilter } from '../../../types/boksusjed';
import { ACCESSIBILITY_FILTERS } from '../../../utils/moduleHelpers';
import { FilterPills } from '../FilterPills';

interface AccessibilityFilterChipsProps {
  active: AccessibilityFilter;
  onChange: (filter: AccessibilityFilter) => void;
}

export function AccessibilityFilterChips({ active, onChange }: AccessibilityFilterChipsProps) {
  return (
    <FilterPills
      items={ACCESSIBILITY_FILTERS}
      active={active}
      onChange={onChange}
      layoutId="accessibilityFilter"
    />
  );
}
