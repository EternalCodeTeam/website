"use client";

import type { PointerEvent, ReactNode } from "react";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface CursorGlowProps {
  children: ReactNode;
  className?: string;
}

const GLOW_REACH = 180;

export function CursorGlow({ children, className }: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const updateCards = useCallback((clientX: number, clientY: number, active: boolean) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-glow-card]"));

    for (const card of cards) {
      if (!active) {
        card.style.setProperty("--card-glow-opacity", "0");
        continue;
      }

      const bounds = card.getBoundingClientRect();
      const distanceX = Math.max(bounds.left - clientX, 0, clientX - bounds.right);
      const distanceY = Math.max(bounds.top - clientY, 0, clientY - bounds.bottom);
      const distance = Math.hypot(distanceX, distanceY);
      const opacity = Math.max(0, 1 - distance / GLOW_REACH);

      card.style.setProperty("--card-glow-x", `${clientX - bounds.left}px`);
      card.style.setProperty("--card-glow-y", `${clientY - bounds.top}px`);
      card.style.setProperty("--card-glow-opacity", opacity.toFixed(3));
    }
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      const { clientX, clientY } = event;
      frameRef.current = requestAnimationFrame(() => updateCards(clientX, clientY, true));
    },
    [updateCards]
  );

  const clearGlow = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    updateCards(0, 0, false);
  }, [updateCards]);

  return (
    <div
      className={cn("cursor-glow", className)}
      onPointerLeave={clearGlow}
      onPointerMove={handlePointerMove}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
