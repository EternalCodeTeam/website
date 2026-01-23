interface ArticleSchemaProps {
  title: string;
  description?: string;
  author?: string;
  publishedTime: string;
  modifiedTime: string;
  url: string;
  imageUrl?: string;
}

export function ArticleSchema({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  url,
  imageUrl,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description || title,
    author: {
      "@type": "Organization",
      name: author || "EternalCode Team",
      url: "https://eternalcode.pl",
    },
    publisher: {
      "@type": "Organization",
      name: "EternalCode",
      url: "https://eternalcode.pl",
      logo: {
        "@type": "ImageObject",
        url: "https://eternalcode.pl/logo.svg",
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      id="article-schema"
      type="application/ld+json"
    />
  );
}
