"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeIn,
  slideUp,
  slideDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  containerStagger,
  hoverScale,
} from "@/lib/animations/variants";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// --- Primitive Wrappers ---

export const FadeIn = ({ children, delay, className, ...props }: MotionProps) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px" }}
    transition={delay ? { delay } : undefined}
    className={className}
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
      variants={getVariant()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      transition={delay ? { delay } : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn = ({ children, delay, className, ...props }: MotionProps) => (
  <motion.div
    variants={scaleIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px" }}
    transition={delay ? { delay } : undefined}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverScale = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    variants={hoverScale}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

// --- Container (for Staggering) ---

export const StaggerContainer = ({ children, className, ...props }: MotionProps) => (
  <motion.div
    variants={containerStagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px" }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);
