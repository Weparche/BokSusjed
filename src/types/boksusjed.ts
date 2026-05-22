export type PostType =
  | 'announcement'
  | 'recommendation'
  | 'help_needed'
  | 'help_offered'
  | 'giveaway'
  | 'sale'
  | 'safety'
  | 'lost_found'
  | 'event';

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

export type HelpFilter = 'help_needed' | 'help_offered' | 'borrow' | 'giveaway';

export type MapFilter = 'all' | 'announcement' | 'safety' | 'giveaway' | 'event' | 'help';

export interface CreatePostForm {
  type: PostType;
  title: string;
  description: string;
  neighborhood: string;
  tag?: string;
  location?: string;
  lat?: number;
  lng?: number;
}

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
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  majstori: 'Majstori',
  hrana: 'Hrana',
  djeca: 'Djeca',
  ljepota: 'Ljepota',
  ljubimci: 'Ljubimci',
};
