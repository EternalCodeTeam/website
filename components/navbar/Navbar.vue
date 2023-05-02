<template>
  <div class="bg-white">
    <div class="fixed inset-x-0 top-0 z-50">
      <nav
        class="border-gray-200 bg-transparent backdrop-blur-md backdrop-filter">
        <div
          class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <NuxtLink class="flex items-center" to="/">
            <NuxtImg
              alt="Eternalcode Logo"
              aria-label="Eternalcode Logo"
              class="mr-3 h-8 text-white dark:invert"
              format="svg"
              height="32"
              src="/assets/img/logo.svg"
              width="32" />
            <span
              class="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white md:block">
              EternalCode.pl
            </span>
          </NuxtLink>

          <div class="flex items-center md:order-2">
            <LocaleButtons />
            <ThemeSwitcher />

            <button
              aria-controls="mobile-menu-language-select"
              aria-expanded="false"
              aria-label="Menu"
              class="ml-1 inline-flex items-center rounded-lg p-2 text-sm dark:text-white md:hidden"
              data-collapse-toggle="mobile-menu-language-select"
              type="button">
              <font-awesome-icon :icon="['fa', 'bars']" class="h-6 w-6" />
            </button>
          </div>

          <div
            id="mobile-menu-language-select"
            class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
            <ul
              class="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:p-0">
              <li v-for="item in navigation" :key="item.name">
                <NuxtLink
                  :aria-label="item.name"
                  :to="item.href"
                  class="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0">
                  {{ item.name }}
                </NuxtLink>
              </li>

              <li>
                <DropdownNavbar :items="dropdownItems" name="Services" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import LocaleButtons from "~/components/navbar/LocaleButtons.vue";
import ThemeSwitcher from "~/components/navbar/ThemeSwitchButton.vue";
import DropdownNavbar from "~/components/navbar/DropdownNavbar.vue";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Team", href: "/team" },
  { name: "Our projects", href: "/projects" },
];

const dropdownItems = [
  { name: "Documentations", href: "https://docs.eternalcode.pl/" },
  { name: "Status", href: "https://status.eternalcode.pl/" },
  { name: "Repository", href: "https://repo.eternalcode.pl/#/" },
];

export default {
  components: { ThemeSwitcher, LocaleButtons, FontAwesomeIcon, DropdownNavbar },
  data() {
    return {
      navigation,
      dropdownItems,
    };
  },
};
</script>
