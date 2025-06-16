"use client";

import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleAnimation,
} from "./AnimationUtils";

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale";
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
  interactive?: boolean;
  [key: string]: unknown;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  triggerOnce = false,
  as = "div",
  interactive = false,
  ...props
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });

  const getAnimationVariant = () => {
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

  const animationVariant = getAnimationVariant();

  const filteredProps = props;

  const commonProps = {
    ref,
    className,
    variants: animationVariant,
    initial: interactive ? "initial" : "hidden",
    animate: inView ? (interactive ? "initial" : "visible") : interactive ? "initial" : "hidden",
    whileHover: interactive ? "hover" : undefined,
    whileTap: interactive ? "tap" : undefined,
    transition: { delay },
    ...filteredProps,
  };

  switch (as) {
    case "div":
      return <motion.div {...commonProps}>{children}</motion.div>;
    case "section":
      return <motion.section {...commonProps}>{children}</motion.section>;
    case "article":
      return <motion.article {...commonProps}>{children}</motion.article>;
    case "main":
      return <motion.main {...commonProps}>{children}</motion.main>;
    case "header":
      return <motion.header {...commonProps}>{children}</motion.header>;
    case "footer":
      return <motion.footer {...commonProps}>{children}</motion.footer>;
    case "nav":
      return <motion.nav {...commonProps}>{children}</motion.nav>;
    case "aside":
      return <motion.aside {...commonProps}>{children}</motion.aside>;
    case "span":
      return <motion.span {...commonProps}>{children}</motion.span>;
    case "p":
      return <motion.p {...commonProps}>{children}</motion.p>;
    case "h1":
      return <motion.h1 {...commonProps}>{children}</motion.h1>;
    case "h2":
      return <motion.h2 {...commonProps}>{children}</motion.h2>;
    case "h3":
      return <motion.h3 {...commonProps}>{children}</motion.h3>;
    case "h4":
      return <motion.h4 {...commonProps}>{children}</motion.h4>;
    case "h5":
      return <motion.h5 {...commonProps}>{children}</motion.h5>;
    case "h6":
      return <motion.h6 {...commonProps}>{children}</motion.h6>;
    case "ul":
      return <motion.ul {...commonProps}>{children}</motion.ul>;
    case "ol":
      return <motion.ol {...commonProps}>{children}</motion.ol>;
    case "li":
      return <motion.li {...commonProps}>{children}</motion.li>;
    default:
      return <motion.div {...commonProps}>{children}</motion.div>;
  }
};

export default AnimatedElement;
