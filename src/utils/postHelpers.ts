import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  CalendarDays,
  Gift,
  HandHeart,
  HeartHandshake,
  HelpCircle,
  Megaphone,
  PawPrint,
  Search,
  Shield,
  ShoppingBag,
  Star,
  Wrench,
} from 'lucide-react';
import type {
  FeedFilter,
  HelpFilter,
  MapFilter,
  PostType,
  ServiceCategory,
} from '../types/boksusjed';

export interface PostTypeStyle {
  icon: LucideIcon;
  label: string;
  accent: string;
  bg: string;
  border: string;
}

export const POST_TYPE_STYLES: Record<PostType, PostTypeStyle> = {
  announcement: {
    icon: Megaphone,
    label: 'Obavijest',
    accent: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  recommendation: {
    icon: Star,
    label: 'Preporuka',
    accent: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  help_needed: {
    icon: HelpCircle,
    label: 'Trebam pomoć',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  help_offered: {
    icon: HandHeart,
    label: 'Nudim pomoć',
    accent: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
  giveaway: {
    icon: Gift,
    label: 'Poklanjam',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  sale: {
    icon: ShoppingBag,
    label: 'Prodajem',
    accent: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  safety: {
    icon: Shield,
    label: 'Sigurnost',
    accent: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  lost_found: {
    icon: PawPrint,
    label: 'Izgubljeno/nađeno',
    accent: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  event: {
    icon: CalendarDays,
    label: 'Događaj',
    accent: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
};

export const FEED_FILTERS: { id: FeedFilter; label: string }[] = [
  { id: 'all', label: 'Sve' },
  { id: 'announcement', label: 'Obavijesti' },
  { id: 'recommendation', label: 'Preporuke' },
  { id: 'help', label: 'Pomoć' },
  { id: 'giveaway', label: 'Poklanjam' },
  { id: 'safety', label: 'Sigurnost' },
];

export const HELP_FILTERS: { id: HelpFilter; label: string }[] = [
  { id: 'help_needed', label: 'Trebam pomoć' },
  { id: 'help_offered', label: 'Nudim pomoć' },
  { id: 'borrow', label: 'Posudim' },
  { id: 'giveaway', label: 'Poklanjam' },
];

export const MAP_FILTERS: { id: MapFilter; label: string }[] = [
  { id: 'all', label: 'Sve' },
  { id: 'announcement', label: 'Kvarovi' },
  { id: 'safety', label: 'Sigurnost' },
  { id: 'giveaway', label: 'Poklanjam' },
  { id: 'event', label: 'Događaji' },
  { id: 'help', label: 'Pomoć' },
];

export const SERVICE_CATEGORIES: { id: ServiceCategory | 'all'; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'Sve', icon: Search },
  { id: 'majstori', label: 'Majstori', icon: Wrench },
  { id: 'hrana', label: 'Hrana', icon: HeartHandshake },
  { id: 'djeca', label: 'Djeca', icon: Gift },
  { id: 'ljepota', label: 'Ljepota', icon: Star },
  { id: 'ljubimci', label: 'Ljubimci', icon: PawPrint },
];

export const CREATE_POST_TYPES: { type: PostType; label: string; icon: LucideIcon }[] = [
  { type: 'announcement', label: 'Obavijest', icon: Megaphone },
  { type: 'recommendation', label: 'Preporuka', icon: Star },
  { type: 'help_needed', label: 'Trebam pomoć', icon: HelpCircle },
  { type: 'help_offered', label: 'Nudim pomoć', icon: HandHeart },
  { type: 'giveaway', label: 'Poklanjam', icon: Gift },
  { type: 'sale', label: 'Prodajem', icon: ShoppingBag },
  { type: 'lost_found', label: 'Izgubljeno/nađeno', icon: AlertTriangle },
  { type: 'safety', label: 'Sigurnost', icon: Shield },
];

export function matchesFeedFilter(type: PostType, filter: FeedFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'help') return type === 'help_needed' || type === 'help_offered';
  return type === filter;
}

export function matchesHelpFilter(post: { type: PostType; title: string; tag?: string }, filter: HelpFilter): boolean {
  if (filter === 'help_needed') return post.type === 'help_needed';
  if (filter === 'help_offered') return post.type === 'help_offered';
  if (filter === 'giveaway') return post.type === 'giveaway';
  if (filter === 'borrow') {
    return (
      post.title.toLowerCase().includes('posuđ') ||
      post.title.toLowerCase().includes('posud') ||
      post.tag?.toLowerCase().includes('alat') === true
    );
  }
  return true;
}

export function matchesMapFilter(type: PostType, filter: MapFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'announcement') return type === 'announcement';
  if (filter === 'help') return type === 'help_needed' || type === 'help_offered';
  return type === filter;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarGradient(name: string): string {
  const gradients = [
    'from-emerald-400 to-teal-500',
    'from-sky-400 to-blue-500',
    'from-amber-400 to-orange-500',
    'from-violet-400 to-purple-500',
    'from-rose-400 to-pink-500',
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index] ?? gradients[0]!;
}
