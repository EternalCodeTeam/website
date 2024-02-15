export default defineNuxtConfig({
  ssr: true,

  css: ["~/assets/css/main.css", "~/assets/css/loading.css"],

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxtseo/module",
  ],

  plugins: [{ src: "~/plugins/aos", mode: "client" }],

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
    strategy: "prefix_except_default",
  },

  // Seo kit
  runtimeConfig: {
    public: {
      siteName: "EternalCode.pl",
      siteDescription: "EternalCode.pl - Open source projects team",
      titleSeparator: "|",
      trailingSlash: true,
    },

    private: {
      ETERNALCODE_STRAPI_KEY: process.env.ETERNALCODE_STRAPI_KEY,
      ETERNALCODE_STRAPI_URL: process.env.ETERNALCODE_STRAPI_URL,
    },
  },

  unhead: {
    seoOptimise: true,
  },

  linkChecker: {
    trailingSlash: false,
  },

  app: {
    pageTransition: {
      name: "page",
      mode: "in-out",
    },

    head: {
      titleTemplate: "%s %separator %siteName",
    },
  },
});
