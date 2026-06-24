import Image from "next/image";
import { memo } from "react";
import netlifyImageLoader from "@/lib/netlify-image-loader";

const BackgroundImage = memo(() => (
  <Image
    alt="Minecraft background"
    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
    fetchPriority="high"
    fill
    loader={netlifyImageLoader}
    priority
    sizes="100vw"
    src="/mc-bg.png"
    style={{ zIndex: 0 }}
  />
));

BackgroundImage.displayName = "BackgroundImage";

export default BackgroundImage;
