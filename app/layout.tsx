import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import React from "react";
import { Analytics } from "@/components/Analytics";
import { SpeedInsights } from "@/components/SpeedInsights";
import "./prism-languages";
import DocCopyEnhancer from "@/components/docs/DocCopyEnhancer";
import { CookieConsentModal } from "@/components/CookieConsentModal";
import { CookiePreferencesMenu } from "@/components/CookiePreferencesMenu";

// Enable static generation with revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://eternalcode.pl"),
  title: {
    template: "%s | EternalCode.pl",
    default: "EternalCode.pl | Home",
  },
  description: "We are a team creating open source projects!",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eternalcode.pl",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} min-h-screen bg-[#eff1f5] antialiased dark:bg-[#0d1117]`}
      >
        <Providers>
          <NextTopLoader />
          <header>
            <Navbar />
          </header>

          {children}
          <Footer />
          <DocCopyEnhancer />
          <Analytics />
          <SpeedInsights />
          <CookieConsentModal />
          <CookiePreferencesMenu />
        </Providers>
      </body>
    </html>
  );
}
