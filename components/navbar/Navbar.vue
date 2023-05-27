<template>
  <div class="bg-white">
    <nav
      class="border-gray-200 bg-transparent backdrop-blur-md backdrop-filter fixed inset-x-0 top-0 z-50">
      <div
        class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <NuxtLink class="flex items-center" :to="localePath('/')">
          <NuxtImg
            class="mr-3 h-8 text-white dark:invert"
            format="svg"
            alt="Eternalcode Logo"
            aria-label="Eternalcode Logo"
            src="/assets/img/logo.svg"
            width="32"
            height="32" />
          <span
            class="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white md:block">
            EternalCode.pl
          </span>
        </NuxtLink>
        <div class="flex items-center md:order-2">
          <ThemeSwitcher />
          <NavbarLanguageSwitchDropdown />
          <button
            class="ml-1 inline-flex items-center rounded-lg p-2 text-sm dark:text-white md:hidden"
            type="button"
            aria-label="Menu"
            aria-controls="mobile-menu-language-select"
            aria-expanded="false"
            data-collapse-toggle="mobile-menu-language-select">
            <Icon name="fa6-solid:bars" class="h-6 w-6" />
          </button>
        </div>
        <div
          id="mobile-menu-language-select"
          class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul
            class="mt-4 flex flex-col p-4 md:mt-0 md:flex-row md:space-x-8 md:p-0">
            <li>
              <NuxtLink
                :to="localePath('/')"
                class="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Home">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/team')"
                class="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Team">
                Team
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/projects')"
                class="block rounded-full py-2 pl-3 pr-4 text-gray-900 dark:text-white md:p-0"
                aria-label="Projects">
                Projects
              </NuxtLink>
            </li>
            <li>
              <DropdownNavbar :name="$t('navbar.services')" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from "~/components/navbar/ThemeSwitchButton.vue";
import DropdownNavbar from "~/components/navbar/DropdownNavbar.vue";

const localePath = useLocalePath();
</script>