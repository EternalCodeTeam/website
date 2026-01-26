"use client";

import { type ReactNode, useRef } from "react";

interface CodeWindowProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  actions?: ReactNode;
  placeholder?: string;
  className?: string;
}

export function CodeWindow({
  title,
  value,
  onChange,
  readOnly,
  actions,
  placeholder,
  className,
}: CodeWindowProps) {
  const scrollRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom if it's an output window and value changes?
  // Actually no, for a converter, we usually want to see the top unless we're typing.
  // Let's keep it simple for now.

  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80 ${className}`}
    >
      {/* Title bar */}
      <div className="flex h-11 shrink-0 items-center justify-between rounded-t-xl border-gray-200 border-b bg-gray-50/50 px-4 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <span className="h-3 w-3 rounded-full border border-[#E0443E]/50 bg-[#FF5F56] shadow-sm" />
            <span className="h-3 w-3 rounded-full border border-[#DEA123]/50 bg-[#FFBD2E] shadow-sm" />
            <span className="h-3 w-3 rounded-full border border-[#1AAB29]/50 bg-[#27C93F] shadow-sm" />
          </div>
          <div className="select-none font-medium font-mono text-gray-500 text-xs tracking-wide opacity-70 dark:text-gray-400">
            {title}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Editor Area */}
      <div className="relative flex-1 bg-transparent">
        <textarea
          className="h-full w-full resize-none border-none bg-transparent p-4 font-mono text-gray-900 text-sm leading-relaxed outline-hidden placeholder:text-gray-400/50 dark:text-gray-100 dark:placeholder:text-gray-600"
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={scrollRef}
          spellCheck={false}
          style={{ scrollbarWidth: "thin" }}
          value={value}
        />
      </div>
    </div>
  );
}
