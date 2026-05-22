import type { LucideIcon } from 'lucide-react';
import { Home, MapPin, Plus, HandHeart, User, Star } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
  center?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/boksusjed', label: 'Početna', icon: Home, end: true },
  { to: '/boksusjed/preporuke', label: 'Preporuke', icon: Star },
  { to: '/boksusjed/mapa', label: 'Mapa', icon: MapPin },
  { to: '/boksusjed/pomoc', label: 'Pomoć', icon: HandHeart },
  { to: '/boksusjed/profil', label: 'Profil', icon: User },
];

export const createNavItem: NavItem = {
  to: '/boksusjed/objavi',
  label: 'Objavi',
  icon: Plus,
  center: true,
};

export const bottomNavItems: NavItem[] = [
  navItems[0]!,
  navItems[2]!,
  createNavItem,
  navItems[3]!,
  navItems[4]!,
];
