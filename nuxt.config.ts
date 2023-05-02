export default defineNuxtConfig({
  ssr: true,

  css: [
    "~/assets/css/main.css",
    "~/node_modules/@fortawesome/fontawesome-svg-core/styles.css",
  ],

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "@vite-pwa/nuxt",
    "@nuxt/image-edge",
    "@nuxt/content",
    "@nuxtjs/i18n",
  ],
  extends: ["nuxt-seo-kit"],

  plugins: [
    { src: "~/plugins/aos", mode: "client" },
    { src: "~/plugins/fontawesome", mode: "client" },
  ],

  // postcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
    },
  },

  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      {
        code: "pl",
        file: "pl.json",
      },
      {
        code: "en",
        file: "en.json",
      },
    ],
  },

  // Seo kit
  runtimeConfig: {
    public: {
      siteName: "EternalCode.pl",
      siteDescription: "EternalCode.pl - Open source projects team",
      languages: ["en", "pl"],
      titleSeparator: "|",
      trailingSlash: true,
    },
  },

  unhead: {
    seoOptimise: true,
  },

  app: {
    head: {
      titleTemplate: "%pageTitle %titleSeparator %siteName",
    },
  },

  // pwa
  pwa: {
    manifest: {
      name: "EternalCode.pl",
    },
  },
});
