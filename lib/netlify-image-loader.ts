import type { ImageLoaderProps } from "next/image";

export const NETLIFY_IMAGE_WIDTHS = [400, 800, 1200] as const;

export function getNetlifyImageUrl(src: string, width: number, quality = 80) {
  const params = new URLSearchParams({
    url: src,
    w: String(width),
    fm: "avif",
    q: String(quality),
  });

  return `/.netlify/images?${params.toString()}`;
}

export function getNetlifyImageSrcSet(src: string, widths = NETLIFY_IMAGE_WIDTHS) {
  return widths.map((width) => `${getNetlifyImageUrl(src, width)} ${width}w`).join(", ");
}

export default function netlifyImageLoader({ src, width, quality }: ImageLoaderProps) {
  return getNetlifyImageUrl(src, width, quality ?? 80);
}
