import { type FormEvent, useEffect, useRef, useState } from "react";

type HistoryItem =
  | { type: "input"; value: string }
  | { type: "output"; value: string[] }
  | { type: "prompt"; value: string };

const themes = {
  dark: {
    background: "bg-gray-900",
    text: "text-gray-100",
    promptText: "text-green-400",
    commandText: "text-blue-300",
    outputText: "text-gray-200",
    inputText: "text-gray-100",
  },
  light: {
    background: "bg-gray-50",
    text: "text-gray-800",
    promptText: "text-green-600",
    commandText: "text-blue-600",
    outputText: "text-gray-700",
    inputText: "text-gray-900",
  },
};

export default function Terminal({ theme = "dark" }: { theme?: keyof typeof themes }) {
  const currentTheme = themes[theme];
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "prompt", value: "Welcome to EternalCode CLI" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const handleCommand = async (command: string) => {
    setHistory((prev) => [...prev, { type: "input", value: command }]);

    if (command === "help") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          value: [
            "Available commands:",
            "help - show available commands",
            "clear - clear the screen",
          ],
        },
      ]);
    } else if (command === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { type: "output", value: [`Unknown command: ${command}`] }]);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div
      className={`${currentTheme.background} ${currentTheme.text} p-4 rounded-lg font-mono text-sm`}
    >
      <div className="space-y-1">
        {history.map((item) => {
          if (item.type === "output") {
            return item.value.map((line) => (
              <div
                key={`output-${item.type}-${line}`}
                className={`${currentTheme.outputText} select-text whitespace-pre-line`}
              >
                {line}
              </div>
            ));
          }

          if (item.type === "input") {
            return (
              <div
                key={`input-${item.value}`}
                className={`${currentTheme.commandText} select-text whitespace-pre-line`}
              >
                eternalcode@cli:~$ <span className={currentTheme.inputText}>{item.value}</span>
              </div>
            );
          }

          if (item.type === "prompt") {
            return (
              <div key={`prompt-${item.value}`} className={currentTheme.promptText}>
                {item.value}
              </div>
            );
          }

          return null;
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={onSubmit} className="mt-2 flex">
        <span className={`${currentTheme.promptText} mr-2`}>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-1 bg-transparent outline-none ${currentTheme.text}`}
        />
      </form>
    </div>
  );
}
