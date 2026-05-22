import { BadgeCheck } from 'lucide-react';
import type { VerifiedLevel } from '../../types/boksusjed';
import { VERIFIED_LABELS } from '../../types/boksusjed';

interface VerifiedBadgeProps {
  level: VerifiedLevel;
  size?: 'sm' | 'md';
}

export function VerifiedBadge({ level, size = 'sm' }: VerifiedBadgeProps) {
  if (level === 'new') return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-accent-soft font-semibold text-accent-strong ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <BadgeCheck className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {VERIFIED_LABELS[level]}
    </span>
  );
}
