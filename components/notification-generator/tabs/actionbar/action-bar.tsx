import { memo } from "react";
import { MinecraftText } from "../../preview/minecraft-text-parser";

interface ActionBarProps {
  message: string;
}

const ActionBar = memo(({ message }: ActionBarProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        pointerEvents: "none",
        zIndex: 10,
        width: "100%",
        textAlign: "center",
      }}
    >
      <span
        className="font-minecraft"
        style={{
          fontSize: "calc(14px * var(--mc-scale))",
          lineHeight: "calc(16px * var(--mc-scale))",
          fontWeight: "normal",
          letterSpacing: 0,
          userSelect: "none",
          whiteSpace: "pre-wrap !important",
          textShadow:
            "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
        }}
      >
        <MinecraftText text={message} />
      </span>
    </div>
  );
});

ActionBar.displayName = "ActionBar";

export default ActionBar;
