import { getInitials } from '../../utils/postHelpers';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
};

export function Avatar({ name, size = 'md' }: AvatarProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent-strong ring-1 ring-accent-soft ${sizeClasses[size]}`}
      aria-hidden
    >
      {getInitials(name)}
    </span>
  );
}
