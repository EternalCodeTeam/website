"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ChatMessage } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

interface AiMessageProps {
  message: ChatMessage;
}

const STREAMING_DOTS = [0, 1, 2] as const;

export function AiMessage({ message }: AiMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-blue-600 text-white"
            : "rounded-bl-sm border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        )}
      >
        {message.isStreaming ? (
          <span className="flex items-center gap-2 text-gray-400 text-xs dark:text-gray-500">
            <span className="flex gap-1">
              {STREAMING_DOTS.map((i) => (
                <span
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 dark:bg-blue-500"
                  key={i}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            Searching documentation...
          </span>
        ) : (
          <>
            <p className="whitespace-pre-wrap">{message.content}</p>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 border-gray-100 border-t pt-2 dark:border-gray-700">
                <span className="w-full text-gray-400 text-xs dark:text-gray-500">Sources</span>
                {message.sources.map((source) => (
                  <Link
                    className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-700 text-xs transition-colors hover:bg-blue-100 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                    href={`${source.path}${source.anchor ? `#${source.anchor}` : ""}`}
                    key={`${source.path}#${source.anchor}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {source.title}
                    <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
