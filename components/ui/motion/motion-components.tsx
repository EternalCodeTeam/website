"use client";

import { type HTMLMotionProps, m } from "framer-motion";
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
  <m.div
    className={className}
    initial="hidden"
    // biome-ignore lint/nursery/noLeakedRender: Prop value
    transition={delay ? { delay } : undefined}
    variants={fadeIn}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </m.div>
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
    <m.div
      className={className}
      initial="hidden"
      // biome-ignore lint/nursery/noLeakedRender: Prop value
      transition={delay ? { delay } : undefined}
      variants={getVariant()}
      viewport={{ once: true, margin: "0px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </m.div>
  );
};

export const ScaleIn = ({ children, delay, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    initial="hidden"
    // biome-ignore lint/nursery/noLeakedRender: Prop value
    transition={delay ? { delay } : undefined}
    variants={scaleIn}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </m.div>
);

export const HoverScale = ({ children, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    initial="initial"
    variants={hoverScale}
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </m.div>
);

// --- Container (for Staggering) ---

export const StaggerContainer = ({ children, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    initial="hidden"
    variants={containerStagger}
    viewport={{ once: true, margin: "0px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </m.div>
);
