import React from "react";

import { MinecraftText } from "../../preview/minecraftTextParser";

import styles from "./ChatMessage.module.css";

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
        maxWidth: "100%",
        overflowX: "hidden",
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
              className="font-minecraft"
              style={{
                display: "block",
                minHeight: "var(--mc-line-height)",
                lineHeight: "var(--mc-line-height)",
                fontSize: "var(--mc-font-size)",
                whiteSpace: "pre-wrap !important",
                wordBreak: "break-word",
                paddingLeft: "calc(4px * var(--mc-scale))",
                paddingRight: "calc(4px * var(--mc-scale))",
                textShadow:
                  "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
              }}
            >
              <MinecraftText text={line} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="font-minecraft"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "var(--mc-line-height)",
            lineHeight: "var(--mc-line-height)",
            fontSize: "var(--mc-font-size)",
            whiteSpace: "pre-wrap !important",
            wordBreak: "break-word",
            paddingLeft: "calc(4px * var(--mc-scale))",
            paddingRight: "calc(4px * var(--mc-scale))",
            textShadow:
              "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
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
