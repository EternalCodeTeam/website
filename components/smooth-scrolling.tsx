"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  // Fall back to native scrolling for users who ask for less motion, and on
  // touch devices where inertial scrolling already feels correct.
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      options={{
        lerp: 0.3,
        smoothWheel: true,
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}
