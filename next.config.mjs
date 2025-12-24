



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
      "react-icons",
      "@radix-ui/react-tabs",
    ],
    serverActions: {
      allowedOrigins: ["eternalcode.pl", "www.eternalcode.pl"],
      bodySizeLimit: "5mb",
    },
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["gray-matter", "sharp", "payload", "@payloadcms/db-sqlite"],
};

import { withPayload } from "@payloadcms/next/withPayload";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default withSentryConfig(withPayload(bundleAnalyzer(nextConfig)), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "eternalcodeteam",
  project: "website",
}, {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Transpiles SDK to be compatible with IE11 (increases bundle size)
  transpileClientSDK: true,

  // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
