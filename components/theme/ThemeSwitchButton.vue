<template>
  <transition class="duration-500 ease-in-out" name="fade">
    <button
      aria-label="Toggle Dark Mode"
      class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-gray-800"
      @click="toggleTheme">
      <font-awesome-icon
        v-if="!isDarkTheme"
        :icon="['fa', 'moon']"
        class="h-6 w-6 text-black" />
      <font-awesome-icon
        v-else
        :icon="['fa', 'sun']"
        class="h-6 w-6 text-white" />
    </button>
  </transition>
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
