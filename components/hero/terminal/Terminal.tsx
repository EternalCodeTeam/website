"use client";

import { useTheme } from "next-themes";
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

const themes = {
  dark: {
    container: "bg-gray-900/50 border-gray-800",
    titleBar: "bg-gray-900/50 border-gray-800",
    titleText: "text-gray-400",
    terminalText: "text-gray-100",
    outputText: "text-gray-400",
    inputText: "text-gray-100",
    promptText: "text-blue-400",
    commandText: "text-gray-300",
  },
  light: {
    container: "bg-white/80 border-gray-200",
    titleBar: "bg-gray-50/50 border-gray-200",
    titleText: "text-gray-500",
    terminalText: "text-gray-900",
    outputText: "text-gray-600",
    inputText: "text-gray-900",
    promptText: "text-blue-600",
    commandText: "text-gray-700",
  },
};

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [input, setInput] = useState("");
  const { resolvedTheme } = useTheme();
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
      } else if (responses[command]) {
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

  const currentTheme = themes[resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <div
      className={`mx-auto mt-8 w-full rounded-xl border shadow-2xl backdrop-blur-xl ${currentTheme.container}`}
    >
      {/* Title bar */}
      <div className={`flex h-11 items-center rounded-t-xl border-b px-4 ${currentTheme.titleBar}`}>
        <div className="flex space-x-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
        </div>
        <div
          className={`flex-1 select-none text-center font-mono text-xs font-medium tracking-wide ${currentTheme.titleText} opacity-70`}
        >
          eternalcode — -zsh — 80x24
        </div>
      </div>
      {/* Terminal body */}
      <div
        ref={scrollRef}
        className={`h-96 overflow-y-auto bg-transparent px-6 py-4 font-mono text-sm leading-relaxed ${currentTheme.terminalText}`}
        style={{ scrollbarWidth: "thin" }}
      >
        {history.map((item, index) => {
          const key = `${item.type}-${index}`;

          if (item.type === "output") {
            return item.value.map((line, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: Order is static
                key={`${key}-${i}`}
                className={`${currentTheme.outputText} select-text whitespace-pre-wrap break-words py-0.5`}
              >
                {line}
              </div>
            ));
          }
          if (item.type === "input") {
            return (
              <div
                key={key}
                className={`${currentTheme.commandText} select-text whitespace-pre-wrap break-words py-0.5`}
              >
                <span className={currentTheme.promptText}>eternalcode@cli:~$</span>{" "}
                <span className={currentTheme.inputText}>{item.value}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Active prompt */}
        <div className="mt-1 flex items-center">
          <span className={`${currentTheme.promptText} shrink-0 mr-2`}>eternalcode@cli:~$</span>
          <input
            ref={inputRef}
            className={`flex-1 border-none bg-transparent p-0 font-mono text-sm outline-hidden ${currentTheme.inputText} placeholder-transparent`}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
