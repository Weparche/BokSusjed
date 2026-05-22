import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { initialPosts, currentUser } from '../data/boksusjedMock';
import type { CreatePostForm, Post, ToastMessage } from '../types/boksusjed';
import type { GeoPoint, GeolocationStatus } from '../utils/geo';
import { distanceMeters, loadCachedLocation, requestGeolocation } from '../utils/geo';

const STORAGE_KEY = 'boksusjed-posts';

function loadPosts(): Post[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Post[];
      return [...initialPosts, ...parsed];
    }
  } catch {
    // ignore
  }
  return initialPosts;
}

function saveUserPosts(posts: Post[]) {
  const userPosts = posts.filter((p) => p.id.startsWith('user-'));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
}

interface BoksusjedContextValue {
  posts: Post[];
  currentUser: typeof currentUser;
  userLocation: GeoPoint | null;
  locationStatus: GeolocationStatus;
  locationError: string | null;
  refreshLocation: () => Promise<GeoPoint | null>;
  addPost: (form: CreatePostForm) => Post;
  toggleReaction: (postId: string) => void;
  toasts: ToastMessage[];
  showToast: (message: string) => void;
  dismissToast: (id: string) => void;
}

const BoksusjedContext = createContext<BoksusjedContextValue | null>(null);

export function BoksusjedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [userLocation, setUserLocation] = useState<GeoPoint | null>(() => loadCachedLocation());
  const [locationStatus, setLocationStatus] = useState<GeolocationStatus>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshLocation = useCallback(async (): Promise<GeoPoint | null> => {
    setLocationStatus('loading');
    setLocationError(null);
    try {
      const point = await requestGeolocation();
      setUserLocation(point);
      setLocationStatus('granted');
      return point;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Greška pri dohvaćanju lokacije.';
      setLocationError(message);
      setLocationStatus('denied');
      return null;
    }
  }, []);

  useEffect(() => {
    void refreshLocation();
  }, [refreshLocation]);

  const addPost = useCallback(
    (form: CreatePostForm): Post => {
      const newPost: Post = {
        id: `user-${Date.now()}`,
        type: form.type,
        title: form.title,
        description: form.description,
        author: currentUser,
        neighborhood: form.neighborhood,
        createdAt: new Date().toISOString(),
        commentsCount: 0,
        reactionsCount: 0,
        tag: form.tag,
        lat: form.lat,
        lng: form.lng,
        distanceMeters:
          userLocation && form.lat != null && form.lng != null
            ? distanceMeters(userLocation, { lat: form.lat, lng: form.lng })
            : undefined,
        liked: false,
      };

      setPosts((prev) => {
        const next = [newPost, ...prev];
        saveUserPosts(next);
        return next;
      });

      return newPost;
    },
    [userLocation],
  );

  const toggleReaction = useCallback((postId: string) => {
    setPosts((prev) => {
      const next = prev.map((post) => {
        if (post.id !== postId) return post;
        const liked = !post.liked;
        return {
          ...post,
          liked,
          reactionsCount: liked ? post.reactionsCount + 1 : Math.max(0, post.reactionsCount - 1),
        };
      });
      saveUserPosts(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      posts,
      currentUser,
      userLocation,
      locationStatus,
      locationError,
      refreshLocation,
      addPost,
      toggleReaction,
      toasts,
      showToast,
      dismissToast,
    }),
    [
      posts,
      userLocation,
      locationStatus,
      locationError,
      refreshLocation,
      addPost,
      toggleReaction,
      toasts,
      showToast,
      dismissToast,
    ],
  );

  return <BoksusjedContext.Provider value={value}>{children}</BoksusjedContext.Provider>;
}

export function useBoksusjed() {
  const ctx = useContext(BoksusjedContext);
  if (!ctx) throw new Error('useBoksusjed must be used within BoksusjedProvider');
  return ctx;
}
