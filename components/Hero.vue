<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div
      aria-hidden="true"
      class="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00eeff] to-[#002fff] opacity-70 sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "></div>
    </div>

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

      <div class="lg:col-span-5">
        <div class="overflow-hidden">
          <NuxtLink src="public/assets/img/Snap.png" />
        </div>
      </div>

      <div
        aria-hidden="true"
        class="absolute inset-x-0 -top-40 z-[-1] overflow-hidden blur-3xl sm:-top-80">
        <div
          class="relative left-[calc(50%+11rem)] aspect-[655/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00eeff] to-[#002fff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
</script>
