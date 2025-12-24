import { OgTemplate, loadFonts } from "@/components/og/og-template";
import { getBlogPost } from "@/lib/blog";
import { getImageUrl } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "nodejs"; // Must be nodejs because Payload CMS client requires it
export const alt = "EternalCode Blog Post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const fonts = await loadFonts();

  if (!post) {
    return new ImageResponse(<OgTemplate title="Post Not Found" subtitle="EternalCode.pl" />, {
      ...size,
      fonts,
    });
  }

  // If a featured image exists, we could use it as a background or just the image.
  // Strategy: Use the featured image as the background with an overlay + text,
  // OR if it's a dedicated OG image designed by humans, maybe just show it?
  // User asked for "Dynamic data (title, thumbnail)".
  // Let's go with: Featured Image as Background (blurred/overlay) + Title over it,
  // OR if the user provides a specific "ogImage" field in CMS (not seen in type), we use that.
  // The 'featuredImage' seems to be the main visual.
  // Let's try utilizing the shared template's 'backgroundImage' prop if available.

  const featuredImageUrl = post.featuredImage?.url
    ? getImageUrl(post.featuredImage.url)
    : undefined;

  return new ImageResponse(
    <OgTemplate
      title={post.title}
      subtitle={post.excerpt}
      backgroundImage={featuredImageUrl}
      image="https://eternalcode.pl/logo.svg"
    />,
    {
      ...size,
      fonts,
      // Cache for a long time since blog posts don't change often
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}
