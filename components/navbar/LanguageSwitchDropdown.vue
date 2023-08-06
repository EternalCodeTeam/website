<template>
  <div ref="dropdown" class="relative">
    <button
      id="languageDropdownButton"
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="true"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded-[12px] hover:bg-gray-100t md:border-0 md:p-0 md:w-auto dark:text-white dark:border-white"
      @mouseover="isOpen = true">
      <Icon name="bi:translate" class="w-6 h-6 dark:text-white" />
      <Icon
        name="material-symbols:keyboard-arrow-down-rounded"
        size="20"
        alt="Dropdown arrow"
        :class="{
          'transform rotate-180 transition-transform duration-300': isOpen,
          'transition-transform duration-300': !isOpen,
        }" />
    </button>

    <div
      v-if="isOpen"
      id="languageDropdown"
      class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-[12px] shadow w-16 dark:bg-[#161b22]"
      role="menu"
      @mouseleave="isOpen = false">
      <ul
        aria-labelledby="languageDropdownButton"
        class="py-2 text-sm text-gray-700">
        <li>
          <a
            aria-label="polish language switch button"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 hover:text-gray-700 dark:hover:text-white flex items-center justify-center cursor-pointer"
            role="menuitem"
            @click="setLanguage('pl')">
            <NuxtImg
              class="rounded-[15%]"
              src="/assets/img/lang/pl.svg"
              alt="Polish language"
              aria-label="Polish language"
              width="24"
              height="24" />
          </a>
        </li>
        <li>
          <a
            aria-label="english language switch button"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 hover:text-gray-700 dark:hover:text-white flex items-center justify-center cursor-pointer"
            role="menuitem"
            @click="setLanguage('en')">
            <NuxtImg
              class="rounded-[15%]"
              src="/assets/img/lang/en.svg"
              alt="English language"
              aria-label="English language"
              width="24"
              height="24" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: false,
    };
  },
    mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event: MouseEvent) {
      const dropdown = this.$refs.dropdown as HTMLElement;
      const target = event.target as HTMLElement;
      if (
        !dropdown.contains(target) &&
        target.id !== "servicesDropdownButton"
      ) {
        this.isOpen = false;
      }
    },
    setLanguage(language: string) {
      this.$i18n.locale = language;
    },
  }
};
</script>