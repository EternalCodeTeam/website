"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fadeIn, fadeInDown, fadeInLeft, fadeInRight, fadeInUp } from "./AnimationUtils";

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
  [key: string]: unknown;
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
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: preserveAnimation ? true : triggerOnce,
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (inView && preserveAnimation) {
      setHasAnimated(true);
    }
  }, [inView, preserveAnimation]);

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

  const filteredProps = props;

  const memoizedChildren = useMemo(() => {
    return children;
  }, [children]);

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={className}
      variants={animationVariant}
      initial={preserveAnimation && hasAnimated ? "visible" : "hidden"}
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      {...filteredProps}
    >
      {memoizedChildren}
    </motion.section>
  );
};

export default AnimatedSection;
