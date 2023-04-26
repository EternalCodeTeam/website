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
        "@nuxt/content",
        "@nuxtjs/html-validator",
        "nuxt-purgecss",
    ],
    extends: [
        "nuxt-seo-kit"
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
            titleSeparator: "|",
            trailingSlash: true,
        }
    },

    unhead: {
        seoOptimise: true
    },

    app: {
        head: {
            titleTemplate: "%pageTitle %titleSeparator %siteName"
        }
    },

    // purgeCSS
    purgeCSS: {
        mode: "postcss",
        // Add the paths to your Tailwind CSS files
        content: [
            "./components/**/*.{vue,js}",
            "./layouts/**/*.vue",
            "./pages/**/*.vue",
            "./plugins/**/*.{js,ts}",
            "./nuxt.config.{js,ts}",
        ],
        safelist: [
            "dark",
        ]
    },

    htmlValidator: {
        usePrettier: false, // TODO: enable prettier
    }
});
