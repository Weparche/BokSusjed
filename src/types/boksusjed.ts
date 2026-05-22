export type PostType =
  | 'announcement'
  | 'recommendation'
  | 'help_needed'
  | 'help_offered'
  | 'giveaway'
  | 'sale'
  | 'safety'
  | 'lost_found'
  | 'event'
  | 'crisis_alert'
  | 'crisis_help_needed'
  | 'crisis_help_offered'
  | 'safe_point'
  | 'check_in_request'
  | 'accessible_location'
  | 'accessibility_barrier'
  | 'baby_friendly'
  | 'broken_elevator'
  | 'dangerous_curb';

export type PostModule = 'daily' | 'resilience' | 'accessibility';

export type AlertType =
  | 'power_outage'
  | 'water_outage'
  | 'heat_wave'
  | 'storm'
  | 'elevator_outage'
  | 'community_checkin';

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'monitoring' | 'resolved';

export interface ResilienceAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  neighborhood: string;
  severity: AlertSeverity;
  status: AlertStatus;
  affectedHouseholds: number;
  createdAt: string;
  expectedUntil?: string;
  lat?: number;
  lng?: number;
}

export type HelpTaskCategory =
  | 'water_delivery'
  | 'medicine_pickup'
  | 'check_in'
  | 'powerbank'
  | 'mobility_help'
  | 'stroller_help'
  | 'other';

export type TaskUrgency = 'low' | 'medium' | 'high';
export type TaskStatus = 'open' | 'accepted' | 'completed';
export type PrivacyLevel = 'public' | 'protected';

export interface HelpTask {
  id: string;
  category: HelpTaskCategory;
  title: string;
  description: string;
  neighborhood: string;
  distanceMeters: number;
  urgency: TaskUrgency;
  status: TaskStatus;
  privacyLevel: PrivacyLevel;
  createdAt: string;
  lat?: number;
  lng?: number;
}

export type AccessibilityPointType =
  | 'ramp'
  | 'elevator'
  | 'wide_entrance'
  | 'baby_friendly'
  | 'public_wc'
  | 'bench'
  | 'dangerous_curb'
  | 'broken_elevator'
  | 'inaccessible_entrance'
  | 'safe_crossing';

export type AccessibilityStatus = 'verified' | 'reported' | 'needs_review';

export interface AccessibilityPoint {
  id: string;
  type: AccessibilityPointType;
  title: string;
  description: string;
  neighborhood: string;
  address?: string;
  status: AccessibilityStatus;
  confirmationsCount: number;
  reportsCount: number;
  lat?: number;
  lng?: number;
  tags: string[];
}

export type SafePointService =
  | 'water'
  | 'cooling'
  | 'heating'
  | 'charging'
  | 'pharmacy'
  | 'shelter'
  | 'assistance';

export interface SafePoint {
  id: string;
  name: string;
  description: string;
  neighborhood: string;
  services: SafePointService[];
  openingHours: string;
  lat?: number;
  lng?: number;
  verified: boolean;
}

export type ImpactCategory = 'community' | 'accessibility' | 'resilience' | 'help';

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  category: ImpactCategory;
}

export interface VulnerableHouseholdSummary {
  checkInRequested: number;
  waterHelpNeeded: number;
  notificationsOnly: number;
  limitedMobility: number;
}

export type AccessibilityFilter =
  | 'all'
  | 'no_steps'
  | 'ramp'
  | 'elevator'
  | 'baby_friendly'
  | 'public_wc'
  | 'wide_entrance'
  | 'dangerous_curb'
  | 'broken_elevator'
  | 'inaccessible';

export type MapLayer = 'posts' | 'help' | 'resilience' | 'accessibility' | 'recommendations';

export type MapPinColor = 'green' | 'blue' | 'orange' | 'red' | 'purple';

export interface LayerMapPin {
  id: string;
  layer: MapLayer;
  kind: string;
  title: string;
  subtitle?: string;
  distanceMeters: number;
  lat: number;
  lng: number;
  color: MapPinColor;
  sourceId: string;
}

export interface ProfilePreferences {
  crisisAlerts: boolean;
  canHelpInCrisis: boolean;
  markHouseholdNeeds: boolean;
  usesStroller: boolean;
  limitedMobility: boolean;
  privateCheckInOnly: boolean;
  livesAlone: boolean;
  needsPowerOutageHelp: boolean;
  needsWaterOutageHelp: boolean;
  needsStepFreeAccess: boolean;
  needsMedicineHelp: boolean;
  emergencyContact: string;
}

export type CheckInChoice = 'ok' | 'need_help' | 'check_someone';

export interface CreatePostForm {
  type: PostType;
  title: string;
  description: string;
  neighborhood: string;
  tag?: string;
  location?: string;
  lat?: number;
  lng?: number;
  module?: PostModule;
  urgency?: TaskUrgency;
  privacyLevel?: PrivacyLevel;
  barrierType?: string;
  severity?: AlertSeverity;
  safePointServices?: SafePointService[];
  openingHours?: string;
}

export type VerifiedLevel = 'new' | 'confirmed' | 'trusted';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  neighborhood: string;
  verifiedLevel: VerifiedLevel;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  description: string;
  author: User;
  neighborhood: string;
  distanceMeters?: number;
  createdAt: string;
  commentsCount: number;
  reactionsCount: number;
  image?: string;
  lat?: number;
  lng?: number;
  status?: string;
  tag?: string;
  module?: PostModule;
  urgency?: TaskUrgency;
  privacyLevel?: PrivacyLevel;
  comments?: Comment[];
  liked?: boolean;
}

export type ServiceCategory = 'majstori' | 'hrana' | 'djeca' | 'ljepota' | 'ljubimci';

export interface ServiceRecommendation {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  recommendedByCount: number;
  neighborhood: string;
  badges: string[];
  phone?: string;
  whatsapp?: string;
  verified: boolean;
  image?: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

export interface MapPin {
  id: string;
  postId: string;
  type: PostType;
  title: string;
  distanceMeters: number;
  lat: number;
  lng: number;
}

export type FeedFilter =
  | 'all'
  | 'announcement'
  | 'recommendation'
  | 'help'
  | 'giveaway'
  | 'safety';

export type HelpFilter =
  | 'all'
  | 'help_needed'
  | 'help_offered'
  | 'crisis'
  | 'accessibility'
  | 'borrow'
  | 'giveaway';

export type MapFilter = 'all' | 'announcement' | 'safety' | 'giveaway' | 'event' | 'help';

export interface ToastMessage {
  id: string;
  message: string;
}

export const VERIFIED_LABELS: Record<VerifiedLevel, string> = {
  new: 'Novi susjed',
  confirmed: 'Potvrđen susjed',
  trusted: 'Pouzdani susjed',
};

export const POST_TYPE_LABELS: Record<PostType, string> = {
  announcement: 'Obavijest',
  recommendation: 'Preporuka',
  help_needed: 'Trebam pomoć',
  help_offered: 'Nudim pomoć',
  giveaway: 'Poklanjam',
  sale: 'Prodajem',
  safety: 'Sigurnost',
  lost_found: 'Izgubljeno/nađeno',
  event: 'Događaj',
  crisis_alert: 'Krizno upozorenje',
  crisis_help_needed: 'Trebam kriznu pomoć',
  crisis_help_offered: 'Nudim kriznu pomoć',
  safe_point: 'Sigurna točka',
  check_in_request: 'Check-in zahtjev',
  accessible_location: 'Pristupačna lokacija',
  accessibility_barrier: 'Prijava prepreke',
  baby_friendly: 'Baby-friendly',
  broken_elevator: 'Pokvaren lift',
  dangerous_curb: 'Opasan rubnik',
};

export const DEFAULT_PROFILE_PREFERENCES: ProfilePreferences = {
  crisisAlerts: true,
  canHelpInCrisis: false,
  markHouseholdNeeds: false,
  usesStroller: false,
  limitedMobility: false,
  privateCheckInOnly: true,
  livesAlone: false,
  needsPowerOutageHelp: false,
  needsWaterOutageHelp: false,
  needsStepFreeAccess: false,
  needsMedicineHelp: false,
  emergencyContact: '',
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  majstori: 'Majstori',
  hrana: 'Hrana',
  djeca: 'Djeca',
  ljepota: 'Ljepota',
  ljubimci: 'Ljubimci',
};
