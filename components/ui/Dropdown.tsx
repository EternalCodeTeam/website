import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

import ArrowDown from "../icons/arrow-down";

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
  children?: ReactNode;
  "aria-labelledby"?: string;
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
  children,
  "aria-labelledby": ariaLabelledBy,
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOptionSelect(optionValue);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`flex w-full items-center justify-between rounded border border-gray-200 bg-white px-2 py-1 text-sm transition-colors duration-150 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 ${buttonClassName}`}
        onClick={() => setIsOpen((v) => !v)}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={ariaLabelledBy}
        style={{ outline: "none", boxShadow: "none" }}
      >
        <span className="flex items-center gap-2 truncate">
          {selected?.icon}
          {selected?.label || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-30 mt-1 w-full rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10"
            style={{
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              maxHeight: "200px",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            role="listbox"
          >
            <style>
              {`
      .absolute::-webkit-scrollbar {
        display: none;
      }
    `}
            </style>
            {options.map((option) => (
              <div
                key={option.value}
                className={`block w-full cursor-pointer rounded-md px-4 py-2 text-left text-gray-900 outline-none transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-400 ${optionClassName}`}
                style={{ outline: "none", boxShadow: "none" }}
                onClick={() => handleOptionSelect(option.value)}
                onKeyDown={(e) => handleKeyDown(e, option.value)}
                role="option"
                aria-selected={option.value === value}
                tabIndex={0}
              >
                <span className="flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </span>
              </div>
            ))}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
