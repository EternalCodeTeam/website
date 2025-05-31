"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from "./AnimationUtils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight";
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  [key: string]: any;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animationType = "fade",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  triggerOnce = false,
  id,
  "aria-labelledby": ariaLabelledby,
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
      default:
        return fadeIn;
    }
  };

  const animationVariant = getAnimationVariant();

  // Filter out animationType from props to prevent it from being passed to DOM elements
  const { animationType: _, ...filteredProps } = props;

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={className}
      variants={animationVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      {...filteredProps}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection; 