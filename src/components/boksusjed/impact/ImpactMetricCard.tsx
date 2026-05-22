import type { ImpactMetric } from '../../../types/boksusjed';

interface ImpactMetricCardProps {
  metric: ImpactMetric;
}

export function ImpactMetricCard({ metric }: ImpactMetricCardProps) {
  return (
    <div className="surface-card px-4 py-5 text-center shadow-none">
      <p className="font-display text-3xl font-semibold text-accent">{metric.value}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{metric.label}</p>
      <p className="mt-1 text-xs text-muted">{metric.description}</p>
    </div>
  );
}
