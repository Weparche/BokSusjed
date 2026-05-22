import { useLocation, Outlet } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { easeOut, pageTransition } from '../../utils/motion';
import { BottomNav } from './BottomNav';
import { SidebarNav } from './SidebarNav';

export function AppShell() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const transition = pageTransition(!!reduced);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-100 via-emerald-50/30 to-sky-50/40">
      <div className="desktop-shell mx-auto flex min-h-dvh w-full">
        <SidebarNav />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Enter-only fade: AnimatePresence mode="wait" caused blank screens on route change */}
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, ease: easeOut }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <Outlet />
          </motion.div>
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
