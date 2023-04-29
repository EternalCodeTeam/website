<template>
  <footer class="p-4 sm:p-6 isolate">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <NuxtLink class="flex items-center ml-4" to="/">
            <NuxtImg
              alt="Eternalcode Logo"
              class="h-8 mr-3 text-white dark:invert"
              format="webp"
              height="32"
              src="/assets/img/logo.svg"
              width="32" />
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EternalCode.pl
            </span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div v-for="section in sections" :key="section.title">
            <h2
              class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {{ section.title }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li v-for="link in section.links" :key="link.text" class="mb-4">
                <NuxtLink :to="link.url" class="hover:underline">
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <div class="sm:flex sm:items-center sm:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-present EternalCodeTeam. All Rights Reserved.
        </span>
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            aria-label="TikTok link"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500"
            href="https://www.tiktok.com/@eternalcode.pl">
            <font-awesome-icon :icon="['fab', 'tiktok']" />
          </a>
          <a
            aria-label="Youtube link"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500"
            href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q">
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
          <a
            aria-label="GitHub link"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500"
            href="https://github.com/EternalCodeTeam">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <a
            aria-label="Discord link"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500"
            href="https://discord.com/invite/FQ7jmGBd6c">
            <font-awesome-icon :icon="['fab', 'discord']" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      sections: [
        {
          title: "Team",
          links: [
            {
              text: "About",
              url: "/#about",
            },
            {
              text: "Our team",
              url: "/team",
            },
          ],
        },
        {
          title: "Follow us",
          links: [
            {
              text: "Github",
              url: "https://github.com/EternalCodeTeam",
            },
            {
              text: "Discord",
              url: "https://discord.com/invite/FQ7jmGBd6c",
            },
            {
              text: "Youtube",
              url: "https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q",
            },
            {
              text: "TikTok",
              url: "https://www.tiktok.com/@eternalcode.pl",
            },
          ],
        },
        {
          title: "See more",
          links: [
            {
              text: "Repository",
              url: "https://repo.eternalcode.pl/#/",
            },
            {
              text: "Documentations",
              url: "https://docs.eternalcode.pl/",
            },
            {
              text: "Service Status",
              url: "https://status.eternalcode.pl/",
            },
          ],
        },
      ],
    };
  },
};
</script>
