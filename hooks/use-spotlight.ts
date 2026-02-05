"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useRef } from "react";

export function useSpotlight<T extends HTMLElement>() {
  const frameRef = useRef<number | null>(null);

  const onPointerMove = useCallback((event: ReactPointerEvent<T>) => {
    const { clientX, clientY, currentTarget } = event;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      currentTarget.style.setProperty("--spotlight-x", `${x}px`);
      currentTarget.style.setProperty("--spotlight-y", `${y}px`);
    });
  }, []);

  const onPointerLeave = useCallback((event: ReactPointerEvent<T>) => {
    const { currentTarget } = event;

    currentTarget.style.setProperty("--spotlight-x", "50%");
    currentTarget.style.setProperty("--spotlight-y", "50%");
  }, []);

  return { onPointerMove, onPointerLeave };
}
