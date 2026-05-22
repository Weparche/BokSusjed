import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { pillTransition } from '../../utils/motion';
import { bottomNavItems } from './navConfig';

export function BottomNav() {
  const reduced = useReducedMotion();
  const transition = pillTransition(!!reduced);

  return (
    <nav className="safe-bottom sticky bottom-0 z-40 border-t border-rule bg-paper-2/95 backdrop-blur-md lg:hidden">
      <div className="flex items-end justify-around px-2 pb-2 pt-1.5">
        {bottomNavItems.map((item) => {
          if (item.center) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="-mt-5 flex flex-col items-center gap-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {({ isActive }) => (
                  <>
                    <motion.span
                      whileTap={reduced ? undefined : { scale: 0.94 }}
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-accent-ink shadow-[var(--shadow-lift)] transition-colors ${
                        isActive
                          ? 'bg-accent ring-4 ring-accent-soft'
                          : 'bg-accent hover:bg-accent-strong'
                      }`}
                    >
                      <item.icon className="h-7 w-7" strokeWidth={2.5} />
                    </motion.span>
                    <span className="text-[11px] font-semibold text-accent">{item.label}</span>
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
              className="relative flex min-w-[56px] flex-col items-center gap-1 px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {({ isActive }) => (
                <>
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <item.icon
                      className={`h-5 w-5 transition-colors ${isActive ? 'text-accent' : 'text-muted'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="bottomNavIndicator"
                        className="absolute -bottom-2 h-1 w-4 rounded-full bg-accent"
                        transition={transition}
                      />
                    )}
                  </span>
                  <span
                    className={`text-[11px] font-medium transition-colors ${
                      isActive ? 'text-accent' : 'text-muted'
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
