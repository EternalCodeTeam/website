export interface DocItem {
  title: string;
  path: string;
  children?: DocItem[];
}

export const docsStructure: DocItem[] = [
  {
    title: "Documentation Editors",
    path: "/docs/documentation-editors",
    children: [
      { title: "Markdown Guide", path: "/docs/documentation-editors/markdown-guide" },
    ],
  },
];
