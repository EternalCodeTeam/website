import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";

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
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent, optionValue: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOptionSelect(optionValue);
    }
  };

  const baseButtonStyles =
    variant === "default"
      ? "rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-200"
      : "rounded-full px-4 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white";

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
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="ml-2 shrink-0"
          transition={{ duration: 0.2 }}
        >
          <ChevronDown aria-hidden="true" className="h-4 w-4 opacity-50" />
        </motion.span>
      </button>
      <AnimatePresence>
        {!!isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`absolute left-0 z-50 mt-2 min-w-full origin-top-right overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-2xl ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-950 dark:ring-white/10 ${menuClassName}`}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            style={{ position: "absolute" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="scrollbar-none max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <div
                  aria-selected={option.value === value}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 ${option.value === value
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
                  {!!(option.value === value) && <Check className="h-4 w-4 shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
