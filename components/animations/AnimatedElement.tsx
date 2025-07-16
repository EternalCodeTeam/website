"use client";

import { motion, MotionProps, Variants } from "framer-motion";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  ReactNode,
  useMemo,
} from "react";
import { useInView } from "react-intersection-observer";

import {
  fadeIn,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleAnimation,
} from "./AnimationUtils";

type AnimationType = "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";

const getAnimationVariant = (animationType: AnimationType): Variants => {
  switch (animationType) {
    case "fadeUp":
      return fadeInUp;
    case "fadeDown":
      return fadeInDown;
    case "fadeLeft":
      return fadeInLeft;
    case "fadeRight":
      return fadeInRight;
    case "scale":
      return scaleAnimation;
    default:
      return fadeIn;
  }
};

type AnimatedElementProps<T extends ElementType> = {
  children: ReactNode;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  interactive?: boolean;
  as?: T;
} & MotionProps &
  Omit<ComponentPropsWithoutRef<T>, keyof MotionProps>;

const AnimatedElement = <T extends ElementType = "div">({
  children,
  animationType = "fade",
  delay = 0,
  threshold = 0.05,
  rootMargin = "0px 0px -20px 0px", // próg wejscia animacji, -20 powoduje ze animacja wchodzi od razu i nie buguje sie
  triggerOnce = false,
  interactive = false,
  as,
  ...restProps
}: AnimatedElementProps<T>) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });

  const variants = getAnimationVariant(animationType);

  const Component = useMemo(() => motion(as || "div"), [as]) as ComponentType<any>;

  return (
    <Component
      ref={ref}
      variants={variants}
      initial={interactive ? "initial" : "hidden"}
      animate={interactive ? "initial" : inView ? "visible" : "hidden"}
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      transition={{ delay }}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default AnimatedElement;
