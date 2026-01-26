"use client";

import { ArrowLeftRight, Copy, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CodeWindow } from "@/components/tools/code-window";
import { Button } from "@/components/ui/button";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";
import { bbcodeToMarkdown, markdownToBBCode } from "@/lib/tools/converter";

export default function ConverterPage() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"bb2md" | "md2bb">("bb2md");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const output = mode === "bb2md" ? bbcodeToMarkdown(input) : markdownToBBCode(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.custom((t) => (
      <div
        className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all duration-300 ${
          t.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        } border border-white/10 bg-gradient-to-br bg-white/70 from-white/80 to-white/60 dark:border-gray-800 dark:bg-gray-900/90 dark:from-gray-800/10 dark:to-gray-900/10`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 dark:bg-green-400/15 dark:text-green-400">
          <svg
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Check Icon</title>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">
            Copied to clipboard
          </p>
          <p className="text-gray-600 text-xs dark:text-gray-400">Ready to paste anywhere</p>
        </div>
      </div>
    ));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "bb2md" ? "md2bb" : "bb2md"));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Blobs (matching AnimatedHome) */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl filter" />
        <div className="absolute top-[40%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl filter" />
        <div className="absolute -bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl filter" />
        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-32">
        <MotionSection className="relative flex flex-col gap-12">
          {/* Header */}
          <div className="text-center">
            <SlideIn delay={0.1}>
              <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text font-extrabold text-4xl text-gray-900 text-transparent tracking-tight sm:text-5xl lg:text-6xl dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                BBCode Converter
              </h1>
            </SlideIn>
            <SlideIn delay={0.2}>
              <p className="mx-auto max-w-2xl text-gray-600 text-lg dark:text-gray-400">
                Transform your documentation instantly. Bidirectional conversion for forums,
                READMEs, and text editors.
              </p>
            </SlideIn>
          </div>

          {/* Controls */}
          <SlideIn className="flex justify-center" delay={0.3}>
            <div className="flex items-center gap-4 rounded-full border border-gray-200 bg-white/50 p-1.5 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/50">
              <span
                className={`rounded-full px-4 py-1.5 font-medium text-sm transition-colors ${mode === "bb2md" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
              >
                BBCode → Markdown
              </span>
              <Button
                className="h-8 w-8 rounded-full p-0 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                onClick={toggleMode}
                size="sm"
                variant="ghost"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <span
                className={`rounded-full px-4 py-1.5 font-medium text-sm transition-colors ${mode === "md2bb" ? "bg-purple-600 text-white shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
              >
                Markdown → BBCode
              </span>
            </div>
          </SlideIn>

          {/* Editors Grid */}
          <div className="grid gap-8 lg:h-[600px] lg:grid-cols-2">
            {/* Input */}
            <SlideIn className="h-full" delay={0.4}>
              <CodeWindow
                actions={
                  <Button
                    className="h-6 px-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    onClick={() => setInput("")}
                    size="xs"
                    variant="ghost"
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                }
                className="h-full"
                onChange={setInput}
                placeholder="Paste content here..."
                title={mode === "bb2md" ? "input.bb" : "input.md"}
                value={input}
              />
            </SlideIn>

            {/* Output */}
            <SlideIn className="h-full" delay={0.5}>
              <CodeWindow
                actions={
                  <Button
                    className="h-7 px-3 text-xs"
                    onClick={copyToClipboard} // Highlight the main action
                    size="xs"
                    variant="primary"
                  >
                    <Copy className="mr-1.5 h-3 w-3" />
                    Copy Result
                  </Button>
                }
                className="h-full border-blue-500/20 shadow-blue-500/10 dark:border-blue-400/20"
                readOnly
                title={mode === "bb2md" ? "output.md" : "output.bb"}
                value={output}
              />
            </SlideIn>
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
