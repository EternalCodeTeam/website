import React from "react";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/header/Navbar";
import DocSidebar from "@/components/docs/DocSidebar";
import DocSearch from "@/components/docs/DocSearch";
import DocCopyEnhancer from "@/components/docs/DocCopyEnhancer";
import AnimatedLayout from "@/components/docs/AnimatedLayout";
import AnimatedSection from "@/components/animations/AnimatedSection";

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
  description:
    "Comprehensive documentation for EternalCode.pl projects and services",
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

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${poppins.className} min-h-screen bg-[#eff1f5] transition-colors duration-200 dark:bg-[#0d1117]`}
    >
      <Navbar />
      <AnimatedLayout>
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full flex-shrink-0 lg:w-64">
            <div className="sticky top-32 z-20 flex flex-col gap-4">
              <AnimatedSection preserveAnimation={true}>
                <DocSearch />
              </AnimatedSection>
              <AnimatedSection animationType="fadeLeft" preserveAnimation={true}>
                <DocSidebar />
              </AnimatedSection>
            </div>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col items-stretch">
            <AnimatedSection animationType="fadeUp" className="w-full" style={{ minHeight: '60vh' }}>
              <DocCopyEnhancer />
              {children}
            </AnimatedSection>
            <div
              id="docs-navigation-buttons"
              className="mt-12 flex w-full justify-between"
            >
              {/* Przyciski Next/Previous będą renderowane w page.tsx */}
            </div>
          </div>
        </div>
      </AnimatedLayout>
    </div>
  );
}
