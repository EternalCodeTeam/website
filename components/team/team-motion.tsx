"use client";

import { animate, m, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { easeOut } from "@/lib/animations/variants";

/* ----------------- Reveal ----------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function TeamReveal({ children, className, delay = 0, y = 28 }: RevealProps) {
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

/* ----------------- Staggered grid ----------------- */

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function TeamStaggerGrid({ children, className }: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
      variants={{ hidden: {}, visible: {} }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView="visible"
    >
      {children}
    </m.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function TeamStaggerItem({ children, className }: StaggerItemProps) {
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

/* ----------------- Animated counter ----------------- */

export function TeamCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const spring = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (current) => Math.round(current).toString());

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (shouldReduceMotion) {
      spring.set(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => spring.set(latest),
    });

    return () => controls.stop();
  }, [inView, value, shouldReduceMotion, spring]);

  return <m.span ref={ref}>{display}</m.span>;
}
