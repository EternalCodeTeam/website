"use client";

import { motion } from "framer-motion";
import { type ChangeEvent, useCallback, useEffect, useState } from "react";

type SliderFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  min: number;
  max: number;
  step: number;
  error?: string;
};

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
    value ? Number.parseFloat(value) : (min + max) / 2
  );

  useEffect(() => {
    if (value) {
      const parsedValue = Number.parseFloat(value);
      const boundedValue = Math.max(min, Math.min(max, parsedValue));
      setSliderValue(boundedValue);
    }
  }, [value, min, max]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = Number.parseFloat(e.target.value);
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
          className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300"
          htmlFor={name}
        >
          {label}
        </label>
        <span className="font-medium text-gray-700 text-sm dark:text-gray-300">
          {sliderValue.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center">
        <input
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500 dark:bg-gray-700"
          id={name}
          max={max}
          min={min}
          onChange={handleChange}
          step={step}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${gradientPercentage}%, #e5e7eb ${gradientPercentage}%, #e5e7eb 100%)`,
          }}
          type="range"
          value={sliderValue}
        />
      </div>
      {!!error && (
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-red-500 text-xs dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
