import type { Variants, Transition } from "framer-motion";

/**
 * EDUS animation system
 * --------------------------------------------------------------
 * Premium, fast, mobile-friendly. Transform + opacity only.
 * All variants honour prefers-reduced-motion via `useReducedMotion`
 * helpers in components.
 *
 * Single easing curve across the system → cohesive feel.
 * Single duration band (.45 – .7s) → never sluggish.
 */

const easeOut: Transition["ease"] = [0.2, 0.7, 0.2, 1];
const easeSoft: Transition["ease"] = [0.25, 0.8, 0.3, 1];

/** Fade up — hero title, section heads, paragraphs. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/** Stagger container — wrap a list of fadeUp children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/** Glass card hover — used with whileHover. */
export const glassHover = {
  rest: { y: 0, transition: { duration: 0.25, ease: easeSoft } },
  hover: { y: -4, transition: { duration: 0.25, ease: easeSoft } },
};

/** Floating blob — gentle endless idle motion. */
export const floatingBlob = (delay = 0): Variants => ({
  initial: { x: 0, y: 0, scale: 1 },
  animate: {
    x: [0, 18, -10, 0],
    y: [0, -14, 10, 0],
    scale: [1, 1.04, 0.98, 1],
    transition: {
      duration: 18,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      delay,
    },
  },
});

/** Button glow — subtle drop-shadow pulse on focus / once on mount. */
export const buttonGlow: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: 0.35 },
  },
};

/** Section reveal — when section enters viewport. */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Step reveal — for ordered lists, one-by-one. */
export const stepReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.08 },
  }),
};

/** Accordion motion — smooth height + opacity. */
export const accordionMotion: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: easeSoft },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: easeSoft },
  },
};

/** Default viewport options for once-only scroll reveal. */
export const inView = { once: true, amount: 0.2 } as const;

/** Default viewport options for tighter (later) reveals. */
export const inViewClose = { once: true, amount: 0.35 } as const;

/** Section reveal with stronger lift — used for big content blocks. */
export const sectionRevealStrong: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

/** Slide reveal from the side — for asymmetric layouts. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

/** Scale-in for emphasis blocks (CTA cards, badges). */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

/** Fast stagger for chips and small items. */
export const fastStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.04 },
  },
};

export const ease = { easeOut, easeSoft };
