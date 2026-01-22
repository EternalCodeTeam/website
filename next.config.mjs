const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
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
        hostname: "private-user-images.githubusercontent.com",
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
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 450, 512],
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  reactCompiler: true,
  transpilePackages: ["next-mdx-remote"],
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "date-fns",
      "react-icons",
      "@radix-ui/react-tabs",
      "next-mdx-remote",
    ],
    serverActions: {
      allowedOrigins: ["eternalcode.pl", "www.eternalcode.pl"],
      bodySizeLimit: "5mb",
    },
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["gray-matter", "sharp", "@takumi-rs/image-response"],
};

import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default bundleAnalyzer(nextConfig);
