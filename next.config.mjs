import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm", "remark-emoji"],
    rehypePlugins: ["rehype-slug", ["rehype-autolink-headings", { behavior: "wrap" }], "rehype-prism"],
  },
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
    mdxRs: false,
  },
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ["gray-matter"],
};

export default withMDX(nextConfig);
