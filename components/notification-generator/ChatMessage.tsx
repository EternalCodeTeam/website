import React from 'react';
import { parseMinecraftText } from './minecraftTextParser';

interface ChatMessageProps {
  message: string;
}

const ChatMessage = React.memo(({ message }: ChatMessageProps) => {
  if (!message) return null;
  
  return (
    <div
      className="relative flex h-8 items-center"
      style={{ width: "50vw", minWidth: 320 }}
    >
      <div
        className="absolute left-0 top-0 h-8 w-full bg-black/40"
        style={{ zIndex: 0, borderRadius: 0 }}
      />
      {message.includes("\n") ? (
        message.split("\n").map((line, index) => (
          <div
            key={index}
            className="font-minecraft relative px-4 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
            style={{ zIndex: 1, height: "32px", lineHeight: "32px" }}
          >
            {parseMinecraftText(line)}
          </div>
        ))
      ) : (
        <div
          className="font-minecraft relative px-4 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
          style={{ zIndex: 1, height: "32px", lineHeight: "32px" }}
        >
          {parseMinecraftText(message)}
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage; 