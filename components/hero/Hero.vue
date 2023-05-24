<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <PolygonLeft/>

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
            <svg class="svg-inline--fa fa-arrow-right" aria-hidden="true" focusable="false" data-prefix="fas" role="img"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path class="" fill="currentColor"
                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
            {{ $t("firstButton") }}
          </button>
        </NuxtLink>

        <NuxtLink :to="localePath('/team')">
          <button
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <svg class="svg-inline--fa fa-people-group" aria-hidden="true" focusable="false" data-prefix="fas"
                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path class="" fill="currentColor"
                    d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z"></path>
            </svg>
            {{ $t("secondButton") }}
          </button>
        </NuxtLink>
      </div>

      <div class="lg:col-span-5 hidden lg:block">
        <Terminal/>
      </div>

      <PolygonRight/>
    </div>
  </div>
</template>
<script setup>
import PolygonRight from "~/components/hero/PolygonRight.vue";
import PolygonLeft from "~/components/hero/PolygonLeft.vue";
import Terminal from "~/components/hero/terminal/Terminal.vue";

</script>
<style>

</style>