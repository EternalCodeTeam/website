import { Variants } from "framer-motion";

/**
 * Animation configurations for the documentation sidebar
 */

/**
 * Stagger container animation for sidebar items
 * Controls the staggered appearance of sidebar items
 */
export const sidebarStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

/**
 * Fade in from left animation for the sidebar
 * Used for the main sidebar container
 */
export const sidebarFadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 18,
      duration: 0.6,
    },
  },
};

/**
 * Fade in from bottom animation for sidebar items
 * Used for individual sidebar items
 */
export const sidebarFadeInUp: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      mass: 0.8,
    },
  },
};

/**
 * Hover animation for sidebar items
 * Used for interactive elements in the sidebar
 */
export const sidebarItemHover = {
  x: 3,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 14,
  },
};
