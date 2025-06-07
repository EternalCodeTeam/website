"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from "./AnimationUtils";
import { usePathname } from "next/navigation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight";
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  preserveAnimation?: boolean;
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
  preserveAnimation = false,
  id,
  "aria-labelledby": ariaLabelledby,
  ...props
}) => {
  const pathname = usePathname();
  const { ref, inView } = useInView({
    triggerOnce: preserveAnimation ? true : triggerOnce,
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

  const memoizedChildren = useMemo(() => {
    return children;
  }, [preserveAnimation ? pathname : null, children]);

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
      {preserveAnimation ? memoizedChildren : children}
    </motion.section>
  );
};

export default AnimatedSection; 