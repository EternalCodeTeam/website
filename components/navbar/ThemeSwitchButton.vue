<template>
  <button
    aria-label="Toggle Dark Mode"
    class="transition-all duration-500 inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800"
    @click="toggleTheme">
    <font-awesome-icon
      v-if="!isDarkTheme"
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
<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useDark } from "@vueuse/core";

export default {
  name: "ThemeSwitcher",
  components: { FontAwesomeIcon },
  setup() {
    const isDarkTheme = useDark();

    const toggleTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
      document.documentElement.classList.toggle("dark");
    };

    return {
      isDarkTheme,
      toggleTheme,
    };
  },
};
</script>
