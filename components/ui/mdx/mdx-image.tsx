"use client";

import Image from "next/image";

interface MdxImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function MdxImage({ src, alt, className }: MdxImageProps) {
  if (!src) {
    return null;
  }

  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm") || src.endsWith(".mov");
  const isGif = src.endsWith(".gif");

  if (isVideo) {
    return (
      <span className="my-6 block w-full overflow-hidden rounded-md shadow-sm">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls
          className={`h-auto w-full object-cover ${className || ""}`}
          title={alt}
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </span>
    );
  }

  // For GIFs, we can use a standard img tag to avoid Next.js Image Optimization warnings
  // and performance overhead, as Next.js doesn't optimize animated GIFs efficiently anyway.
  if (isGif) {
    return (
      <span className="group relative my-6 block w-full overflow-hidden rounded-md bg-gray-100 shadow-sm dark:bg-gray-800">
        {/* biome-ignore lint/performance/noImgElement: Next.js Image Optimization warnings */}
        {/** biome-ignore lint/correctness/useImageSize: Decorative preview */}
        <img
          src={src}
          alt={alt || "GIF"}
          className={`h-auto w-full object-cover ${className || ""}`}
          loading="lazy"
        />
      </span>
    );
  }

  return (
    <span className="my-6 block w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
      <Image
        alt={alt || "Image"}
        className={`h-auto w-full rounded-md shadow-sm ${className || ""}`}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px" // Better sizes
        src={src}
        width={900}
      />
    </span>
  );
}
