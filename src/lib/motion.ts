import type { Transition, Variants } from 'framer-motion';

/** Shared easing curve — restrained, cinematic. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const durations = { fast: 0.35, base: 0.6, slow: 0.9 };

/** Standard transitions */
export const tFast: Transition = { duration: 0.4, ease: EASE };
export const tBase: Transition = { duration: 0.7, ease: EASE };
export const tSlow: Transition = { duration: 1.0, ease: EASE };

/* ---------- Viewport presets ---------- */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/* ---------- Variants ---------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: tBase },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: tBase },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  show: { opacity: 1, scale: 1, transition: tSlow },
};

/** Clip-path mask reveal (bottom → top) */
export const revealMask: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.0, ease: EASE } },
};

/** Staggered container — children use fadeUp */
export const staggerContainer = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: tBase },
};

/** Slide-in from sides for editorial image/text rows */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: tBase },
};
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: tBase },
};

/* ---------- Page transitions ---------- */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } },
};

/* ---------- Modal ---------- */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE, staggerChildren: 0.05, delayChildren: 0.1 } },
  exit: { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.25 } },
};
