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

/* ----------------- Primitives ----------------- */

export const FadeIn = ({ children, delay = 0, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    custom={delay}
    initial="hidden"
    variants={fadeIn}
    viewport={{ once: true, margin: "-100px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </m.div>
);

export const SlideIn = ({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: MotionProps & { direction?: "up" | "down" | "left" | "right" }) => {
  const variantMap = {
    up: slideUp,
    down: slideDown,
    left: slideInLeft,
    right: slideInRight,
  } as const;

  return (
    <m.div
      className={className}
      custom={delay}
      initial="hidden"
      variants={variantMap[direction]}
      viewport={{ once: true, margin: "-100px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </m.div>
  );
};

export const ScaleIn = ({ children, delay = 0, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    custom={delay}
    initial="hidden"
    variants={scaleIn}
    viewport={{ once: true, margin: "-100px" }}
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

/* ----------------- Container ----------------- */

export const MotionSection = ({ children, className, ...props }: MotionProps) => (
  <m.div
    className={className}
    initial="hidden"
    variants={containerStagger}
    viewport={{ once: true, margin: "-80px" }}
    whileInView="visible"
    {...props}
  >
    {children}
  </m.div>
);
