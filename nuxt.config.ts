export default defineNuxtConfig({
    // TODO: configure purgeCSS
    ssr: true,
    css: [
        "~/assets/css/main.css",
        "@fortawesome/fontawesome-svg-core/styles.css",
    ],

    modules: [
        "@nuxt/devtools",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/fontaine",
        "@vite-pwa/nuxt",
        "@nuxt/image-edge",
        "@nuxtjs/color-mode",
        "@nuxt/content",
        "@nuxtjs/html-validator",
        'nuxt-purgecss',
    ],
    extends: [
        'nuxt-seo-kit'
    ],
    plugins: [
        { src: "~/plugins/aos", mode: "client" },
        { src: "~/plugins/fontawesome", mode: "client" },
    ],

    // postcss
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    // Seo kit
    runtimeConfig: {
        public: {
            siteName: "EternalCode.pl",
            siteDescription: "EternalCode.pl - Open source projects team",
            language: "en",
            titleSeparator: '|',
            trailingSlash: true,
        }
    },

    unhead: {
        seoOptimise: true
    },

    app: {
        head: {
            titleTemplate: '%pageTitle %titleSeparator %siteName'
        }
    },

    // purgeCSS
    purgeCSS: {
        mode: "postcss",
        content: [
            "./components/**/*.{js,vue,ts}",
            "./layouts/**/*.vue",
            "./pages/**/*.vue",
            "./plugins/**/*.{js,ts}",
            "./nuxt.config.{js,ts}",
            "./app.vue",
            "./node_modules/flowbite/**/*.js",
        ],
/*        whitelist: ["dark-mode"],
        whitelistPatterns: [/svg.*!/, /fa.*!/],*/
    },

    htmlValidator: {
        usePrettier: false, // TODO: enable prettier
    },
});
