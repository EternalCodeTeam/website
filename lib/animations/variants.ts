import type { Variants, Transition } from "framer-motion";

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 1,
};

export const bouncySpring: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 12,
};

export const snappySpring: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

export const smoothEase: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier (easeOutExpo-ish)
};

// --- Variants ---

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: smoothEase,
  },
};

export const slideUp: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: softSpring,
  },
};

export const slideDown: Variants = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: softSpring,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: softSpring,
  },
};

export const slideInRight: Variants = {
  hidden: {
    x: 20,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: softSpring,
  },
};

export const scaleIn: Variants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: softSpring,
  },
};

export const containerStagger: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08, // Faster stagger
      delayChildren: 0,
    },
  },
};

export const hoverScale: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { ...bouncySpring, mass: 0.8 },
  },
  tap: {
    scale: 0.97,
    transition: snappySpring,
  },
};
