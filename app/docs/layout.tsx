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
      <div className="container mx-auto max-w-7xl px-2 py-8 pt-28 min-h-[calc(100vh-7rem)]">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 overflow-auto lg:w-56">
            <DocSearch />
            <DocSidebar />
          </aside>
          <main className="flex min-w-0 flex-1 flex-col items-stretch">
            <DocCopyEnhancer />
            <div className="w-full">
              {children}
            </div>
            <div
              id="docs-navigation-buttons"
              className="flex w-full max-w-4xl justify-between"
            >
              {/* Przyciski Next/Previous będą renderowane w page.tsx */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
