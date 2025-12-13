"use client";

import { motion } from "framer-motion";
import { softSpring } from "@/lib/animations/variants";

type SwitchProps = {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
};

export function Switch({ checked, onChange, disabled, id }: SwitchProps) {
  return (
    <button
      aria-checked={checked}
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
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform`}
        layout
        transition={softSpring}
      />
    </button>
  );
}
