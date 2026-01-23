import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { popIn, rotateChevron, type MotionCustom } from "@/lib/animations/variants";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  optionClassName?: string;
  menuClassName?: string;
  children?: ReactNode;
  variant?: "default" | "ghost";
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
  buttonClassName = "",
  optionClassName = "",
  menuClassName = "",
  variant = "default",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const handleOptionSelect = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent, optionValue: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOptionSelect(optionValue);
      }
    },
    [handleOptionSelect]
  );

  const baseButtonStyles = useMemo(
    () =>
      variant === "default"
        ? "rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200"
        : "rounded-full px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white",
    [variant]
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex w-full cursor-pointer items-center justify-between gap-2 font-medium text-gray-700 text-sm outline-none transition-all duration-200 ${baseButtonStyles} ${buttonClassName}`}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((v) => !v)}
        type="button"
      >
        <span className="flex items-center gap-2 truncate">
          {!!selected?.icon && selected.icon}
          {selected?.label || placeholder}
        </span>
        <motion.span
          className="ml-2 shrink-0"
          custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
          initial="closed"
          variants={rotateChevron}
          animate={isOpen ? "open" : "closed"}
        >
          <ChevronDown aria-hidden="true" className="h-4 w-4 opacity-50" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className={`absolute left-0 z-50 mt-2 min-w-full origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-2xl ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-950 dark:ring-white/10 ${menuClassName}`}
            custom={{ reduced: prefersReducedMotion, distance: -8, scale: 0.95 } satisfies MotionCustom}
            exit="exit"
            initial="hidden"
            role="listbox"
            style={{ position: "absolute" }}
            variants={popIn}
            animate="visible"
          >
            <div className="scrollbar-none max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <div
                  aria-selected={option.value === value}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    option.value === value
                      ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
                  } ${optionClassName}`}
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  onKeyDown={(e) => handleKeyDown(e, option.value)}
                  role="option"
                  tabIndex={0}
                >
                  <span className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </span>
                  {option.value === value ? <Check className="h-4 w-4 shrink-0" /> : null}
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
