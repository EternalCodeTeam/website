import type { FC } from "react";

import DocSidebar from "./doc-sidebar";
import DocsSearch from "./docs-search";

const SidebarWrapper: FC = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-32 flex h-[calc(100vh-8rem)] flex-col gap-4">
          <DocsSearch />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white/80 shadow-xs backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/50">
            <DocSidebar />
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className="flex flex-col gap-4 lg:hidden">
        <DocsSearch />
        <DocSidebar />
      </div>
    </>
  );
};

export default SidebarWrapper;
