import { nanoid } from "nanoid";
import { type CSSProperties, memo } from "react";

import { MinecraftText } from "../../preview/minecraft-text-parser";
import styles from "./ChatMessage.module.css";

type ChatMessageProps = {
  message: string;
};

const ChatMessage = memo(({ message }: ChatMessageProps) => {
  if (!message) {
    return null;
  }

  const linesWithId = message.split("\n").map((line) => ({ id: nanoid(), text: line }));

  const lineStyles: CSSProperties = {
    display: "block",
    minHeight: "var(--mc-line-height)",
    lineHeight: "var(--mc-line-height)",
    fontSize: "var(--mc-font-size)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    paddingLeft: "calc(4px * var(--mc-scale))",
    paddingRight: "calc(4px * var(--mc-scale))",
    textShadow:
      "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
  };

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
        className="absolute top-0 left-0 h-full bg-black/40"
        style={{ zIndex: 0, borderRadius: 0, width: "100%", height: "100%" }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {linesWithId.map(({ id, text }) => (
          <div className="font-minecraft" key={id} style={lineStyles}>
            <MinecraftText text={text} />
          </div>
        ))}
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
