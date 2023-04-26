<template>
  <transition class="duration-500 ease-in-out" name="fade">
    <button
        class="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800"
        @click="toggleTheme"
    >

      <font-awesome-icon
          v-if="!isDarkTheme"
          :icon="['fa', 'moon']"
          class="w-6 h-6 text-black"
      />
      <font-awesome-icon
          v-else
          :icon="['fa', 'sun']"
          class="w-6 h-6 text-white"
      />

    </button>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "ThemeSwitcher",
  components: { FontAwesomeIcon },
  data() {
    return {
      isDarkTheme: false,
    };
  },
  mounted() {
    this.isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      document.documentElement.classList.toggle("dark");
    },
  },
};
</script>