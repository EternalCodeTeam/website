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
        { src: "~/plugins/aos", mode: "client" }
    ],
    
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            '@fullhuman/postcss-purgecss': {
                content: [ './pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue' ],
                safelist: [ 'html', 'body' ]
            }
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


    htmlValidator: {
        usePrettier: false, // TODO: enable prettier
    },
});
