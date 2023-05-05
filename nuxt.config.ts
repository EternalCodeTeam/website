export default defineNuxtConfig({
  ssr: true,

  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "@nuxt/image-edge",
    "@nuxt/content",
    "@nuxtjs/i18n",
  ],
  extends: ["nuxt-seo-kit"],

  plugins: [
    { src: "~/plugins/aos", mode: "client" },
    { src: "~/plugins/fontawesome" },
  ],

  // postcss
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {},
    },
  },

  i18n: {
    defaultLocale: "en",
    langDir: "locales",
    locales: [
      {
        code: "pl",
        file: "pl.json",
        iso: "pl-PL",
      },
      {
        code: "en",
        file: "en.json",
        iso: "en-US",
      },
    ],
    strategy: "prefix",
  },

  // Seo kit
  runtimeConfig: {
    public: {
      siteName: "EternalCode.pl",
      siteDescription: "EternalCode.pl - Open source projects team",
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
