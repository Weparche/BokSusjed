import { motion, useReducedMotion } from 'framer-motion';
import { pillTransition } from '../../utils/motion';

interface FilterPillsProps<T extends string> {
  items: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  layoutId?: string;
}

export function FilterPills<T extends string>({
  items,
  active,
  onChange,
  layoutId = 'filterPill',
}: FilterPillsProps<T>) {
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
              isActive ? 'text-accent-ink' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-accent shadow-[var(--shadow-card)]"
                transition={transition}
              />
            ) : (
              <span className="absolute inset-0 rounded-full border border-rule bg-paper-2" />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
