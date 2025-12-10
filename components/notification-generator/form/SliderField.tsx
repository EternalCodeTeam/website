"use client";

import { motion } from "framer-motion";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";

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
    (e: ChangeEvent<HTMLInputElement>) => {
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
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {sliderValue.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center">
        <input
          id={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500 dark:bg-gray-700"
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
