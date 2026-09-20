"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "@/lib/animations/variants";

interface ContributeRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function ContributeReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: ContributeRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      transition={{ ...easeOut, duration: 0.6, delay }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </m.div>
  );
}

interface ContributeStaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function ContributeStaggerGrid({ children, className }: ContributeStaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      transition={{ staggerChildren: 0.08, delayChildren: 0.08 }}
      variants={{ hidden: {}, visible: {} }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView="visible"
    >
      {children}
    </m.div>
  );
}

interface ContributeStaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function ContributeStaggerItem({ children, className }: ContributeStaggerItemProps) {
  return (
    <m.div
      className={className}
      transition={easeOut}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
    >
      {children}
    </m.div>
  );
}
