import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "lenis/dist/lenis.css";
import type React from "react";

import "./prism-languages";
import { CookieConsentModal } from "@/components/cookie-consent-modal";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/hero/navbar";

import { Providers } from "./providers";

export const dynamic = "force-static";
export const revalidate = 5;

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
  },
  twitter: {
    card: "summary_large_image",
    site: "@eternalcode",
    creator: "@eternalcode",
    title: "EternalCode.pl | We are a team creating open source projects!",
    description:
      "EternalCode.pl delivers open source solutions with a focus on quality, performance, and innovation.",
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
    <html
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${poppins.className} relative min-h-screen overflow-x-hidden bg-light-gray-100 antialiased dark:bg-gray-900`}
      >
        <Providers>
          <NextTopLoader
            color="#3b82f6"
            crawl={true}
            crawlSpeed={200}
            easing="ease"
            height={3}
            initialPosition={0.08}
            shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
            showSpinner={false}
            speed={200}
          />
          <header>
            <Navbar />
          </header>

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
          <CookieConsentModal />
        </Providers>
      </body>
    </html>
  );
}
