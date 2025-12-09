import type { Variants, Transition } from "framer-motion";

// --- Physics & Transitions ---

export const softSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
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
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier (easeOutExpo-ish)
};

// --- Variants ---

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)", // Subtle blur for premium feel
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: smoothEase,
  },
};

export const slideUp: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: softSpring,
  },
};

export const slideDown: Variants = {
  hidden: {
    y: -30,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: softSpring,
  },
};

export const slideInLeft: Variants = {
  hidden: {
    x: -30,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: softSpring,
  },
};

export const slideInRight: Variants = {
  hidden: {
    x: 30,
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: softSpring,
  },
};

export const scaleIn: Variants = {
  hidden: {
    scale: 0.92,
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
      staggerChildren: 0.1, // Stagger delay between children
      delayChildren: 0.05,
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
