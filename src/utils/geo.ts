export interface GeoPoint {
  lat: number;
  lng: number;
}

export type GeolocationStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unavailable';

const STORAGE_KEY = 'boksusjed-last-location';

export function loadCachedLocation(): GeoPoint | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GeoPoint;
    if (typeof parsed.lat === 'number' && typeof parsed.lng === 'number') return parsed;
  } catch {
    // ignore
  }
  return null;
}

export function cacheLocation(point: GeoPoint) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(point));
}

/** Haversine distance in meters */
export function distanceMeters(a: GeoPoint, b: GeoPoint): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

export function requestGeolocation(): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolokacija nije podržana u ovom pregledniku.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        cacheLocation(point);
        resolve(point);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(new Error('Dozvola za lokaciju je odbijena.'));
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          reject(new Error('Lokacija trenutno nije dostupna.'));
        } else {
          reject(new Error('Pretraživanje lokacije isteklo. Pokušaj ponovno.'));
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  });
}
