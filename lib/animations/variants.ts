import type { Transition, Variants } from "framer-motion";

export const easeOut: Transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

export const fastEase: Transition = {
  duration: 0.18,
  ease: [0.4, 0, 0.2, 1],
};

export const interactionSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
  mass: 0.9,
};

export const tapSpring: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 35,
  mass: 0.8,
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { ...easeOut, delay },
  }),
};

export const slideUp: Variants = {
  hidden: {
    y: 32,
    opacity: 0,
    willChange: "transform, opacity",
  },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    willChange: "auto",
    transition: {
      y: { ...easeOut, delay },
      opacity: { ...easeOut, delay },
    },
  }),
};

export const slideDown: Variants = {
  hidden: {
    y: -32,
    opacity: 0,
    willChange: "transform, opacity",
  },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    willChange: "auto",
    transition: {
      y: { ...easeOut, delay },
      opacity: { ...easeOut, delay },
    },
  }),
};

export const slideInLeft: Variants = {
  hidden: {
    x: -32,
    opacity: 0,
    willChange: "transform, opacity",
  },
  visible: (delay = 0) => ({
    x: 0,
    opacity: 1,
    willChange: "auto",
    transition: {
      x: { ...easeOut, delay },
      opacity: { ...easeOut, delay },
    },
  }),
};

export const slideInRight: Variants = {
  hidden: {
    x: 32,
    opacity: 0,
    willChange: "transform, opacity",
  },
  visible: (delay = 0) => ({
    x: 0,
    opacity: 1,
    willChange: "auto",
    transition: {
      x: { ...easeOut, delay },
      opacity: { ...easeOut, delay },
    },
  }),
};

export const scaleIn: Variants = {
  hidden: {
    scale: 0.94,
    opacity: 0,
    willChange: "transform, opacity",
  },
  visible: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    willChange: "auto",
    transition: {
      scale: { ...easeOut, delay },
      opacity: { ...easeOut, delay },
    },
  }),
};

export const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const hoverScale: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.035,
    willChange: "transform",
    transition: fastEase,
  },
  tap: {
    scale: 0.97,
    willChange: "transform",
    transition: tapSpring,
  },
};
