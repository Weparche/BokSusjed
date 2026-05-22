import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { pillTransition } from '../../utils/motion';
import { bottomNavItems } from './navConfig';

export function BottomNav() {
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);

  return (
    <nav className="safe-bottom sticky bottom-0 z-40 border-t border-slate-200/80 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="flex items-end justify-around px-2 pb-2 pt-1.5">
        {bottomNavItems.map((item) => {
          if (item.center) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="-mt-5 flex flex-col items-center gap-0.5"
              >
                {({ isActive }) => (
                  <>
                    <motion.span
                      whileTap={reduced ? undefined : { scale: 0.94 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-emerald-500/30 ring-4 ring-emerald-100'
                          : 'bg-brand-600 text-white shadow-emerald-500/25 hover:bg-brand-700'
                      }`}
                    >
                      <item.icon className="h-7 w-7" strokeWidth={2.5} />
                    </motion.span>
                    <span className="text-[11px] font-semibold text-brand-600">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className="relative flex min-w-[56px] flex-col items-center gap-1 px-2 py-1"
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <item.icon
                      className={`h-5 w-5 transition-colors ${isActive ? 'text-brand-600' : 'text-slate-400'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="bottomNavIndicator"
                        className="absolute -bottom-2 h-1 w-4 rounded-full bg-brand-600"
                        transition={transition}
                      />
                    )}
                  </span>
                  <span
                    className={`text-[11px] font-medium transition-colors ${
                      isActive ? 'text-brand-600' : 'text-slate-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
