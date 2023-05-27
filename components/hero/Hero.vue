<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <PolygonLeft />

    <div
      class="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
          data-aos="fade-up"
          data-aos-duration="500">
          {{ $t("welcome") }}
        </h1>

        <p
          class="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
          data-aos="fade-up"
          data-aos-duration="550">
          {{ $t("subwelcome") }}
        </p>

        <NuxtLink :to="localePath('/#about')">
          <button
            :aria-label="$t('firstButton') + ' button'"
            class="text-black dark:text-white font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Icon name="material-symbols:arrow-forward" class="mb-[0.5px]"/>
            {{ $t("firstButton") }}
          </button>
        </NuxtLink>

        <NuxtLink :to="localePath('/team')">
          <button
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <Icon name="material-symbols:groups" class="mb-[0.5px]"/>
            {{ $t("secondButton") }}
          </button>
        </NuxtLink>
      </div>

      <div class="lg:col-span-5 hidden lg:block">
        <div class="overflow-hidden">
          <!--          <NuxtImg format="webp" width="400" height="400" src="/assets/img/coding.png" />-->
        </div>
      </div>

      <PolygonRight />
    </div>
  </div>
</template>
<script setup>
import PolygonRight from "~/components/hero/PolygonRight.vue";
import PolygonLeft from "~/components/hero/PolygonLeft.vue";
</script>
