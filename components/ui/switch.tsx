"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { softSpring } from "@/lib/animations/variants";

interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export function Switch({
  checked,
  onChange,
  disabled,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SwitchProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!(ariaLabel || ariaLabelledBy)) {
    console.warn(
      "Switch component should have either aria-label or aria-labelledby for accessibility"
    );
  }

  return (
    <button
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      disabled={disabled}
      id={id}
      onClick={() => !disabled && onChange?.(!checked)}
      role="switch"
      type="button"
    >
      <motion.span
        animate={prefersReducedMotion ? {} : { x: checked ? 24 : 4 }}
        className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
        initial={false}
        style={{ x: checked ? 24 : 4 }}
        transition={prefersReducedMotion ? { duration: 0 } : softSpring}
      />
    </button>
  );
}
