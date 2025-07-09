import { FC } from "react";

import DocSidebar from "./DocSidebar";
import DocsSearch from "./DocsSearch";

const SidebarWrapper: FC = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-full flex-shrink-0 lg:block lg:w-64">
        <div className="sticky top-32 z-20 flex flex-col gap-4">
          <DocsSearch />
          <DocSidebar />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className="lg:hidden flex flex-col gap-4">
        <DocsSearch />
        <DocSidebar />
      </div>
    </>
  );
};

export default SidebarWrapper;
