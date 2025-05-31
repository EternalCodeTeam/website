"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

// Animation variants for consistent animations across components
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      mass: 0.8
    }
  }
};

export const fadeDownScale = {
  hidden: { opacity: 0, y: -24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.8
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export function DocHeader({
  category,
  title,
  description,
  actions,
}: DocHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        {category && (
          <motion.div
            variants={fadeDownScale}
            className="text-muted-foreground text-sm uppercase tracking-wide"
            style={{ letterSpacing: "0.08em" }}
          >
            {category}
          </motion.div>
        )}
        {actions && (
          <motion.div 
            variants={fadeDownScale}
            className="flex items-center gap-2"
          >
            {actions}
          </motion.div>
        )}
      </div>
      <h1 className="mb-1 text-4xl font-extrabold tracking-tight">
        <motion.span
          variants={fadeDownScale}
        >
          {title}
        </motion.span>
      </h1>
      {description && (
        <motion.p
          variants={fadeDownScale}
          className="text-muted-foreground mb-0 mt-0 text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
