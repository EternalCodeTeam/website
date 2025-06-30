import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const base = process.env.NEXT_PUBLIC_ETERNALCODE_STRAPI_URL || process.env.ETERNALCODE_STRAPI_URL || '';
  
  if (!base) {
    console.warn('Strapi URL environment variable not found. Image URLs may not work correctly.');
    return url; // Return the original URL as fallback
  }
  
  return `${base}${url}`;
}
