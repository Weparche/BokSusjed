import { MapPin, Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Pretraži objave, ljude, teme...',
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[var(--radius-input)] border border-rule bg-paper-2 py-3 pl-10 pr-4 text-sm text-ink shadow-[var(--shadow-card)] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

export function LocationChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-soft bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-strong">
      <MapPin className="h-3.5 w-3.5" />
      {name}
    </span>
  );
}
