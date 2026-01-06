"use client";

import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

import responses from "./responses";

type HistoryItem =
  | { type: "output"; value: string[] }
  | { type: "input"; value: string }
  | { type: "prompt"; value: string };

const initialHistory: HistoryItem[] = [
  {
    type: "output",
    value: ["Welcome to EternalCode CLI!", "Type 'help' to see available commands."],
  },
];

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const fullCommand = input.trim();
      const commandParts = fullCommand.split(" ");
      const command = commandParts[0].toLowerCase();
      let output: string[] = [];

      if (command === "clear") {
        setHistory(initialHistory);
        setInput("");
        return;
      }
      if (responses[command]) {
        output = responses[command];
      } else {
        output = [`eternalcode: command not found: ${input}`];
      }

      setHistory((prev) => [
        ...prev,
        { type: "input", value: fullCommand } as HistoryItem,
        { type: "output", value: output } as HistoryItem,
      ]);
      setInput("");
    }
  };

  return (
    <div className="mx-auto mt-8 w-full rounded-xl border border-gray-200 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/50">
      {/* Title bar */}
      <div className="flex h-11 items-center rounded-t-xl border-gray-200 border-b bg-gray-50/50 px-4 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex space-x-2">
          <span className="h-3 w-3 rounded-full border border-[#E0443E]/50 bg-[#FF5F56] shadow-sm" />
          <span className="h-3 w-3 rounded-full border border-[#DEA123]/50 bg-[#FFBD2E] shadow-sm" />
          <span className="h-3 w-3 rounded-full border border-[#1AAB29]/50 bg-[#27C93F] shadow-sm" />
        </div>
        <div className="flex-1 select-none text-center font-medium font-mono text-gray-500 text-xs tracking-wide opacity-70 dark:text-gray-400">
          eternalcode — -zsh — 80x24
        </div>
      </div>
      {/* Terminal body */}
      <div
        className="h-96 overflow-y-auto bg-transparent px-6 py-4 font-mono text-gray-900 text-sm leading-relaxed dark:text-gray-100"
        ref={scrollRef}
        style={{ scrollbarWidth: "thin" }}
      >
        {history.map((item, index) => {
          const key = `${item.type}-${index}`;

          if (item.type === "output") {
            return item.value.map((line, i) => (
              <div
                className="select-text whitespace-pre-wrap break-words py-0.5 text-gray-600 dark:text-gray-400"
                // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
                key={`${key}-${i}`}
              >
                {line}
              </div>
            ));
          }
          if (item.type === "input") {
            return (
              <div
                className="select-text whitespace-pre-wrap break-words py-0.5 text-gray-700 dark:text-gray-300"
                key={key}
              >
                <span className="mr-2 shrink-0 text-blue-600 dark:text-blue-400">
                  eternalcode@cli:~$
                </span>{" "}
                <span className="text-gray-900 dark:text-gray-100">{item.value}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Active prompt */}
        <div className="mt-1 flex items-center">
          <span className="mr-2 shrink-0 text-blue-600 dark:text-blue-400">eternalcode@cli:~$</span>
          <input
            aria-label="Terminal input"
            autoComplete="off"
            className="flex-1 border-none bg-transparent p-0 font-mono text-gray-900 text-sm placeholder-transparent outline-hidden dark:text-gray-100"
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            spellCheck={false}
            value={input}
          />
        </div>
      </div>
    </div>
  );
}
