import type { Transition, Variants } from "framer-motion";

export type MotionCustom =
  | number
  | {
      delay?: number;
      distance?: number;
      scale?: number;
      reduced?: boolean;
      duration?: number;
      stagger?: number;
      delayChildren?: number;
      blur?: number;
      hoverDistance?: number;
      hoverScale?: number;
      tapScale?: number;
      exitDistance?: number;
    };

const getDelay = (custom?: MotionCustom) =>
  typeof custom === "number" ? custom : custom?.delay ?? 0;
const getDistance = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.distance === "number" ? custom.distance : fallback;
const getScale = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.scale === "number" ? custom.scale : fallback;
const getDuration = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.duration === "number" ? custom.duration : fallback;
const getStagger = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.stagger === "number" ? custom.stagger : fallback;
const getDelayChildren = (custom?: MotionCustom) =>
  typeof custom === "object" && typeof custom.delayChildren === "number"
    ? custom.delayChildren
    : undefined;
const getBlur = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.blur === "number" ? custom.blur : fallback;
const getHoverDistance = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.hoverDistance === "number"
    ? custom.hoverDistance
    : fallback;
const getHoverScale = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.hoverScale === "number" ? custom.hoverScale : fallback;
const getTapScale = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.tapScale === "number" ? custom.tapScale : fallback;
const getExitDistance = (custom: MotionCustom | undefined, fallback: number) =>
  typeof custom === "object" && typeof custom.exitDistance === "number"
    ? custom.exitDistance
    : fallback;
const isReduced = (custom?: MotionCustom) => typeof custom === "object" && custom.reduced;

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
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
  }),
  visible: (custom) => ({
    opacity: 1,
    transition: isReduced(custom) ? { duration: 0, delay: 0 } : { ...easeOut, delay: getDelay(custom) },
  }),
};

export const slideUp: Variants = {
  hidden: (custom) => ({
    y: isReduced(custom) ? 0 : getDistance(custom, 32),
    opacity: isReduced(custom) ? 1 : 0,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          y: { ...easeOut, delay: getDelay(custom) },
          opacity: { ...easeOut, delay: getDelay(custom) },
        },
  }),
};

export const slideDown: Variants = {
  hidden: (custom) => ({
    y: isReduced(custom) ? 0 : -getDistance(custom, 32),
    opacity: isReduced(custom) ? 1 : 0,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          y: { ...easeOut, delay: getDelay(custom) },
          opacity: { ...easeOut, delay: getDelay(custom) },
        },
  }),
};

export const slideInLeft: Variants = {
  hidden: (custom) => ({
    x: isReduced(custom) ? 0 : -getDistance(custom, 32),
    opacity: isReduced(custom) ? 1 : 0,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          x: { ...easeOut, delay: getDelay(custom) },
          opacity: { ...easeOut, delay: getDelay(custom) },
        },
  }),
  exit: (custom) => ({
    x: isReduced(custom)
      ? 0
      : getExitDistance(custom, -getDistance(custom, 32)),
    opacity: isReduced(custom) ? 1 : 0,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, duration: 0.12 },
  }),
  hover: (custom) => ({
    x: isReduced(custom) ? 0 : getHoverDistance(custom, 0),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const slideInRight: Variants = {
  hidden: (custom) => ({
    x: isReduced(custom) ? 0 : getDistance(custom, 32),
    opacity: isReduced(custom) ? 1 : 0,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          x: { ...easeOut, delay: getDelay(custom) },
          opacity: { ...easeOut, delay: getDelay(custom) },
        },
  }),
  exit: (custom) => ({
    x: isReduced(custom)
      ? 0
      : getExitDistance(custom, getDistance(custom, 32)),
    opacity: isReduced(custom) ? 1 : 0,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, duration: 0.12 },
  }),
  hover: (custom) => ({
    x: isReduced(custom) ? 0 : getHoverDistance(custom, 0),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const slideInLeftFull: Variants = {
  hidden: (custom) => ({
    x: isReduced(custom) ? 0 : "-100%",
  }),
  visible: (custom) => ({
    x: 0,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, delay: getDelay(custom) },
  }),
  exit: (custom) => ({
    x: isReduced(custom) ? 0 : "-100%",
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, duration: 0.2 },
  }),
};

export const scaleIn: Variants = {
  hidden: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 0.94),
    opacity: isReduced(custom) ? 1 : 0,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    scale: 1,
    opacity: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          scale: { ...easeOut, delay: getDelay(custom) },
          opacity: { ...easeOut, delay: getDelay(custom) },
        },
  }),
};

export const containerStagger: Variants = {
  hidden: {},
  visible: (custom) => ({
    transition: isReduced(custom)
      ? {}
      : {
          staggerChildren: getStagger(custom, 0.06),
          delayChildren: getDelayChildren(custom),
        },
  }),
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

export const hoverShift: Variants = {
  initial: {
    x: 0,
  },
  hover: (custom) => ({
    x: isReduced(custom) ? 0 : getDistance(custom, 4),
    transition: isReduced(custom) ? { duration: 0 } : interactionSpring,
  }),
};

export const hoverTwist: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: (custom) => ({
    scale: isReduced(custom) ? 1 : 1.1,
    rotate: isReduced(custom) ? 0 : 15,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  tap: (custom) => ({
    scale: isReduced(custom) ? 1 : 0.9,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const hoverScaleSoft: Variants = {
  initial: {
    scale: 1,
  },
  hover: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 1.01),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  tap: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 0.99),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const hoverTilt: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  hover: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 1.1),
    rotate: isReduced(custom) ? 0 : getDistance(custom, 5),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const floatingButton: Variants = {
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    scale: isReduced(custom) ? 1 : getScale(custom, 0.8),
  }),
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, delay: getDelay(custom) },
  }),
  hover: (custom) => ({
    scale: isReduced(custom) ? 1 : 1.1,
    rotate: isReduced(custom) ? 0 : 15,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  tap: (custom) => ({
    scale: isReduced(custom) ? 1 : 0.9,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const popIn: Variants = {
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    y: isReduced(custom) ? 0 : getDistance(custom, 8),
    scale: isReduced(custom) ? 1 : getScale(custom, 0.96),
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : { ...easeOut, delay: getDelay(custom) },
  }),
  exit: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    y: isReduced(custom) ? 0 : getExitDistance(custom, -6),
    scale: isReduced(custom) ? 1 : getScale(custom, 0.96),
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, duration: 0.12 },
  }),
  hover: (custom) => ({
    x: isReduced(custom) ? 0 : getHoverDistance(custom, 0),
    scale: isReduced(custom) ? 1 : getHoverScale(custom, 1.02),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  tap: (custom) => ({
    scale: isReduced(custom) ? 1 : getTapScale(custom, 0.98),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const rotateIn: Variants = {
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    scale: isReduced(custom) ? 1 : getScale(custom, 0.85),
    rotate: isReduced(custom) ? 0 : -10,
    willChange: isReduced(custom) ? "auto" : "transform, opacity",
  }),
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    willChange: "auto",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: getDelay(custom),
        },
  }),
  hover: (custom) => ({
    scale: isReduced(custom) ? 1 : 1.08,
    rotate: isReduced(custom) ? 0 : 5,
  }),
};

export const blurIn: Variants = {
  hidden: (custom) => ({
    y: isReduced(custom) ? 0 : getDistance(custom, 20),
    opacity: isReduced(custom) ? 1 : 0,
    filter: isReduced(custom) ? "blur(0px)" : `blur(${getBlur(custom, 4)}px)`,
  }),
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: isReduced(custom)
      ? { duration: 0, delay: 0 }
      : {
          type: "spring",
          stiffness: 200,
          damping: 24,
          mass: 1,
          delay: getDelay(custom),
        },
  }),
};

export const wiggle: Variants = {
  initial: {
    rotate: 0,
  },
  animate: (custom) => ({
    rotate: isReduced(custom) ? 0 : [0, -10, 10, 0],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 0.5),
          delay: getDelay(custom),
        },
  }),
};

export const pulse: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: (custom) => ({
    opacity: isReduced(custom) ? 1 : [1, 0.6, 1],
    scale: isReduced(custom) ? 1 : [1, 1.05, 1],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 3),
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
  }),
};

export const sway: Variants = {
  initial: {
    rotate: 0,
  },
  animate: (custom) => ({
    rotate: isReduced(custom) ? 0 : [-6, 6, -6],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 4),
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
  }),
};

export const marquee: Variants = {
  initial: {
    x: 0,
  },
  animate: (custom) => ({
    x: isReduced(custom) ? 0 : "-100%",
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: getDuration(custom, 40),
          ease: "linear",
        },
  }),
};

export const marqueeReverse: Variants = {
  initial: {
    x: "-50%",
  },
  animate: (custom) => ({
    x: isReduced(custom) ? "0%" : "0%",
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: getDuration(custom, 40),
          ease: "linear",
        },
  }),
};

export const marqueeHalf: Variants = {
  initial: {
    x: "0%",
  },
  animate: (custom) => ({
    x: isReduced(custom) ? "0%" : "-50%",
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: getDuration(custom, 40),
          ease: "linear",
        },
  }),
};

export const marqueeHalfReverse: Variants = {
  initial: {
    x: "-50%",
  },
  animate: (custom) => ({
    x: isReduced(custom) ? "0%" : "0%",
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: getDuration(custom, 40),
          ease: "linear",
        },
  }),
};

export const expandCollapse: Variants = {
  hidden: (custom) => ({
    height: 0,
    opacity: isReduced(custom) ? 1 : 0,
  }),
  visible: (custom) => ({
    height: "auto",
    opacity: 1,
    transition: isReduced(custom)
      ? { duration: 0 }
      : { ...interactionSpring, delay: getDelay(custom) },
  }),
};

export const skeletonPulse: Variants = {
  initial: {
    opacity: 0.5,
  },
  animate: (custom) => ({
    opacity: isReduced(custom) ? 1 : [0.5, 1, 0.5],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 1.5),
          repeat: Number.POSITIVE_INFINITY,
        },
  }),
};

export const skeletonShimmer: Variants = {
  initial: {
    x: "-100%",
  },
  animate: (custom) => ({
    x: isReduced(custom) ? "0%" : ["-100%", "100%"],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 1.2),
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
      },
  }),
};

export const scaleXIn: Variants = {
  hidden: {
    scaleX: 0,
  },
  visible: (custom) => ({
    scaleX: 1,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut },
  }),
  exit: (custom) => ({
    scaleX: 0,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut },
  }),
};

export const focusScale: Variants = {
  initial: {
    scale: 1,
  },
  focused: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 1.1),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const spin: Variants = {
  initial: {
    rotate: 0,
  },
  animate: (custom) => ({
    rotate: isReduced(custom) ? 0 : 360,
    transition: isReduced(custom)
      ? { duration: 0 }
      : { duration: getDuration(custom, 1), repeat: Number.POSITIVE_INFINITY, ease: "linear" },
  }),
};

export const rotateToggle: Variants = {
  collapsed: (custom) => ({
    rotate: isReduced(custom) ? 0 : 0,
    transition: isReduced(custom) ? { duration: 0 } : interactionSpring,
  }),
  expanded: (custom) => ({
    rotate: isReduced(custom) ? 0 : 90,
    transition: isReduced(custom) ? { duration: 0 } : interactionSpring,
  }),
};

export const switchThumb: Variants = {
  off: (custom) => ({
    x: 4,
    transition: isReduced(custom) ? { duration: 0 } : interactionSpring,
  }),
  on: (custom) => ({
    x: 24,
    transition: isReduced(custom) ? { duration: 0 } : interactionSpring,
  }),
};

export const inputField: Variants = {
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    y: isReduced(custom) ? 0 : getDistance(custom, 3),
  }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, delay: getDelay(custom) },
  }),
  focused: (custom) => ({
    scale: isReduced(custom) ? 1 : getScale(custom, 1.005),
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const drawPath: Variants = {
  hidden: (custom) => ({
    pathLength: isReduced(custom) ? 1 : 0,
    opacity: isReduced(custom) ? 1 : 0,
  }),
  visible: (custom) => ({
    pathLength: 1,
    opacity: 1,
    transition: isReduced(custom)
      ? { duration: 0 }
      : { duration: getDuration(custom, 2), ease: "easeInOut" },
  }),
};

export const tableRow: Variants = {
  hidden: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    y: isReduced(custom) ? 0 : 10,
  }),
  visible: (custom) => {
    const index = typeof custom === "number" ? custom : 0;
    const delay = typeof custom === "object" ? custom.delay ?? index * 0.03 : index * 0.03;
    return {
      opacity: 1,
      y: 0,
      transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, delay },
    };
  },
  exit: (custom) => ({
    opacity: isReduced(custom) ? 1 : 0,
    y: isReduced(custom) ? 0 : -5,
    transition: isReduced(custom) ? { duration: 0 } : { ...easeOut, duration: 0.1 },
  }),
};

export const hamburgerTop: Variants = {
  closed: { rotate: 0, translateY: 0 },
  opened: { rotate: 45, translateY: 6 },
};

export const hamburgerCenter: Variants = {
  closed: { opacity: 1 },
  opened: { opacity: 0 },
};

export const hamburgerBottom: Variants = {
  closed: { rotate: 0, translateY: 0 },
  opened: { rotate: -45, translateY: -6 },
};

export const floatBlob: Variants = {
  initial: {
    x: 0,
    y: 0,
    scale: 1,
  },
  animate: (custom) => ({
    x: isReduced(custom) ? 0 : [0, 15, -10, 20, 0],
    y: isReduced(custom) ? 0 : [0, -12, 18, -8, 0],
    scale: isReduced(custom) ? 1 : [1, 1.1, 0.95, 1.05, 1],
    transition: isReduced(custom)
      ? { duration: 0 }
      : {
          duration: getDuration(custom, 25),
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
  }),
};

export const rotateChevron: Variants = {
  closed: (custom) => ({
    rotate: 0,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  open: (custom) => ({
    rotate: isReduced(custom) ? 0 : 180,
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};

export const accordionHighlight: Variants = {
  closed: (custom) => ({
    backgroundColor: "transparent",
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
  open: (custom) => ({
    backgroundColor: isReduced(custom) ? "transparent" : "rgba(0,0,0,0.02)",
    transition: isReduced(custom) ? { duration: 0 } : fastEase,
  }),
};
