<template>
  <button
    aria-label="Toggle Dark Mode"
    class="transition-all duration-500 inline-flex h-10 w-10 items-center justify-center rounded-full"
    :class="{ 'opacity-50 pointer-events-none': isDisabled }"
    @click="toggleTheme"
    :disabled="isDisabled">
    <Icon
      v-if="isDark"
      name="material-symbols:partly-cloudy-day-rounded"
      class="w-6 h-6 dark:invert" />

    <Icon v-else name="solar:moon-stars-bold" class="w-6 h-6 dark:invert" />
  </button>
</template>

<script>
export default {
  name: "ThemeSwitchButton",
  data() {
    return {
      isDark: false,
      prefersDark: false,
      isDisabled: false,
    };
  },
  mounted() {
    const htmlElement = document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      this.isDark = true;
      htmlElement.classList.add("dark");
      return;
    }

    if (theme === "light") {
      this.isDark = false;
      htmlElement.classList.remove("dark");
      return;
    }

    if (prefersDark) {
      this.isDark = true;
      htmlElement.classList.add("dark");
      return;
    }

    this.isDark = false;
    htmlElement.classList.remove("dark");

    this.prefersDark = prefersDark;
  },
  methods: {
    toggleTheme() {
      if (this.isDisabled) {
        return;
      }

      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 1500);

      this.isDark = !this.isDark;
      const htmlElement = document.documentElement;

      if (this.isDark) {
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        return;
      }

      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    },
  },
};
</script>