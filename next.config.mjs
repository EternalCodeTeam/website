



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
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/file/**",
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
    optimizePackageImports: ["framer-motion", "lucide-react"],
    serverActions: {
      allowedOrigins: ["eternalcode.pl", "www.eternalcode.pl"],
      bodySizeLimit: "5mb",
    },

  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["gray-matter", "sharp", "payload", "@payloadcms/db-sqlite"],
};

import { withPayload } from '@payloadcms/next/withPayload'

export default withPayload(nextConfig);
