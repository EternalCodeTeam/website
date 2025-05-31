"use client";

import React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer } from "./AnimationUtils";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
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

  // Create a custom container with the appropriate animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
        ease: "easeInOut",
        duration: 0.5
      }
    }
  };

  // Use a type-safe approach with conditional rendering
  if (as === "div") {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.div>
    );
  } else if (as === "section") {
    return (
      <motion.section
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.section>
    );
  } else if (as === "article") {
    return (
      <motion.article
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.article>
    );
  } else if (as === "main") {
    return (
      <motion.main
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.main>
    );
  } else if (as === "header") {
    return (
      <motion.header
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.header>
    );
  } else if (as === "footer") {
    return (
      <motion.footer
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.footer>
    );
  } else if (as === "nav") {
    return (
      <motion.nav
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.nav>
    );
  } else if (as === "aside") {
    return (
      <motion.aside
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.aside>
    );
  } else if (as === "span") {
    return (
      <motion.span
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.span>
    );
  } else if (as === "p") {
    return (
      <motion.p
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.p>
    );
  } else if (as === "h1") {
    return (
      <motion.h1
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h1>
    );
  } else if (as === "h2") {
    return (
      <motion.h2
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h2>
    );
  } else if (as === "h3") {
    return (
      <motion.h3
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h3>
    );
  } else if (as === "h4") {
    return (
      <motion.h4
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h4>
    );
  } else if (as === "h5") {
    return (
      <motion.h5
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h5>
    );
  } else if (as === "h6") {
    return (
      <motion.h6
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.h6>
    );
  } else if (as === "ul") {
    return (
      <motion.ul
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.ul>
    );
  } else if (as === "ol") {
    return (
      <motion.ol
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.ol>
    );
  } else if (as === "li") {
    return (
      <motion.li
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.li>
    );
  } else {
    // Default to div if the element type is not supported
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
};

export default AnimatedContainer; 