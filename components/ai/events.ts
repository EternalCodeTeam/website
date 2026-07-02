export const OPEN_AI_CHAT_EVENT = "docs:open-ai-chat";

export interface OpenAiChatEventDetail {
  question?: string;
  source?: "search-modal" | "search-empty-state" | "search-footer";
}
