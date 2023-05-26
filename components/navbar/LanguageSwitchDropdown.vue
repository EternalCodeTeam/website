<template>
  <div class="relative" ref="dropdown">
    <button
      :aria-expanded="isOpen.toString()"
      aria-haspopup="true"
      id="languageDropdownButton"
      data-dropdown-toggle="languageDropdown"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded-[12px] hover:bg-gray-100t md:border-0 md:p-0 md:w-auto dark:text-white dark:border-white"
      @click="isOpen = !isOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 dark:text-white">
        <path
          fill-rule="evenodd"
          d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
          clip-rule="evenodd" />
      </svg>
      {{ name }}
      <svg
        :class="{
          'transform rotate-180 transition-transform duration-300': isOpen,
          'transition-transform duration-300': !isOpen,
        }"
        aria-hidden="true"
        class="w-5 h-5 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          fill-rule="evenodd"></path>
      </svg>
    </button>

    <div
      id="languageDropdown"
      v-if="isOpen"
      class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-[12px] shadow w-16 dark:bg-[#161b22]"
      role="menu">
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
        target.id !== "languageDropdownButton"
      ) {
        this.isOpen = false;
      }
    },
    setLanguage(language: string) {
      this.$i18n.locale = language;
    },
  },
};
</script>
