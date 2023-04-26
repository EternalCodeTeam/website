export default defineNuxtConfig({
    css: [
        '~/assets/css/main.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    plugins: [
        { src: '~/plugins/aos', mode: 'client' },
    ],
    // TODO: configure purgeCSS
    modules: [
        '@nuxt/devtools',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontaine',
        '@vite-pwa/nuxt',
        '@nuxt/image-edge',
        '@nuxtjs/color-mode',
        '@nuxt/content',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})