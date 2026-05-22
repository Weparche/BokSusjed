export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Upravo sada';
  if (diffMinutes < 60) return `Prije ${diffMinutes} min`;
  if (diffHours < 24) return `Prije ${diffHours} h`;
  if (diffDays === 1) return 'Jučer';
  if (diffDays < 7) return `Prije ${diffDays} dana`;

  return date.toLocaleDateString('hr-HR', {
    day: 'numeric',
    month: 'short',
  });
}

export function formatDistance(meters?: number): string {
  if (meters == null) return '';
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}
