"use client";

import { type HTMLMotionProps, m } from "framer-motion";
import type { ReactNode } from "react";
import {
  containerStagger,
  fadeIn,
  hoverScale,
  type MotionCustom,
  scaleIn,
  slideDown,
  slideInLeft,
  slideInRight,
  slideUp,
} from "@/lib/animations/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  delayChildren?: number;
}

/* ----------------- Primitives ----------------- */

export const FadeIn = ({ children, delay = 0, className, ...props }: MotionProps) => (
  <FadeInBase className={className} delay={delay} {...props}>
    {children}
  </FadeInBase>
);

export const SlideIn = ({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: MotionProps & { direction?: "up" | "down" | "left" | "right" }) => {
  const prefersReducedMotion = useReducedMotion();
  const variantMap = {
    up: slideUp,
    down: slideDown,
    left: slideInLeft,
    right: slideInRight,
  } as const;

  return (
    <m.div
      className={className}
      custom={{ delay, reduced: prefersReducedMotion } satisfies MotionCustom}
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
  <ScaleInBase className={className} delay={delay} {...props}>
    {children}
  </ScaleInBase>
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
  <MotionSectionBase className={className} {...props}>
    {children}
  </MotionSectionBase>
);

const FadeInBase = ({ children, delay = 0, className, ...props }: MotionProps) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      custom={{ delay, reduced: prefersReducedMotion } satisfies MotionCustom}
      initial="hidden"
      variants={fadeIn}
      viewport={{ once: true, margin: "-100px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </m.div>
  );
};

const ScaleInBase = ({ children, delay = 0, className, ...props }: MotionProps) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      custom={{ delay, reduced: prefersReducedMotion } satisfies MotionCustom}
      initial="hidden"
      variants={scaleIn}
      viewport={{ once: true, margin: "-100px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </m.div>
  );
};

const MotionSectionBase = ({
  children,
  className,
  stagger,
  delayChildren,
  ...props
}: MotionProps) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      custom={{ reduced: prefersReducedMotion, stagger, delayChildren } satisfies MotionCustom}
      initial="hidden"
      variants={containerStagger}
      viewport={{ once: true, margin: "-80px" }}
      whileInView="visible"
      {...props}
    >
      {children}
    </m.div>
  );
};
