import React from "react";

import styles from "./ChatMessage.module.css";
import { MinecraftText } from "./minecraftTextParser";

interface ChatMessageProps {
  message: string;
}

const ChatMessage = React.memo(({ message }: ChatMessageProps) => {
  if (!message) return null;

  return (
    <div
      className={`relative flex items-center ${styles.chatContainer}`}
      style={{
        width: "100%",
        maxWidth: "50vw",
        minWidth: 200,
        overflowX: "unset",
        overflowY: "auto",
        whiteSpace: "pre-line",
        height: "auto",
      }}
    >
      <div
        className="absolute left-0 top-0 h-full bg-black/40"
        style={{
          zIndex: 0,
          borderRadius: 0,
          width: "100%",
          height: "100%",
        }}
      />
      {message.includes("\n") ? (
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {message.split("\n").map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="font-minecraft px-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
              style={{
                display: "block",
                minHeight: 32,
                lineHeight: "32px",
                whiteSpace: "pre-wrap !important",
                wordBreak: "break-word",
              }}
            >
              <MinecraftText text={line} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="font-minecraft px-4 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: 32,
            lineHeight: "32px",
            whiteSpace: "pre-wrap !important",
            wordBreak: "break-word",
          }}
        >
          <MinecraftText text={message} />
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
