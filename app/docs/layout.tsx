import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import SidebarWrapper from "@/components/docs/sidebar/SidebarWrapper";

const poppins = Poppins({
  weight: "500",
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

import { FacadePattern } from "@/components/ui/facade-pattern";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-gray-50 antialiased transition-colors duration-200 dark:bg-gray-950`}
    >
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        <div className="absolute top-0 left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 mix-blend-multiply blur-3xl filter dark:bg-indigo-500/5 dark:mix-blend-screen" />
        <div className="absolute right-[-10%] bottom-0 h-[600px] w-[600px] rounded-full bg-cyan-500/10 mix-blend-multiply blur-3xl filter dark:bg-cyan-500/5 dark:mix-blend-screen" />
        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto min-h-[calc(100vh-7rem)] max-w-(--breakpoint-xl) px-4 py-12 pt-56 md:pt-36">
        <div className="flex flex-col gap-8 lg:flex-row">
          <SidebarWrapper />
          <main className="flex min-w-0 flex-1 flex-col items-stretch">
            <div className="w-full" style={{ minHeight: "60vh" }}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
