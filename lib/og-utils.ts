/**
 * Generates an Open Graph image URL with the given parameters
 * @param title The title to display on the OG image
 * @param subtitle Optional subtitle to display on the OG image
 * @param image Optional image URL to display on the OG image
 * @returns The URL to the generated OG image
 */
export function generateOgImageUrl({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eternalcode.pl";
  const ogImageUrl = new URL(`${baseUrl}/api/og`);


  ogImageUrl.searchParams.append("title", title);


  if (subtitle) {
    ogImageUrl.searchParams.append("subtitle", subtitle);
  }


  if (image) {
    ogImageUrl.searchParams.append("image", image);
  }

  return ogImageUrl.toString();
}
