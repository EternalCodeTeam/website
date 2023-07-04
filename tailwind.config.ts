module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        bgbounce: {
          '0%': { transform: 'translateY(-100px) translateX(0px)', opacity: '0.5' },
          '25%': { transform: 'translateY(20px) translateX(10px)', opacity: '1' },
          '40%': { transform: 'translateY(50px) translateX(-30px)', opacity: '0.6' },
          '60%': { transform: 'translateY(70px) translateX(-130px)', opacity: '0.9' },
          '75%': { transform: 'translateY(30px) translateX(45px)', opacity: '0.75' },
          '100%': { transform: 'translateY(-30px)  translateX(0px)', opacity: '0.4' },
        }
      },
        animation: {
            'bounce-up-down': 'bgbounce 10s ease-in-out infinite alternate',
        }
    }
  },
  variants: {},
  plugins: [
    require("@tailwindcss/container-queries"),
    require("flowbite/plugin"),
  ],
  fontFamily: {
    body: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
    sans: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "system-ui",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
  },
};
