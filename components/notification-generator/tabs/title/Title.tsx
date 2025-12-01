import { memo } from "react";

import { MinecraftText } from "../../preview/minecraftTextParser";

interface TitleProps {
  title: string;
  subtitle: string;
  showTitle: boolean;
  titleOpacity: number;
}

const Title = memo(({ title, subtitle, showTitle, titleOpacity }: TitleProps) => {
  if (!showTitle) return null;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center transition-opacity duration-500"
      style={{ opacity: titleOpacity }}
    >
      {title && (
        <div
          className="font-minecraft mb-2 text-white"
          style={{
            fontSize: "var(--mc-title-font-size)",
            lineHeight: "calc(var(--mc-title-font-size) + var(--mc-shadow))",
            fontWeight: "bold",
            textShadow:
              "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
          }}
        >
          <MinecraftText text={title} />
        </div>
      )}
      {subtitle && (
        <div
          className="font-minecraft text-gray-300"
          style={{
            fontSize: "var(--mc-subtitle-font-size)",
            lineHeight: "calc(var(--mc-subtitle-font-size) + var(--mc-shadow))",
            textShadow:
              "var(--mc-shadow) 0 0 #000, calc(-1 * var(--mc-shadow)) 0 0 #000, 0 var(--mc-shadow) 0 #000, 0 calc(-1 * var(--mc-shadow)) 0 #000",
          }}
        >
          <MinecraftText text={subtitle} />
        </div>
      )}
    </div>
  );
});

Title.displayName = "Title";

export default Title;
