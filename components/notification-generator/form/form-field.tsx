"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import { TextFormattingButtons } from "@/components/notification-generator/form/formatting/text-formatting-buttons";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { inputField, popIn, type MotionCustom } from "@/lib/animations/variants";

import { insertTag, toggleFormatting } from "./formatting/tag-utils";
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
  const prefersReducedMotion = useReducedMotion();

  const handleFormatButtonClick = (format: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) {
      return;
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) {
      return;
    }

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
        obfuscated: "obf",
      };

      const tag = formatToTag[format] || format;
      handleInsertTag(`<${tag}></${tag}>`);
    }
  };

  const handleInsertTag = (tag: string) => {
    const input = type === "textarea" ? textareaRef.current : inputRef.current;
    if (!input) {
      return;
    }

    const start = input.selectionStart;
    const end = input.selectionEnd;
    if (start === null || end === null) {
      return;
    }

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

  const inputClasses =
    "w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-blue-500 dark:focus:bg-black/40";

  const textareaClasses =
    "w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-blue-500 dark:focus:bg-black/40";

  /* Logic for aria-describedby to avoid nested ternary */
  let ariaDescribedBy: string | undefined;
  if (error) {
    ariaDescribedBy = `error-${name}`;
  } else if (helpText) {
    ariaDescribedBy = `help-${name}`;
  }

  return (
    <div className="mb-6">
      <label
        className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
        htmlFor={`formfield-${name}`}
      >
        {label}
      </label>
      {!!showEditorButtons && (
        <div className="mb-2">
          <TextFormattingButtons
            editorButtonSet={editorButtonSet}
            onColorApply={handleColorApply}
            onFormat={handleFormatButtonClick}
            onInsertTag={handleInsertTag}
          />
        </div>
      )}
      {type === "textarea" ? (
        <motion.textarea
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          className={textareaClasses}
          custom={{ reduced: prefersReducedMotion, distance: 3, delay: 0.05 } satisfies MotionCustom}
          id={`formfield-${name}`}
          initial="hidden"
          variants={inputField}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          ref={textareaRef}
          rows={rows}
          animate="visible"
          value={value}
          whileFocus="focused"
        />
      ) : (
        <motion.input
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          className={inputClasses}
          custom={{ reduced: prefersReducedMotion, distance: 3, delay: 0.05 } satisfies MotionCustom}
          id={`formfield-${name}`}
          initial="hidden"
          variants={inputField}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          ref={inputRef}
          type={type}
          value={value}
          animate="visible"
          whileFocus="focused"
        />
      )}
      {!!error && (
        <motion.p
          className="mt-1.5 font-medium text-red-500 text-xs dark:text-red-400"
          id={`error-${name}`}
          custom={{ reduced: prefersReducedMotion, distance: -5 } satisfies MotionCustom}
          initial="hidden"
          variants={popIn}
          animate="visible"
        >
          {error}
        </motion.p>
      )}
      {!!helpText && !error && (
        <motion.p
          className="mt-1.5 text-gray-500 text-xs dark:text-gray-400"
          id={`help-${name}`}
          custom={{ reduced: prefersReducedMotion, distance: -5 } satisfies MotionCustom}
          initial="hidden"
          variants={popIn}
          animate="visible"
        >
          {helpText}
        </motion.p>
      )}
    </div>
  );
};
