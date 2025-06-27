import { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";

import DocCopyEnhancer from "@/components/page/docs/code/DocCopyEnhancer";
import SidebarWrapper from "@/components/page/docs/sidebar/SidebarWrapper";
import Navbar from "@/components/page/header/Navbar";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | EternalCode.pl",
    default: "Documentation | EternalCode.pl",
  },
  description: "Comprehensive documentation for EternalCode.pl projects and services",
  metadataBase: new URL("https://eternalcode.pl"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eternalcode.pl/docs",
    siteName: "EternalCode.pl",
  },
  twitter: {
    card: "summary_large_image",
    site: "@eternalcode",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${poppins.className} min-h-screen bg-lightGray-100 antialiased transition-colors duration-200 dark:bg-gray-900`}
    >
      <Navbar />
      <div className="mx-auto min-h-[calc(100vh-7rem)] max-w-screen-xl px-4 py-12 pt-36">
        <div className="flex flex-col gap-8 lg:flex-row">
          <SidebarWrapper />

          <div className="flex min-w-0 flex-1 flex-col items-stretch">
            <div className="w-full" style={{ minHeight: "60vh" }}>
              <DocCopyEnhancer />
              {children}
            </div>
            <div id="docs-navigation-buttons" className="mt-12 flex w-full justify-between">
              {/* Przyciski Next/Previous będą renderowane w page.tsx */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
