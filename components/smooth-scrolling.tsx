"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 0.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
