<template>
  <button
    aria-label="Toggle Dark Mode"
    class="transition-all duration-500 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800"
    @click="toggleTheme">
    <font-awesome-icon
      v-if="!isDark"
      :icon="['fas', 'moon']"
      class="h-6 w-6 text-black"
      alt="Moon icon"
      title="Switch to dark mode" />
    <font-awesome-icon
      v-else
      :icon="['fas', 'sun']"
      class="h-6 w-6 text-white"
      alt="Sun icon"
      title="Switch to light mode" />
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ThemeSwitchButton",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
  },
  mounted() {
    this.isDark = localStorage.getItem("theme") === "dark";
    if (this.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
};
</script>