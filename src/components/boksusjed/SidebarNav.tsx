import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { neighborhood } from '../../data/boksusjedMock';
import { useBoksusjed } from '../../context/BoksusjedContext';
import { pillTransition } from '../../utils/motion';
import { Avatar } from './Avatar';
import { VerifiedBadge } from './VerifiedBadge';
import { createNavItem, navItems } from './navConfig';

export function SidebarNav() {
  const { currentUser } = useBoksusjed();
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);

  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-rule bg-paper-2/95 px-4 py-6 backdrop-blur-md lg:flex">
      <div className="mb-6 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-btn)] bg-accent font-display text-base font-bold text-accent-ink">
          B
        </span>
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-ink">BokSusjed</p>
          <p className="text-xs text-muted">Samo tvoj kvart</p>
        </div>
      </div>

      <div className="mb-6 px-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-soft bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent-strong">
          <MapPin className="h-3.5 w-3.5" />
          {neighborhood.name}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="relative flex items-center gap-3 rounded-[var(--radius-input)] px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebarNavActive"
                    className="absolute inset-0 rounded-[var(--radius-input)] bg-accent-soft ring-1 ring-accent-soft"
                    transition={transition}
                  />
                )}
                <item.icon
                  className={`relative z-10 h-5 w-5 ${isActive ? 'text-accent' : 'text-muted'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`relative z-10 ${isActive ? 'text-accent-strong' : 'text-ink-2'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to={createNavItem.to}
        className="btn-primary mb-6 mt-2 px-4 py-3.5 text-sm"
      >
        <createNavItem.icon className="h-5 w-5" strokeWidth={2.5} />
        {createNavItem.label}
      </NavLink>

      <NavLink
        to="/boksusjed/profil"
        className="mt-auto flex items-center gap-3 rounded-[var(--radius-card)] border border-rule bg-paper-3 p-3 transition hover:border-accent-soft hover:bg-accent-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <Avatar name={currentUser.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{currentUser.name}</p>
          <VerifiedBadge level={currentUser.verifiedLevel} />
        </div>
      </NavLink>
    </aside>
  );
}
