
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
