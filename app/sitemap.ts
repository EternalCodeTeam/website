import type { MetadataRoute } from "next";
import { getAllDocs } from "@/lib/docs/loader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://eternalcode.pl";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contribute`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/builds`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/eternalcore`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/eternalcombat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/multification`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic documentation pages
  const docs = await getAllDocs();
  const docPages: MetadataRoute.Sitemap = docs
    .filter((doc) => !doc.param.includes("_index"))
    .map((doc) => ({
      url: `${baseUrl}/docs/${doc.param}`,
      lastModified: new Date(doc.lastModified),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...staticPages, ...docPages];
}
