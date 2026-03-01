"use client";

import { ArrowUp } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AiInputProps {
  onSend: (question: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export function AiInput({
  onSend,
  disabled,
  placeholder = "Ask anything about the docs...",
}: AiInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }

    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <div className="flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/60">
      <textarea
        aria-label="Ask a question"
        className={cn(
          "min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-gray-900 text-sm placeholder-gray-400 outline-none",
          "dark:text-gray-100 dark:placeholder-gray-500",
          disabled && "cursor-not-allowed opacity-50"
        )}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
          handleInput();
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={textareaRef}
        rows={1}
        value={value}
      />
      <button
        aria-label="Send message"
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white transition-all",
          "bg-blue-600 hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-40"
        )}
        disabled={disabled || !value.trim()}
        onClick={handleSend}
        type="button"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
