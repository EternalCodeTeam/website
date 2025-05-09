import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./prism-languages";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "EternalCode.pl | Home",
  description: "We are a team creating open source projects!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body
          className={`${poppins.className} min-h-screen bg-[#eff1f5] antialiased dark:bg-[#0d1117]`}
        >
          <NextTopLoader />
          <header>
            <Navbar />
          </header>

          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
