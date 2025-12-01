import Image from "next/image";
import { memo } from "react";

const BackgroundImage = memo(() => {
  return (
    <Image
      src="/mc-bg.png"
      alt="Minecraft background"
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      style={{ zIndex: 0 }}
      fill
      priority
    />
  );
});

BackgroundImage.displayName = "BackgroundImage";

export default BackgroundImage;
