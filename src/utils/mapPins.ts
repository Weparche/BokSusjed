import type { MapPin, Post } from '../types/boksusjed';
import type { GeoPoint } from './geo';
import { distanceMeters } from './geo';

function shortenTitle(title: string, max = 28): string {
  return title.length <= max ? title : `${title.slice(0, max).trim()}…`;
}

export function postsToMapPins(posts: Post[], userLocation?: GeoPoint | null): MapPin[] {
  return posts
    .filter((post) => post.lat != null && post.lng != null)
    .map((post) => ({
      id: `pin-${post.id}`,
      postId: post.id,
      type: post.type,
      title: shortenTitle(post.title),
      distanceMeters:
        userLocation && post.lat != null && post.lng != null
          ? distanceMeters(userLocation, { lat: post.lat, lng: post.lng })
          : post.distanceMeters ?? 0,
      lat: post.lat!,
      lng: post.lng!,
    }));
}
