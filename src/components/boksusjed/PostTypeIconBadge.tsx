import type { PostType } from '../../types/boksusjed';
import { POST_TYPE_STYLES } from '../../utils/postHelpers';

interface PostTypeIconBadgeProps {
  type: PostType;
  /** list = sidebar (+30%), map = reference size for map pins */
  size?: 'list' | 'map';
  selected?: boolean;
  className?: string;
}

export function PostTypeIconBadge({
  type,
  size = 'list',
  selected = false,
  className = '',
}: PostTypeIconBadgeProps) {
  const style = POST_TYPE_STYLES[type];
  const Icon = style.icon;

  const boxClass =
    size === 'list'
      ? 'h-[calc(2rem*1.3)] w-[calc(2rem*1.3)]'
      : 'h-8 w-8';
  const iconClass =
    size === 'list'
      ? 'h-[calc(1rem*1.3)] w-[calc(1rem*1.3)]'
      : 'h-4 w-4';

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg ${style.bg} ${style.accent} ${boxClass} ${
        selected ? 'ring-2 ring-brand-600 ring-offset-1' : ''
      } ${className}`}
    >
      <Icon className={iconClass} strokeWidth={2.5} />
    </span>
  );
}
