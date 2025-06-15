"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

import { Button } from "@/components/ui/button";

interface SliderFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  min: number;
  max: number;
  step: number;
  error?: string;
}

export const SliderField = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  error,
}: SliderFieldProps) => {
  const [sliderValue, setSliderValue] = useState<number>(
    value ? parseFloat(value) : (min + max) / 2
  );

  useEffect(() => {
    if (value) {
      const parsedValue = parseFloat(value);

      const boundedValue = Math.max(min, Math.min(max, parsedValue));
      setSliderValue(boundedValue);
    }
  }, [value, min, max]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      setSliderValue(newValue);
      onChange(name, newValue.toFixed(2));
    },
    [name, onChange]
  );

  const gradientPercentage = ((sliderValue - min) / (max - min)) * 100;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {sliderValue.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          className="h-2 w-full appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${gradientPercentage}%, #e5e7eb ${gradientPercentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
      {error && (
        <motion.p
          className="mt-1 text-xs text-red-500 dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const CustomDropdown = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="mb-4" ref={dropdownRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full justify-between"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          rightIcon={
            <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          }
        >
          {selectedOption?.label || "Select an option"}
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute z-30 mt-1 w-full rounded-lg bg-white py-2 shadow-xl ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/10"
              role="listbox"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className="block w-full cursor-pointer rounded-md px-4 py-2 text-left text-gray-900 outline-none transition-colors duration-150 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-blue-400 dark:focus:bg-gray-800 dark:focus:text-blue-400"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
