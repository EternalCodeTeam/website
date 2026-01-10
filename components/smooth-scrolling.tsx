"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
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
