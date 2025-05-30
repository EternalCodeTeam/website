import React from 'react';
import { MinecraftText } from './minecraftTextParser';

interface ActionBarProps {
  message: string;
}

const ActionBar = React.memo(({ message }: ActionBarProps) => {
  if (!message) return null;
  
  return (
    <div
      className="absolute left-1/2"
      style={{
        bottom: "12%",
        transform: "translateX(-50%)",
        width: "100%",
        textAlign: "center",
        pointerEvents: "none",
        zIndex: 10,
        background: "none",
        border: "none",
        boxShadow: "none",
        padding: 0,
      }}
    >
      <span
        className="font-minecraft"
        style={{
          color: "#fff",
          fontSize: "1.5rem",
          textShadow:
            "2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          fontWeight: "normal",
          lineHeight: 1.2,
          padding: 0,
          margin: 0,
          letterSpacing: 0,
          userSelect: "none",
          background: "none",
          border: "none",
          boxShadow: "none",
        }}
      >
        <MinecraftText text={message} />
      </span>
    </div>
  );
});

ActionBar.displayName = 'ActionBar';

export default ActionBar; 