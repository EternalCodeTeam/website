"use client";

import { useTheme } from "next-themes";
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

import responses from "./responses";

const macButtons = [
  { color: "bg-red-500", label: "Close" },
  { color: "bg-yellow-400", label: "Minimize" },
  { color: "bg-green-500", label: "Zoom" },
];

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
    container: "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700",
    titleBar: "bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-700",
    titleText: "text-gray-400",
    terminalText: "text-gray-100",
    outputText: "text-gray-400",
    inputText: "text-gray-100",
    promptText: "text-green-400",
    commandText: "text-blue-400",
  },
  light: {
    container: "bg-gradient-to-br from-gray-100 to-white border border-gray-300",
    titleBar: "bg-gradient-to-r from-gray-200 to-gray-100 border-b border-gray-300",
    titleText: "text-gray-700",
    terminalText: "text-gray-800",
    outputText: "text-gray-600",
    inputText: "text-gray-800",
    promptText: "text-green-600",
    commandText: "text-blue-600",
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
      className={`mx-auto mt-8 w-full max-w-2xl rounded-2xl shadow-2xl ${currentTheme.container}`}
    >
      {/* Title bar */}
      <div className={`flex h-10 items-center rounded-t-2xl px-4 ${currentTheme.titleBar}`}>
        <div className="flex space-x-2">
          {macButtons.map((btn) => (
            <span
              key={btn.label}
              className={`h-3 w-3 rounded-full ${btn.color} border border-black/20 shadow-inner`}
              title={btn.label}
            />
          ))}
        </div>
        <div
          className={`flex-1 select-none text-center font-mono text-xs tracking-wide ${currentTheme.titleText}`}
        >
          EternalCode Terminal
        </div>
      </div>
      {/* Terminal body */}
      <div
        ref={scrollRef}
        className={`h-96 overflow-y-auto bg-transparent px-6 py-4 font-mono text-sm ${currentTheme.terminalText}`}
        style={{ scrollbarWidth: "thin" }}
      >
        {history.map((item) => {
          const key = `${item.type}-${item.type === "output" ? item.value.join("-") : item.value}-${Date.now() + Math.random()}`;

          if (item.type === "output") {
            return item.value.map((line) => (
              <div
                key={`${key}-${line}`}
                className={`${currentTheme.outputText} select-text whitespace-pre-line`}
              >
                {line}
              </div>
            ));
          }
          if (item.type === "input") {
            return (
              <div
                key={key}
                className={`${currentTheme.commandText} select-text whitespace-pre-line`}
              >
                eternalcode@cli:~$ <span className={currentTheme.inputText}>{item.value}</span>
              </div>
            );
          }
          if (item.type === "prompt") {
            return (
              <div key={key} className={currentTheme.promptText}>
                {item.value}
              </div>
            );
          }
          return null;
        })}

        {/* Active prompt */}
        <div className="mt-1 flex items-center">
          <span className={currentTheme.promptText}>eternalcode@cli:~$</span>
          <input
            ref={inputRef}
            className={`ml-2 flex-1 border-none bg-transparent font-mono text-sm outline-none ${currentTheme.inputText}`}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
