// biome-ignore lint/performance/noNamespaceImport: Needed for icon validation
import * as icons from "lucide-react";
import { z } from "zod";

export const FrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  icon: z
    .string()
    .refine((val) => val in icons, {
      message: "Icon must be a valid Lucide icon name",
    })
    .optional(),
  sidebar_position: z.number().optional(),

  image: z.string().optional(),
  author: z.string().optional(),

  draft: z.boolean().default(false),
  toc: z.boolean().default(true),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export interface Doc {
  slug: string[];
  param: string;
  frontmatter: Frontmatter;
  content: string;
  lastModified: number;
}
