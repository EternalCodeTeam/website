import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import React from "react";

import { Analytics } from "@/components/Analytics";
import "./prism-languages";
import { CookieConsentModal } from "@/components/CookieConsentModal";
import { CookiePreferencesMenu } from "@/components/CookiePreferencesMenu";
import DocCopyEnhancer from "@/components/page/docs/code/DocCopyEnhancer";
import Footer from "@/components/page/footer/Footer";
import Navbar from "@/components/page/header/Navbar";
import { SpeedInsights } from "@/components/SpeedInsights";
import { generateOgImageUrl } from "@/lib/og-utils";

import { Providers } from "./providers";

export const dynamic = "force-static";
export const revalidate = 60;

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eff1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

const defaultOgImageUrl = generateOgImageUrl({
  title: "EternalCode.pl",
  subtitle: "We are a team creating open source projects!",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eternalcode.pl"),
  title: "EternalCode.pl | Home",
  description:
    "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
  keywords: ["open source", "Java", "Linux", "Minecraft", "plugins", "development"],
  authors: [{ name: "EternalCode Team" }],
  creator: "EternalCode Team",
  publisher: "EternalCode Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eternalcode.pl",
    siteName: "EternalCode.pl",
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
    images: [
      {
        url: defaultOgImageUrl,
        width: 1200,
        height: 630,
        alt: "EternalCode.pl",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eternalcode",
    creator: "@eternalcode",
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
    images: [defaultOgImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://eternalcode.pl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body
        className={`${poppins.className} min-h-screen bg-lightGray-100 antialiased dark:bg-gray-900`}
      >
        <Providers>
          <NextTopLoader
            color="#3b82f6"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
          />
          <header>
            <Navbar />
          </header>

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
          <DocCopyEnhancer />
          <CookieConsentModal />
          <CookiePreferencesMenu />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
