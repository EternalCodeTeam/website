export interface DocItem {
  title: string;
  path: string;
  children?: DocItem[];
}

export const docsStructure: DocItem[] = [
  {
    title: "Getting Started",
    path: "/docs/getting-started",
    children: [
      { title: "Introduction", path: "/docs/getting-started/introduction" },
      { title: "Installation", path: "/docs/getting-started/installation" },
    ],
  },
  {
    title: "Guides",
    path: "/docs/guides",
    children: [
      { title: "Basic Usage", path: "/docs/guides/basic-usage" },
      { title: "Advanced Features", path: "/docs/guides/advanced-features" },
    ],
  },
  {
    title: "Formatting",
    path: "/docs/formatting",
  },
];
