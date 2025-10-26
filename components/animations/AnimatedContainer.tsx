"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px 0px -100px 0px",
  triggerOnce = false,
  staggerDelay = 0.15,
  as = "div",
  ...props
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
    rootMargin,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const motionComponents = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    main: motion.main,
    header: motion.header,
    footer: motion.footer,
    nav: motion.nav,
    aside: motion.aside,
    span: motion.span,
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
    ul: motion.ul,
    ol: motion.ol,
    li: motion.li,
  };

  const MotionComponent = motionComponents[as as keyof typeof motionComponents] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedContainer;
