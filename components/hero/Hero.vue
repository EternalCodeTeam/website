<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <PolygonLeft aria-hidden="true" />
    <div
      class="mx-auto flex max-w-screen-xl flex-col py-8 pl-2 md:w-full md:items-center md:justify-center lg:grid lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
      <div class="place-self-center md:ml-0 lg:col-span-4 lg:mr-auto">
        <h1
          class="mb-4 text-center text-4xl font-extrabold tracking-tight dark:text-white md:text-5xl lg:text-left lg:ml-0 xl:text-6xl"
          data-aos="fade-up"
          data-aos-duration="500">
          {{ $t("welcome") }}
        </h1>
        <p
          class="mb-6 max-w-2xl text-center font-light text-gray-500 dark:text-gray-400 md:text-lg lg:max-w-2xl lg:mb-8 lg:text-left lg:text-xl"
          data-aos="fade-up"
          data-aos-duration="550">
          {{ $t("subwelcome") }}
        </p>
        <div
          class="flex flex-col items-center justify-center pr-4 sm:flex-row md:p-0 lg:block">
          <NuxtLink :to="localePath('/#about')">
            <button
              :aria-label="$t('firstButton') + ' button'"
              class="mb-2 mr-2 pr-5 py-2.5 text-left text-sm font-medium text-black dark:text-white">
              <Icon name="material-symbols:arrow-forward" class="mb-[0.5px]" />
              {{ $t("firstButton") }}
            </button>
          </NuxtLink>

          <NuxtLink :to="localePath('/team')">
            <button
              :aria-label="$t('secondButton') + ' button'"
              class="mb-2 mr-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">
              <Icon name="material-symbols:groups" class="mb-[0.5px]" />
              {{ $t("secondButton") }}
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="lg:col-span-8 w-full lg:block lg:pl-36 lg:pr-0 px-20">
        <Terminal />
      </div>
      <PolygonRight aria-hidden="true" />
    </div>
  </div>
</template>
<script setup>
import PolygonRight from "~/components/hero/PolygonRight.vue";
import PolygonLeft from "~/components/hero/PolygonLeft.vue";
import Terminal from "~/components/hero/terminal/Terminal.vue";
</script>