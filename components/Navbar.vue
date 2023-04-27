<template>
  <div class="bg-white">
    <div class="fixed inset-x-0 top-0 z-50">
      <nav class="border-gray-200 bg-transparent backdrop-filter backdrop-blur-md">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NuxtLink class="flex items-center" to="/">
            <NuxtImg
                alt="Eternalcode Logo"
                class="h-8 mr-3 text-white dark:invert"
                format="webp"
                height="32"
                src="/img/logo.svg"
                width="32"
            />
            <span
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EternalCode.pl
            </span>
          </NuxtLink>

          <div class="flex items-center md:order-2">
            <ThemeSwitchButton/>

            <button
                aria-controls="mobile-menu-language-select"
                aria-expanded="false"
                class="inline-flex items-center p-2 ml-1 text-sm rounded-lg md:hidden dark:text-white"
                data-collapse-toggle="mobile-menu-language-select"
                type="button"
            >
              <font-awesome-icon :icon="['fa', 'bars']" class="w-6 h-6"/>
            </button>
          </div>

          <div
              id="mobile-menu-language-select"
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">

            <ul class="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li v-for="item in navigation" :key="item.name">
                <NuxtLink
                    :to="item.href"
                    class="block py-2 pl-3 pr-4 text-gray-900 rounded-full md:p-0 dark:text-white"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      navigation,
    };
  },
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Documentations", href: "https://docs.eternalcode.pl/" },
  { name: "Status", href: "https://status.eternalcode.pl/" },
  { name: "Repository", href: "https://repo.eternalcode.pl/#/" },
];
</script>
