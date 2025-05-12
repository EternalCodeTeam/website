import React from "react";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/header/Navbar";
import DocSidebar from "@/components/docs/DocSidebar";
import DocSearch from "@/components/docs/DocSearch";
import DocCopyEnhancer from "@/components/docs/DocCopyEnhancer";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "Documentation | EternalCode.pl",
  description: "Documentation for EternalCode.pl projects and services",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eff1f5] dark:bg-[#0d1117]`}
    >
      <Navbar />
      <div className="mx-auto max-w-screen-xl min-h-[calc(100vh-7rem)] px-4 py-12 pt-32">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-64">
            <div className="sticky top-32 z-20 flex flex-col gap-4">
              <DocSearch />
              <DocSidebar />
            </div>
          </aside>
          <main className="flex min-w-0 flex-1 flex-col items-stretch">
            <div className="w-full">
              <DocCopyEnhancer />
              {children}
            </div>
            <div
              id="docs-navigation-buttons"
              className="mt-12 flex w-full justify-between"
            >
              {/* Przyciski Next/Previous będą renderowane w page.tsx */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
