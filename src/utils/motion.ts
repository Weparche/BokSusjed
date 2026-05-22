export const easeOut = [0.32, 0.72, 0, 1] as const;

export function motionDuration(reduced: boolean, ms: number): number {
  return reduced ? 0.01 : ms / 1000;
}

export function staggerContainer(reduced: boolean) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
        delayChildren: reduced ? 0 : 0.03,
      },
    },
  };
}

export function staggerItem(reduced: boolean) {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: motionDuration(reduced, 250), ease: easeOut },
    },
    exit: reduced
      ? { opacity: 0 }
      : { opacity: 0, y: 8, transition: { duration: motionDuration(reduced, 150), ease: easeOut } },
  };
}

export function sheetTransition(reduced: boolean) {
  return { duration: motionDuration(reduced, 320), ease: easeOut };
}

export function pillTransition(reduced: boolean) {
  return { duration: motionDuration(reduced, 250), ease: easeOut };
}

export function collapseTransition(reduced: boolean) {
  return { duration: motionDuration(reduced, 280), ease: easeOut };
}

export function pageTransition(reduced: boolean) {
  return { duration: motionDuration(reduced, 200), ease: easeOut };
}

export const pulseLoop = (reduced: boolean) =>
  reduced
    ? {}
    : {
        scale: [1, 1.15, 1] as number[],
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
      };

export const pulseRingLoop = (reduced: boolean) =>
  reduced
    ? {}
    : {
        scale: [1, 1.9, 1] as number[],
        opacity: [0.35, 0, 0.35] as number[],
        transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const },
      };
