import { Metadata } from "next";
import { generateOgImageUrl } from "@/lib/og-utils";

interface OgImageProps {
  title: string;
  subtitle?: string;
  image?: string;
}

/**
 * Generates metadata with a custom OG image for a specific page
 * @param props The props for the OG image
 * @returns Metadata object with custom OG image
 */
export function generateOgImageMetadata({
  title,
  subtitle,
  image,
}: OgImageProps): Metadata {
  const ogImageUrl = generateOgImageUrl({
    title,
    subtitle,
    image,
  });

  return {
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}

/**
 * Component to generate a custom OG image for a specific page
 * This component doesn't render anything, it's just a helper to generate metadata
 */
export default function OgImage({ title, subtitle, image }: OgImageProps) {

  return null;
}
