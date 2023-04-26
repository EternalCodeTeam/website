export default defineNuxtConfig({
  ssr: true,
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  // TODO: configure purgeCSS
  modules: [
    "@nuxt/devtools",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontaine",
    "@vite-pwa/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/html-validator",
  ],
  plugins: [{ src: "~/plugins/aos", mode: "client" }],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  htmlValidator: {
    usePrettier: false, // TODO: enable prettier
  },
});
