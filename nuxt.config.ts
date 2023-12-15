export default defineNuxtConfig({
  ssr: true,

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxtseo/modules"
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
  },

  unhead: {
    seoOptimise: true,
  },

  linkChecker: {
    trailingSlash: false,
  },

  app: {
    head: {
      titleTemplate: "%s %separator %siteName",
    },
  },
});
