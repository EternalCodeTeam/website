import createMDX from "@next/mdx";

import { mdxOptions } from "./lib/mdx-config.mjs";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: mdxOptions,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars-githubusercontent.webp.se",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cms.eternalcode.pl",
        port: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@headlessui/react", "framer-motion", "lucide-react"],
    serverActions: {
      allowedOrigins: ["eternalcode.pl", "www.eternalcode.pl"],
    },
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["gray-matter"],
};

export default withMDX(nextConfig);
