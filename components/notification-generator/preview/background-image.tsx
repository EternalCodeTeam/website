import Image from "next/image";
import { memo } from "react";

const BackgroundImage = memo(() => (
  <Image
    alt="Minecraft background"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
    fill
    priority
    src="/mc-bg.png"
    style={{ zIndex: 0 }}
  />
));

BackgroundImage.displayName = "BackgroundImage";

export default BackgroundImage;
