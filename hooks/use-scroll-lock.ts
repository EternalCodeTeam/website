"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Freezes background scrolling while a mobile menu, drawer or modal is open.
 *
 * Lenis owns the page scroll on pointer devices, so it has to be stopped as
 * well - the body class covers the native-scroll fallback (touch devices and
 * `prefers-reduced-motion`).
 */
export function useScrollLock(locked: boolean): void {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) {
      return;
    }

    document.body.classList.add("ec-scroll-lock");
    lenis?.stop();

    return () => {
      document.body.classList.remove("ec-scroll-lock");
      lenis?.start();
    };
  }, [lenis, locked]);
}
