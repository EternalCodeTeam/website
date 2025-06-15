import React from "react";

import { MinecraftText } from "./minecraftTextParser";

interface TitleProps {
  title: string;
  subtitle: string;
  showTitle: boolean;
  titleOpacity: number;
}

const Title = React.memo(({ title, subtitle, showTitle, titleOpacity }: TitleProps) => {
  if (!showTitle) return null;

  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center transition-opacity duration-500"
      style={{ opacity: titleOpacity }}
    >
      {title && (
        <div className="font-minecraft mb-2 text-3xl font-bold text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
          <MinecraftText text={title} />
        </div>
      )}
      {subtitle && (
        <div className="font-minecraft text-xl text-gray-300 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
          <MinecraftText text={subtitle} />
        </div>
      )}
    </div>
  );
});

Title.displayName = "Title";

export default Title;
