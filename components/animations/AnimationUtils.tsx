"use client";

import { Variants } from "framer-motion";

// Shared spring config
const sharedSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.8
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Fade in with slide up animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sharedSpring
  }
};

// Fade in with slide down animation
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: sharedSpring
  }
};

// Fade in with slide left animation
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: sharedSpring
  }
};

// Fade in with slide right animation
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: sharedSpring
  }
};

// Staggered children animation container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeInOut",
      duration: 0.5
    }
  }
};

// Scale animation for buttons and interactive elements
const scaleSpring = {
  type: "spring",
  stiffness: 400,
  damping: 10
};

export const scaleAnimation: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: scaleSpring
  },
  tap: {
    scale: 0.95,
    transition: scaleSpring
  }
};

// Page transition animation
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}; 