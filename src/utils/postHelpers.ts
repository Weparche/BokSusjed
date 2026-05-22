import type { LucideIcon } from 'lucide-react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowUpDown,
  Baby,
  CalendarDays,
  Gift,
  HandHeart,
  HeartHandshake,
  HelpCircle,
  Megaphone,
  PawPrint,
  Search,
  Shield,
  ShieldAlert,
  ShoppingBag,
  Star,
  Wrench,
  Accessibility,
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
  crisis_alert: {
    icon: AlertTriangle,
    label: 'Krizno upozorenje',
    accent: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  crisis_help_needed: {
    icon: HelpCircle,
    label: 'Trebam kriznu pomoć',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  crisis_help_offered: {
    icon: HandHeart,
    label: 'Nudim kriznu pomoć',
    accent: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  safe_point: {
    icon: Shield,
    label: 'Sigurna točka',
    accent: 'text-sky-700',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  check_in_request: {
    icon: HeartHandshake,
    label: 'Check-in',
    accent: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  accessible_location: {
    icon: Accessibility,
    label: 'Pristupačno',
    accent: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  accessibility_barrier: {
    icon: AlertOctagon,
    label: 'Prepreka',
    accent: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  baby_friendly: {
    icon: Baby,
    label: 'Baby-friendly',
    accent: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  broken_elevator: {
    icon: ArrowUpDown,
    label: 'Pokvaren lift',
    accent: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  dangerous_curb: {
    icon: ShieldAlert,
    label: 'Opasan rubnik',
    accent: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
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
  { id: 'all', label: 'Sve' },
  { id: 'help_needed', label: 'Trebam pomoć' },
  { id: 'help_offered', label: 'Nudim pomoć' },
  { id: 'crisis', label: 'Krizno' },
  { id: 'accessibility', label: 'Pristupačnost' },
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

export const CREATE_POST_GROUPS = [
  {
    label: 'Svakodnevno',
    module: 'daily' as const,
    types: [
      { type: 'announcement' as const, label: 'Obavijest', icon: Megaphone },
      { type: 'recommendation' as const, label: 'Preporuka', icon: Star },
      { type: 'help_needed' as const, label: 'Trebam pomoć', icon: HelpCircle },
      { type: 'help_offered' as const, label: 'Nudim pomoć', icon: HandHeart },
      { type: 'giveaway' as const, label: 'Poklanjam', icon: Gift },
      { type: 'sale' as const, label: 'Prodajem', icon: ShoppingBag },
      { type: 'lost_found' as const, label: 'Izgubljeno/nađeno', icon: AlertTriangle },
      { type: 'safety' as const, label: 'Sigurnost', icon: Shield },
    ],
  },
  {
    label: 'OtporanKvart',
    module: 'resilience' as const,
    types: [
      { type: 'crisis_alert' as const, label: 'Krizno upozorenje', icon: AlertTriangle },
      { type: 'crisis_help_needed' as const, label: 'Trebam kriznu pomoć', icon: HelpCircle },
      { type: 'crisis_help_offered' as const, label: 'Nudim kriznu pomoć', icon: HandHeart },
      { type: 'safe_point' as const, label: 'Sigurna točka', icon: Shield },
      { type: 'check_in_request' as const, label: 'Check-in zahtjev', icon: HeartHandshake },
    ],
  },
  {
    label: 'DostupanKvart',
    module: 'accessibility' as const,
    types: [
      { type: 'accessible_location' as const, label: 'Pristupačna lokacija', icon: Accessibility },
      { type: 'accessibility_barrier' as const, label: 'Prijava prepreke', icon: AlertOctagon },
      { type: 'baby_friendly' as const, label: 'Baby-friendly', icon: Baby },
      { type: 'broken_elevator' as const, label: 'Pokvaren lift', icon: ArrowUpDown },
      { type: 'dangerous_curb' as const, label: 'Opasan rubnik', icon: ShieldAlert },
    ],
  },
] as const;

export const CREATE_POST_TYPES: { type: PostType; label: string; icon: LucideIcon }[] =
  CREATE_POST_GROUPS.flatMap((g) => [...g.types]);

export function matchesFeedFilter(type: PostType, filter: FeedFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'help') return type === 'help_needed' || type === 'help_offered';
  return type === filter;
}

export function matchesHelpFilter(
  post: { type: PostType; title: string; tag?: string; module?: string },
  filter: HelpFilter,
): boolean {
  if (filter === 'all') return true;
  if (filter === 'help_needed')
    return post.type === 'help_needed' || post.type === 'crisis_help_needed';
  if (filter === 'help_offered')
    return post.type === 'help_offered' || post.type === 'crisis_help_offered';
  if (filter === 'crisis')
    return (
      post.module === 'resilience' ||
      post.type.startsWith('crisis_') ||
      post.type === 'safe_point' ||
      post.type === 'check_in_request'
    );
  if (filter === 'accessibility')
    return (
      post.module === 'accessibility' ||
      post.type === 'accessible_location' ||
      post.type === 'accessibility_barrier' ||
      post.type === 'baby_friendly' ||
      post.type === 'broken_elevator' ||
      post.type === 'dangerous_curb'
    );
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
