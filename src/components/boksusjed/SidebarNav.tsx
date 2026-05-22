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
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white/90 px-4 py-6 backdrop-blur-md lg:flex">
      <div className="mb-6 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-base font-bold text-white shadow-md shadow-emerald-500/20">
          B
        </span>
        <div>
          <p className="text-lg font-extrabold tracking-tight text-slate-900">BokSusjed</p>
          <p className="text-xs text-slate-500">Samo tvoj kvart</p>
        </div>
      </div>

      <div className="mb-6 px-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
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
            className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="sidebarNavActive"
                    className="absolute inset-0 rounded-xl bg-emerald-50 ring-1 ring-emerald-100"
                    transition={transition}
                  />
                )}
                <item.icon
                  className={`relative z-10 h-5 w-5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`relative z-10 ${isActive ? 'text-brand-700' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to={createNavItem.to}
        className="mb-6 mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-brand-700"
      >
        <createNavItem.icon className="h-5 w-5" strokeWidth={2.5} />
        {createNavItem.label}
      </NavLink>

      <NavLink
        to="/boksusjed/profil"
        className="mt-auto flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/50"
      >
        <Avatar name={currentUser.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">{currentUser.name}</p>
          <VerifiedBadge level={currentUser.verifiedLevel} />
        </div>
      </NavLink>
    </aside>
  );
}
