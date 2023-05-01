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

        <NuxtLink
          class="bg-primary-700 hover:bg-primary-800 mr-3 inline-flex items-center justify-center rounded-lg px-1 py-3 text-center text-base font-medium dark:text-white"
          data-aos="fade-up"
          data-aos-duration="600"
          to="/#about">
          Lets Go!
        </NuxtLink>

        <NuxtLink
          class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out dark:shadow-lg dark:shadow-blue-800/80"
          data-aos="fade-up"
          data-aos-duration="650"
          to="/team"
          type="button">
          Meet our team!
        </NuxtLink>
      </div>

      <div class="lg:col-span-5 hidden lg:block">
        <div class="overflow-hidden">
          <NuxtImg src="/assets/img/Snap.png" />
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