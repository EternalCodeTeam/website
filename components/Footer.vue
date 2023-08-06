<template>
  <footer class="isolate p-4 sm:p-6">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <NuxtLink class="ml-4 flex items-center" :to="localePath('/')">
            <NuxtImg
              class="mr-3 h-8 text-white dark:invert"
              alt="Eternalcode Logo"
              aria-label="Eternalcode Logo"
              src="/assets/img/logo.svg"
              width="32"
              height="32" />
            <span
              class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              EternalCode.pl
            </span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <div class="mb-6 sm:mb-0">
            <h2
              class="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              {{ $t("footer.team") }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-2">
                <NuxtLink
                  :to="localePath('/#about')"
                  class="hover:underline"
                  aria-label="About EternalCode"
                  aria-hidden="true">
                  {{ $t("footer.about") }}
                </NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink
                  :to="localePath('/team')"
                  class="hover:underline"
                  aria-label="EternalCode Team"
                  aria-hidden="true">
                  {{ $t("footer.team") }}
                </NuxtLink>
              </li>
              <li class="mb-2">
                <NuxtLink
                  :to="localePath('/projects')"
                  class="hover:underline"
                  aria-label="EternalCode Projects"
                  aria-hidden="true">
                  {{ $t("footer.projects") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="mb-6 sm:mb-0">
            <h2
              class="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              {{ $t("footer.follow") }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-2">
                <a
                  href="https://github.com/EternalCodeTeam"
                  class="hover:underline"
                  aria-label="EternalCode Github"
                  aria-hidden="true">
                  Github
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://discord.com/invite/FQ7jmGBd6c"
                  class="hover:underline"
                  aria-label="EternalCode Discord"
                  aria-hidden="true">
                  Discord
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q"
                  class="hover:underline"
                  aria-label="EternalCode Youtube"
                  aria-hidden="true">
                  Youtube
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://www.tiktok.com/@eternalcode.pl"
                  class="hover:underline"
                  aria-label="EternalCode TikTok"
                  aria-hidden="true">
                  TikTok
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/"
                  class="hover:underline"
                  aria-label="EternalCode Spigot"
                  aria-hidden="true">
                  SpigotMC
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://modrinth.com/user/EternalCodeTeam"
                  class="hover:underline"
                  aria-label="EternalCode Modrinth"
                  aria-hidden="true">
                  Modrinth
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2
              class="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
              {{ $t("footer.seemore") }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400">
              <li class="mb-2">
                <a
                  href="https://repo.eternalcode.pl/#/"
                  class="hover:underline"
                  aria-label="EternalCode Repository"
                  aria-hidden="true">
                  {{ $t("navbar.dropdown.repo") }}
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://docs.eternalcode.pl/"
                  class="hover:underline"
                  aria-label="EternalCode Documentations"
                  aria-hidden="true">
                  {{ $t("navbar.dropdown.docs") }}
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://status.eternalcode.pl/"
                  class="hover:underline"
                  aria-label="EternalCode Service Status"
                  aria-hidden="true">
                  {{ $t("navbar.dropdown.status") }}
                </a>
              </li>
              <li class="mb-2">
                <a
                  href="https://bstats.org/author/vLucky"
                  class="hover:underline"
                  aria-label="EternalCode Service Status"
                  aria-hidden="true">
                  BStats
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr
        class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

      <div class="sm:flex sm:items-center sm:justify-between">
        <span
          class="text-sm text-gray-500 dark:text-gray-400 sm:text-center block mb-4 sm:mb-0">
          {{ $t("footer.copyright") }}
        </span>
        <div class="flex space-x-6">
          <a
            aria-label="EternalCode TikTok link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://www.tiktok.com/@eternalcode.pl">
            <Icon name="ic:round-tiktok" />
          </a>
          <a
            aria-label="EternalCode Youtube link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://www.youtube.com/channel/UC2BEaMJWxxUscN50AD0oY_Q">
            <Icon name="simple-icons:youtube" />
          </a>
          <a
            aria-label="EternalCode Github link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://github.com/EternalCodeTeam">
            <Icon name="ph:github-logo-fill" />
          </a>
          <a
            aria-label="EternalCode Discord link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://discord.com/invite/FQ7jmGBd6c">
            <Icon name="ion:logo-discord" />
          </a>
          <a
            aria-label="EternalCode SpigotMC link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://www.spigotmc.org/resources/authors/eternalcodeteam.1570200/">
            <Icon name="fa6-solid:faucet-drip" />
          </a>
          <a
            aria-label="EternalCode Modrinht link"
            class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white"
            href="https://modrinth.com/user/EternalCodeTeam">
            <Icon name="simple-icons:modrinth" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>