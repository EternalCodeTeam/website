import withBundleAnalyzer from "@next/bundle-analyzer";
import { createMDX } from "fumadocs-mdx/next";

// React 19 in development reconstructs callstacks across environments (and the App Router dev
// overlay / react-refresh do their own eval-based work), so `next dev` needs 'unsafe-eval'.
// The exception is scoped to development only - production keeps a strict `script-src`.
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com https://private-user-images.githubusercontent.com https://i.imgur.com https://imgur.com https://cms.eternalcode.pl https://eternalcode.pl https://www.eternalcode.pl",
  "font-src 'self' data:",
  "connect-src 'self' https://api.github.com https://api.modrinth.com https://raw.githubusercontent.com https://eternalcode.pl https://www.eternalcode.pl https://vitals.vercel-insights.com https://api.iconify.design https://api.simplesvg.com https://api.unisvg.com",
  "media-src 'self' https://raw.githubusercontent.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  turbopack: {
    root: import.meta.dirname,
  },
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
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "date-fns",
      "@iconify/react",
      "@radix-ui/react-tabs",
    ],
    serverActions: {
      allowedOrigins: ["eternalcode.pl", "www.eternalcode.pl"],
      bodySizeLimit: "5mb",
    },
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["sharp", "@takumi-rs/image-response"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const withMDX = createMDX();

export default withMDX(bundleAnalyzer(nextConfig));
