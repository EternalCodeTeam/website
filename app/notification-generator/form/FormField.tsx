"use client";

import { motion } from "framer-motion";
import { FieldType } from "../types";

interface FormFieldProps {
  label: string;
  name: FieldType;
  value: string;
  onChange: (name: FieldType, value: string) => void;
  placeholder?: string;
  error?: string;
  type?: "text" | "textarea";
  rows?: number;
  helpText?: string;
}

export const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  rows = 4,
  helpText,
}: FormFieldProps) => {
  const inputClasses = `w-full rounded-md border px-3 py-2 ${
    error ? "border-red-500" : "border-gray-300 dark:border-gray-600"
  } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-700 dark:text-white`;

  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.label 
        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {label}
      </motion.label>
      {type === "textarea" ? (
        <motion.textarea
          className={inputClasses}
          rows={rows}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.01 }}
        />
      ) : (
        <motion.input
          type="text"
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.01 }}
        />
      )}
      <div className="h-5 mt-1">
        {error ? (
          <motion.p 
            className="text-xs text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {error}
          </motion.p>
        ) : helpText ? (
          <motion.p 
            className="text-xs text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
          >
            {helpText}
          </motion.p>
        ) : null}
      </div>
    </motion.div>
  );
}; 