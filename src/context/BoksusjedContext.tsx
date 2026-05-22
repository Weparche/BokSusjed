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
import { moduleHelpPosts } from '../data/boksusjedModulePosts';
import { accessibilityPoints as seedAccessibility } from '../data/boksusjedAccessibilityMock';
import {
  helpTasks as seedHelpTasks,
  resilienceAlerts as seedAlerts,
  safePoints as seedSafePoints,
} from '../data/boksusjedResilienceMock';
import type {
  AccessibilityPoint,
  AccessibilityPointType,
  CheckInChoice,
  CreatePostForm,
  HelpTask,
  Post,
  ProfilePreferences,
  ResilienceAlert,
  SafePoint,
  ToastMessage,
} from '../types/boksusjed';
import { DEFAULT_PROFILE_PREFERENCES } from '../types/boksusjed';
import type { GeoPoint, GeolocationStatus } from '../utils/geo';
import { distanceMeters, loadCachedLocation, requestGeolocation } from '../utils/geo';

const STORAGE_KEY = 'boksusjed-posts';
const PREFS_KEY = 'boksusjed-profile-prefs';
const TASKS_KEY = 'boksusjed-help-tasks';
const ACCESS_KEY = 'boksusjed-accessibility';
const CHECKIN_KEY = 'boksusjed-checkin';

function loadPosts(): Post[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Post[];
      return [...initialPosts, ...moduleHelpPosts, ...parsed];
    }
  } catch {
    // ignore
  }
  return [...initialPosts, ...moduleHelpPosts];
}

function saveUserPosts(posts: Post[]) {
  const userPosts = posts.filter((p) => p.id.startsWith('user-'));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userPosts));
}

function loadPrefs(): ProfilePreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return { ...DEFAULT_PROFILE_PREFERENCES, ...(JSON.parse(raw) as ProfilePreferences) };
  } catch {
    // ignore
  }
  return DEFAULT_PROFILE_PREFERENCES;
}

function loadTasks(): HelpTask[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (raw) return JSON.parse(raw) as HelpTask[];
  } catch {
    // ignore
  }
  return seedHelpTasks;
}

function loadAccess(): AccessibilityPoint[] {
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (raw) return JSON.parse(raw) as AccessibilityPoint[];
  } catch {
    // ignore
  }
  return seedAccessibility;
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
  resilienceAlerts: ResilienceAlert[];
  helpTasks: HelpTask[];
  safePoints: SafePoint[];
  accessibilityPoints: AccessibilityPoint[];
  profilePrefs: ProfilePreferences;
  updateProfilePrefs: (patch: Partial<ProfilePreferences>) => void;
  acceptHelpTask: (taskId: string) => void;
  completeHelpTask: (taskId: string) => void;
  confirmAccessibility: (pointId: string) => void;
  reportAccessibility: (point: Omit<AccessibilityPoint, 'id' | 'confirmationsCount' | 'reportsCount'>) => void;
  submitCheckIn: (choice: CheckInChoice) => void;
  lastCheckIn: CheckInChoice | null;
}

const BoksusjedContext = createContext<BoksusjedContextValue | null>(null);

export function BoksusjedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(loadPosts);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [userLocation, setUserLocation] = useState<GeoPoint | null>(() => loadCachedLocation());
  const [locationStatus, setLocationStatus] = useState<GeolocationStatus>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);
  const [helpTasks, setHelpTasks] = useState<HelpTask[]>(loadTasks);
  const [accessibilityPoints, setAccessibilityPoints] = useState<AccessibilityPoint[]>(loadAccess);
  const [profilePrefs, setProfilePrefs] = useState<ProfilePreferences>(loadPrefs);
  const [lastCheckIn, setLastCheckIn] = useState<CheckInChoice | null>(() => {
    try {
      return localStorage.getItem(CHECKIN_KEY) as CheckInChoice | null;
    } catch {
      return null;
    }
  });

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
        module: form.module,
        urgency: form.urgency,
        privacyLevel: form.privacyLevel,
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

      if (
        form.type === 'accessibility_barrier' ||
        form.type === 'broken_elevator' ||
        form.type === 'dangerous_curb'
      ) {
        setAccessibilityPoints((prev) => {
          const next = [
            {
              id: `acc-user-${Date.now()}`,
              type: (
                form.type === 'broken_elevator'
                  ? 'broken_elevator'
                  : form.type === 'dangerous_curb'
                    ? 'dangerous_curb'
                    : 'inaccessible_entrance'
              ) as AccessibilityPointType,
              title: form.title,
              description: form.description,
              neighborhood: form.neighborhood,
              status: 'reported' as const,
              confirmationsCount: 0,
              reportsCount: 1,
              lat: form.lat,
              lng: form.lng,
              tags: [form.barrierType ?? form.tag ?? 'Prepreka'],
            },
            ...prev,
          ];
          localStorage.setItem(ACCESS_KEY, JSON.stringify(next));
          return next;
        });
      }

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

  const updateProfilePrefs = useCallback((patch: Partial<ProfilePreferences>) => {
    setProfilePrefs((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(PREFS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const persistTasks = useCallback((next: HelpTask[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(next));
    setHelpTasks(next);
  }, []);

  const acceptHelpTask = useCallback(
    (taskId: string) => {
      persistTasks(
        helpTasks.map((t) => (t.id === taskId ? { ...t, status: 'accepted' as const } : t)),
      );
      showToast('Zadatak preuzet — hvala što pomažeš susjedu.');
    },
    [helpTasks, persistTasks, showToast],
  );

  const completeHelpTask = useCallback(
    (taskId: string) => {
      persistTasks(
        helpTasks.map((t) => (t.id === taskId ? { ...t, status: 'completed' as const } : t)),
      );
      showToast('Zadatak označen riješenim.');
    },
    [helpTasks, persistTasks, showToast],
  );

  const confirmAccessibility = useCallback(
    (pointId: string) => {
      setAccessibilityPoints((prev) => {
        const next = prev.map((p) =>
          p.id === pointId
            ? { ...p, confirmationsCount: p.confirmationsCount + 1, status: 'verified' as const }
            : p,
        );
        localStorage.setItem(ACCESS_KEY, JSON.stringify(next));
        return next;
      });
      showToast('Hvala — potvrdio si pristupačnost.');
    },
    [showToast],
  );

  const reportAccessibility = useCallback(
    (point: Omit<AccessibilityPoint, 'id' | 'confirmationsCount' | 'reportsCount'>) => {
      setAccessibilityPoints((prev) => {
        const next = [
          {
            ...point,
            id: `acc-user-${Date.now()}`,
            confirmationsCount: 0,
            reportsCount: 1,
          },
          ...prev,
        ];
        localStorage.setItem(ACCESS_KEY, JSON.stringify(next));
        return next;
      });
      showToast('Prijava prepreke dodana u DostupanKvart.');
    },
    [showToast],
  );

  const submitCheckIn = useCallback(
    (choice: CheckInChoice) => {
      setLastCheckIn(choice);
      localStorage.setItem(CHECKIN_KEY, choice);
      if (choice === 'ok') showToast('Super — drago nam je da si dobro.');
      else if (choice === 'need_help')
        showToast('Primili smo signal — susjedi u kvartu mogu reagirati (demo).');
      else showToast('Hvala — check-in za susjeda je zabilježen (demo).');
    },
    [showToast],
  );

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
      resilienceAlerts: seedAlerts,
      helpTasks,
      safePoints: seedSafePoints,
      accessibilityPoints,
      profilePrefs,
      updateProfilePrefs,
      acceptHelpTask,
      completeHelpTask,
      confirmAccessibility,
      reportAccessibility,
      submitCheckIn,
      lastCheckIn,
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
      helpTasks,
      accessibilityPoints,
      profilePrefs,
      updateProfilePrefs,
      acceptHelpTask,
      completeHelpTask,
      confirmAccessibility,
      reportAccessibility,
      submitCheckIn,
      lastCheckIn,
    ],
  );

  return <BoksusjedContext.Provider value={value}>{children}</BoksusjedContext.Provider>;
}

export function useBoksusjed() {
  const ctx = useContext(BoksusjedContext);
  if (!ctx) throw new Error('useBoksusjed must be used within BoksusjedProvider');
  return ctx;
}
