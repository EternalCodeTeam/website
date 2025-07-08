import { redirect } from "next/navigation";

import { docsStructure } from "@/components/docs/sidebar/sidebar-structure";

function flattenDocs(structure: typeof docsStructure) {
  return structure.flatMap(item =>
    item.children?.length
      ? item.children
      : [{ title: item.title, path: item.path }]
  );
}

export default function DocsPage() {
  const flatDocs = flattenDocs(docsStructure);
  const firstDoc = flatDocs[0];
  if (!firstDoc) {
    return null;
  }
  redirect(firstDoc.path);
}
