"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, BookOpen, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAiChat } from "@/hooks/use-ai-chat";
import { cn } from "@/lib/utils";
import { AiInput } from "./ai-input";
import { AiMessage } from "./ai-message";

interface AiChatPanelProps {
  onClose: () => void;
  initialQuestion?: string | null;
  onInitialQuestionConsumed?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "How do I install EternalCore?",
  "What commands are available?",
  "How do I configure placeholders?",
];

export function AiChatPanel({
  onClose,
  initialQuestion,
  onInitialQuestionConsumed,
}: AiChatPanelProps) {
  const { messages, isLoading, error, sendMessage, clearMessages } = useAiChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const lastMessageId = messages.at(-1)?.id;
  const injectedQuestionRef = useRef<string | null>(null);

  useEffect(() => {
    if (!lastMessageId) {
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastMessageId]);

  useEffect(() => {
    const normalizedQuestion = initialQuestion?.trim();
    if (!normalizedQuestion) {
      return;
    }

    if (normalizedQuestion === injectedQuestionRef.current) {
      return;
    }

    injectedQuestionRef.current = normalizedQuestion;
    sendMessage(normalizedQuestion).catch(() => undefined);
    onInitialQuestionConsumed?.();
  }, [initialQuestion, onInitialQuestionConsumed, sendMessage]);

  const isEmpty = messages.length === 0;

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border shadow-2xl",
        "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900",
        "w-[360px] max-w-[calc(100vw-2rem)]",
        "h-[520px] max-h-[calc(100vh-8rem)]"
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-gray-200 border-b px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">Docs Assistant</p>
            <p className="text-gray-400 text-xs dark:text-gray-500">Powered by EternalCode AI</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              aria-label="Clear conversation"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              onClick={clearMessages}
              title="Clear conversation"
              type="button"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            aria-label="Close AI assistant"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="scrollbar-hide flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <AnimatePresence initial={false}>
          {isEmpty ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col items-center justify-center gap-4 text-center"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, y: 8 }}
              key="empty"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-700 text-sm dark:text-gray-300">
                  Ask about the documentation
                </p>
                <p className="mt-1 text-gray-400 text-xs dark:text-gray-500">
                  Answers are sourced directly from the docs
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-left text-gray-600 text-xs transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:border-blue-800 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                    key={q}
                    onClick={() => sendMessage(q)}
                    type="button"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 6 }}
                key={msg.id}
                transition={{ duration: 0.2 }}
              >
                <AiMessage message={msg} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-red-600 text-xs dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      <div className="shrink-0 border-gray-200 border-t p-3 dark:border-gray-700">
        <AiInput disabled={isLoading} onSend={sendMessage} />
      </div>
    </div>
  );
}
