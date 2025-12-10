"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { TextFormattingButtons } from "@/components/notification-generator/form/formatting/TextFormattingButtons";

import { insertTag, toggleFormatting } from "./formatting/tagUtils";
import type { FormFieldProps } from "./types";

export const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  rows = 8,
  helpText,
  showEditorButtons = true,
  editorButtonSet = "all",
}: FormFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormatButtonClick = (format: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const text = input.value;
    const selectedText = text.substring(start, end);

    if (selectedText) {
      const { newValue, newCursorPosition } = toggleFormatting(text, start, end, format);
      onChange(name, newValue);

      requestAnimationFrame(() => {
        if (input) {
          input.selectionStart = newCursorPosition;
          input.selectionEnd = newCursorPosition;
          input.focus();
        }
      });
    } else {
      const formatToTag: Record<string, string> = {
        bold: "b",
        italic: "i",
        underline: "u",
        strikethrough: "st",
      };

      const tag = formatToTag[format] || format;
      handleInsertTag(`<${tag}></${tag}>`);
    }
  };

  const handleInsertTag = (tag: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) return;

    const { newValue, newCursorPosition } = insertTag(input.value, start, end, tag);
    onChange(name, newValue);

    requestAnimationFrame(() => {
      if (input) {
        input.selectionStart = newCursorPosition;
        input.selectionEnd = newCursorPosition;
        input.focus();
      }
    });
  };

  const handleColorApply = (tag: string) => {
    handleInsertTag(tag);
  };

  const inputClasses = `w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-blue-500 dark:focus:bg-black/40`;

  const textareaClasses = `w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-blue-500 dark:focus:bg-black/40`;

  return (
    <div className="mb-6">
      <label
        htmlFor={`formfield-${name}`}
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      {showEditorButtons && (
        <div className="mb-2">
          <TextFormattingButtons
            onFormat={handleFormatButtonClick}
            onInsertTag={handleInsertTag}
            editorButtonSet={editorButtonSet}
            onColorApply={handleColorApply}
          />
        </div>
      )}
      {type === "textarea" ? (
        <motion.textarea
          className={textareaClasses}
          rows={rows}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.005 }}
          ref={textareaRef}
          id={`formfield-${name}`}
          aria-describedby={error ? `error-${name}` : helpText ? `help-${name}` : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      ) : (
        <motion.input
          className={inputClasses}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          whileFocus={{ scale: 1.005 }}
          ref={inputRef}
          id={`formfield-${name}`}
          aria-describedby={error ? `error-${name}` : helpText ? `help-${name}` : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      )}
      {error && (
        <motion.p
          id={`error-${name}`}
          className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
      {helpText && !error && (
        <motion.p
          id={`help-${name}`}
          className="mt-1.5 text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {helpText}
        </motion.p>
      )}
    </div>
  );
};
