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
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/* ----------------- Primitives ----------------- */

export const FadeIn = ({ children, delay = 0, className, ...props }: MotionProps) => (
  <FadeInInner className={className} delay={delay} props={props}>
    {children}
  </FadeInInner>
);

export const SlideIn = ({
  children,
  delay = 0,
  direction = "up",
  className,
  ...props
}: MotionProps & { direction?: "up" | "down" | "left" | "right" }) => {
  return (
    <SlideInInner className={className} delay={delay} direction={direction} props={props}>
      {children}
    </SlideInInner>
  );
};

export const ScaleIn = ({ children, delay = 0, className, ...props }: MotionProps) => (
  <ScaleInInner className={className} delay={delay} props={props}>
    {children}
  </ScaleInInner>
);

export const HoverScale = ({ children, className, ...props }: MotionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={prefersReducedMotion ? false : "initial"}
      variants={prefersReducedMotion ? undefined : hoverScale}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      whileTap={prefersReducedMotion ? undefined : "tap"}
      {...props}
    >
      {children}
    </m.div>
  );
};

/* ----------------- Container ----------------- */

export const MotionSection = ({ children, className, ...props }: MotionProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      variants={prefersReducedMotion ? undefined : containerStagger}
      viewport={prefersReducedMotion ? undefined : { once: true, margin: "-80px" }}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </m.div>
  );
};

const FadeInInner = ({
  children,
  delay,
  className,
  props,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
  props: Omit<MotionProps, "children" | "delay" | "className">;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      custom={delay}
      initial={prefersReducedMotion ? false : "hidden"}
      variants={prefersReducedMotion ? undefined : fadeIn}
      viewport={prefersReducedMotion ? undefined : { once: true, margin: "-100px" }}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </m.div>
  );
};

const SlideInInner = ({
  children,
  delay,
  direction,
  className,
  props,
}: {
  children: ReactNode;
  delay: number;
  direction: "up" | "down" | "left" | "right";
  className?: string;
  props: Omit<MotionProps, "children" | "delay" | "className">;
}) => {
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
      custom={delay}
      initial={prefersReducedMotion ? false : "hidden"}
      variants={prefersReducedMotion ? undefined : variantMap[direction]}
      viewport={prefersReducedMotion ? undefined : { once: true, margin: "-100px" }}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </m.div>
  );
};

const ScaleInInner = ({
  children,
  delay,
  className,
  props,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
  props: Omit<MotionProps, "children" | "delay" | "className">;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      custom={delay}
      initial={prefersReducedMotion ? false : "hidden"}
      variants={prefersReducedMotion ? undefined : scaleIn}
      viewport={prefersReducedMotion ? undefined : { once: true, margin: "-100px" }}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      {...props}
    >
      {children}
    </m.div>
  );
};
