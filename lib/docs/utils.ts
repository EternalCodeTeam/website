export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function unslugify(slug: string): string {
  return slug.replace(/-/g, " ");
}

const MDX_EXT_OPT = /\.mdx?$/;

export function getSlugFromPath(filePath: string): string[] {
  const relativePath = filePath.split("content/docs/")[1];
  return relativePath.replace(MDX_EXT_OPT, "").split("/");
}
