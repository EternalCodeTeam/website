"use client";

import { useCallback, useRef, useState } from "react";
import type { AiQueryResponse, ChatMessage } from "@/lib/ai/types";

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export interface UseAiChat {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (question: string) => Promise<void>;
  clearMessages: () => void;
}

export function useAiChat(): UseAiChat {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isLoading) {
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setError(null);
      setIsLoading(true);

      const userMsg: ChatMessage = {
        id: generateId(),
        role: "user",
        content: trimmed,
      };

      const assistantId = generateId();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      try {
        const res = await fetch("/api/ai/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const json = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(json.error ?? `Request failed (${res.status})`);
        }

        const data = (await res.json()) as AiQueryResponse;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: data.answer, sources: data.sources, isStreaming: false }
              : m
          )
        );
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }

        const message = (err as Error).message || "Something went wrong. Please try again.";
        setError(message);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: "Sorry, I couldn't process your question. Please try again.",
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}
