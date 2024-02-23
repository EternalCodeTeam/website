import generated from "@next/bundle-analyzer";

const withBundleAnalyzer = generated({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  siteUrl: "https://www.eternalcode.pl",
  generateRobotsTxt: true,

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
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
