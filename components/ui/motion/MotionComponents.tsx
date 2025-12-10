"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  containerStagger,
  fadeIn,
  hoverScale,
  scaleIn,
  slideDown,
  slideInLeft,
  slideInRight,
  slideUp,
} from "@/lib/animations/variants";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// --- Primitive Wrappers ---

export const FadeIn = ({ children, delay, className, ...props }: MotionProps) => (
  <motion.div
    className={className}
    initial="hidden"
    transition={delay ? { delay } : undefined}
    variants={fadeIn}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({
  children,
  delay,
  direction = "up",
  className,
  ...props
}: MotionProps & { direction?: "up" | "down" | "left" | "right" }) => {
  const getVariant = () => {
    switch (direction) {
      case "down":
        return slideDown;
      case "left":
        return slideInLeft;
      case "right":
        return slideInRight;
      default:
        return slideUp;
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      transition={delay ? { delay } : undefined}
      variants={getVariant()}
      viewport={{ once: true, margin: "0px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay, className, ...props }: MotionProps) => (
  <motion.div
    className={className}
    initial="hidden"
    transition={delay ? { delay } : undefined}
    variants={scaleIn}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverScale = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    className={className}
    initial="initial"
    variants={hoverScale}
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.div>
);

// --- Container (for Staggering) ---

export const StaggerContainer = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    className={className}
    initial="hidden"
    variants={containerStagger}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </motion.div>
);
