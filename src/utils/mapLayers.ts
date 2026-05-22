import type {
  AccessibilityPoint,
  HelpTask,
  LayerMapPin,
  MapLayer,
  Post,
  ResilienceAlert,
  SafePoint,
  ServiceRecommendation,
} from '../types/boksusjed';
import { accessibilityPoints } from '../data/boksusjedAccessibilityMock';
import { helpTasks, resilienceAlerts, safePoints } from '../data/boksusjedResilienceMock';
import { serviceRecommendations } from '../data/boksusjedMock';
import type { GeoPoint } from './geo';
import { distanceMeters } from './geo';
import { postsToMapPins } from './mapPins';

function dist(user: GeoPoint | null | undefined, lat: number, lng: number, fallback = 400): number {
  return user ? distanceMeters(user, { lat, lng }) : fallback;
}

export const MAP_LAYER_OPTIONS: { id: MapLayer; label: string }[] = [
  { id: 'posts', label: 'Objave' },
  { id: 'help', label: 'Pomoć' },
  { id: 'resilience', label: 'OtporanKvart' },
  { id: 'accessibility', label: 'DostupanKvart' },
  { id: 'recommendations', label: 'Preporuke' },
];

export function alertToPin(alert: ResilienceAlert, user?: GeoPoint | null): LayerMapPin | null {
  if (alert.lat == null || alert.lng == null) return null;
  const color =
    alert.severity === 'critical' || alert.severity === 'high' ? 'red' : 'orange';
  return {
    id: `layer-alert-${alert.id}`,
    layer: 'resilience',
    kind: alert.type,
    title: alert.title,
    subtitle: alert.status === 'active' ? 'Aktivno' : 'Upozorenje',
    distanceMeters: dist(user, alert.lat, alert.lng),
    lat: alert.lat,
    lng: alert.lng,
    color,
    sourceId: alert.id,
  };
}

export function taskToPin(task: HelpTask, user?: GeoPoint | null): LayerMapPin | null {
  if (task.lat == null || task.lng == null) return null;
  return {
    id: `layer-task-${task.id}`,
    layer: 'resilience',
    kind: task.category,
    title: task.title,
    subtitle: 'Mikro-zadatak',
    distanceMeters: task.distanceMeters || dist(user, task.lat, task.lng),
    lat: task.lat,
    lng: task.lng,
    color: 'purple',
    sourceId: task.id,
  };
}

export function safePointToPin(point: SafePoint, user?: GeoPoint | null): LayerMapPin | null {
  if (point.lat == null || point.lng == null) return null;
  return {
    id: `layer-safe-${point.id}`,
    layer: 'resilience',
    kind: 'safe_point',
    title: point.name,
    subtitle: 'Sigurna točka',
    distanceMeters: dist(user, point.lat, point.lng),
    lat: point.lat,
    lng: point.lng,
    color: 'blue',
    sourceId: point.id,
  };
}

export function accessibilityToPin(point: AccessibilityPoint, user?: GeoPoint | null): LayerMapPin | null {
  if (point.lat == null || point.lng == null) return null;
  const barrierTypes = ['dangerous_curb', 'broken_elevator', 'inaccessible_entrance'];
  const color = barrierTypes.includes(point.type) ? 'red' : 'green';
  return {
    id: `layer-acc-${point.id}`,
    layer: 'accessibility',
    kind: point.type,
    title: point.title,
    subtitle: point.status === 'verified' ? 'Pristupačno' : 'Prepreka',
    distanceMeters: dist(user, point.lat, point.lng),
    lat: point.lat,
    lng: point.lng,
    color,
    sourceId: point.id,
  };
}

function serviceToPin(svc: ServiceRecommendation, index: number, user?: GeoPoint | null): LayerMapPin {
  const lat = 45.794 + index * 0.0015;
  const lng = 15.946 + index * 0.0012;
  return {
    id: `layer-svc-${svc.id}`,
    layer: 'recommendations',
    kind: svc.category,
    title: svc.name,
    subtitle: `${svc.recommendedByCount} preporuka`,
    distanceMeters: dist(user, lat, lng, 300 + index * 80),
    lat,
    lng,
    color: 'blue',
    sourceId: svc.id,
  };
}

export function postsLayerPins(posts: Post[], user?: GeoPoint | null): LayerMapPin[] {
  return postsToMapPins(posts, user).map((pin) => ({
    id: `layer-post-${pin.id}`,
    layer: 'posts' as const,
    kind: pin.type,
    title: pin.title,
    distanceMeters: pin.distanceMeters,
    lat: pin.lat,
    lng: pin.lng,
    color: 'blue' as const,
    sourceId: pin.postId,
  }));
}

export function helpLayerPins(posts: Post[], user?: GeoPoint | null): LayerMapPin[] {
  return posts
    .filter(
      (p) =>
        (p.type === 'help_needed' ||
          p.type === 'help_offered' ||
          p.type === 'crisis_help_needed' ||
          p.type === 'crisis_help_offered') &&
        p.lat != null &&
        p.lng != null,
    )
    .map((p) => ({
      id: `layer-help-${p.id}`,
      layer: 'help' as const,
      kind: p.type,
      title: p.title,
      subtitle: p.module === 'resilience' ? 'Krizna pomoć' : 'Pomoć',
      distanceMeters: dist(user, p.lat!, p.lng!, p.distanceMeters ?? 0),
      lat: p.lat!,
      lng: p.lng!,
      color: 'purple' as const,
      sourceId: p.id,
    }));
}

export function layerPinsForLayer(
  layer: MapLayer,
  posts: Post[],
  user?: GeoPoint | null,
  extra?: {
    alerts?: ResilienceAlert[];
    tasks?: HelpTask[];
    safePts?: SafePoint[];
    accessPts?: AccessibilityPoint[];
  },
): LayerMapPin[] {
  switch (layer) {
    case 'posts':
      return postsLayerPins(posts, user);
    case 'help':
      return helpLayerPins(posts, user);
    case 'resilience': {
      const alerts = (extra?.alerts ?? resilienceAlerts).flatMap((a) => {
        const pin = alertToPin(a, user);
        return pin ? [pin] : [];
      });
      const tasks = (extra?.tasks ?? helpTasks).flatMap((t) => {
        const pin = taskToPin(t, user);
        return pin ? [pin] : [];
      });
      const safes = (extra?.safePts ?? safePoints).flatMap((s) => {
        const pin = safePointToPin(s, user);
        return pin ? [pin] : [];
      });
      return [...alerts, ...tasks, ...safes];
    }
    case 'accessibility':
      return (extra?.accessPts ?? accessibilityPoints).flatMap((p) => {
        const pin = accessibilityToPin(p, user);
        return pin ? [pin] : [];
      });
    case 'recommendations':
      return serviceRecommendations.slice(0, 5).map((s, i) => serviceToPin(s, i, user));
    default:
      return [];
  }
}
