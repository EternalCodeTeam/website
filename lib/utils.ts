import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the image URL as-is.
 * With serverURL configured, PayloadCMS returns complete URLs:
 * - For local uploads: http://localhost:3000/media/image.jpg (or production domain)
 * - For external images: https://example.com/image.jpg
 * No transformation is needed.
 */
export function getImageUrl(url: string): string {
  // If the URL is relative (starts with '/'), prepend the server URL
  if (url?.startsWith("/")) {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || "";
    return `${base}${url}`;
  }
  return url || "";
}
