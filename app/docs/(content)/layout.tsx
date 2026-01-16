import type { ReactNode } from "react";
import SidebarWrapper from "@/components/docs/sidebar/sidebar-wrapper";
import { getSidebar } from "@/lib/docs/sidebar";

export default async function ContentLayout({ children }: { children: ReactNode }) {
  const sidebarStructure = await getSidebar();

  return (
    <div className="relative z-10 mx-auto min-h-[calc(100vh-7rem)] max-w-[90rem] px-4 py-12 pt-32 md:pt-28">
      <div className="flex flex-col gap-8 lg:flex-row">
        <SidebarWrapper sidebarStructure={sidebarStructure} />
        <main className="flex min-w-0 flex-1 flex-col items-stretch">
          <div className="w-full" style={{ minHeight: "60vh" }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
