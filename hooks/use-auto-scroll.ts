"use client";

import { useEffect, useRef } from "react";

interface AutoScrollOptions {
  speed: number;
  isPaused?: boolean;
  prefersReducedMotion?: boolean;
  maxFrameRate?: number;
}

export function useAutoScroll(
  ref: React.RefObject<HTMLElement | null>,
  { speed, isPaused = false, prefersReducedMotion = false, maxFrameRate = 30 }: AutoScrollOptions
) {
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (isPaused || prefersReducedMotion) {
      scrollPosRef.current = element.scrollLeft;
      return;
    }

    const minFrameMs = 1000 / Math.max(1, maxFrameRate);

    const tick = (time: number) => {
      if (!element) {
        return;
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      if (delta >= minFrameMs) {
        scrollPosRef.current += (speed * delta) / 1000;
        const maxScroll = element.scrollWidth / 3;

        if (scrollPosRef.current >= maxScroll) {
          scrollPosRef.current = 0;
        }

        element.scrollLeft = scrollPosRef.current;
        lastTimeRef.current = time;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = null;
      lastTimeRef.current = null;
    };
  }, [isPaused, maxFrameRate, prefersReducedMotion, ref, speed]);
}
