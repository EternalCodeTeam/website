import { Metadata } from "next";

import { generateOgImageUrl } from "@/lib/og-utils";

interface OgImageProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export function generateOgImageMetadata({ title, subtitle, image }: OgImageProps): Metadata {
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

export default function OgImage({
  title: _title,
  subtitle: _subtitle,
  image: _image,
}: OgImageProps) {
  return null;
}
