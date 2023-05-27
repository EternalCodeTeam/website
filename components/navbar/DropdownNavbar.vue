<template>
  <div class="relative" ref="dropdown">
    <button
      :aria-expanded="isOpen ? 'true' : 'false'"
      aria-haspopup="true"
      id="servicesDropdownButton"
      data-dropdown-toggle="servicesDropdown"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded-[12px] hover:bg-gray-100t md:border-0 md:p-0 md:w-auto dark:text-white dark:border-white"
      @click="isOpen = !isOpen">
      {{ name }}
      <Icon
        name="material-symbols:keyboard-arrow-down-rounded"
        size="20"
        class="mt-1"
        alt="Dropdown arrow"
        :class="{
          'transform rotate-180 transition-transform duration-300': isOpen,
          'transition-transform duration-300': !isOpen,
        }" />
    </button>

    <div
      id="servicesDropdown"
      v-if="isOpen"
      class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-[12px] shadow w-44 dark:bg-[#161b22]"
      role="menu">
      <ul
        aria-labelledby="servicesDropdownButton"
        class="py-2 text-sm text-gray-700">
        <li>
          <a
            :aria-label="$t('navbar.dropdown.docs')"
            href="https://docs.eternalcode.pl/"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 dark:hover:text-white"
            role="menuitem">
            {{ $t("navbar.dropdown.docs") }}
          </a>
        </li>
        <li>
          <a
            :aria-label="$t('navbar.dropdown.status')"
            href="https://status.eternalcode.pl/"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 dark:hover:text-white"
            role="menuitem">
            {{ $t("navbar.dropdown.status") }}
          </a>
        </li>
        <li>
          <a
            :aria-label="$t('navbar.dropdown.repo')"
            href="https://repo.eternalcode.pl/#/"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 dark:hover:text-white"
            role="menuitem">
            {{ $t("navbar.dropdown.repo") }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
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
  },
};
</script>