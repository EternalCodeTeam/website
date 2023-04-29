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
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1
          class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
          data-aos="fade-up"
          data-aos-duration="500">
          Lorem Ipsum
        </h1>

        <p
          class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
          data-aos="fade-up"
          data-aos-duration="550">
          Fusce utinam contentiones vel vocibus dicat augue. Conclusionemque
          liber habitant conubia atomorum libero fringilla ante gubergren
          recteque.
        </p>

        <a
          class="inline-flex items-center justify-center px-1 py-3 mr-3 text-base font-medium text-center dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800"
          data-aos="fade-up"
          data-aos-duration="600"
          href="#about">
          Lets Go!
        </a>

        <NuxtLink
          class="bg-gradient-to-r transition duration-500 ease-in-out from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-white font-medium"
          data-aos="fade-up"
          data-aos-duration="650"
          to="/team"
          type="button">
          Meet our team!
        </NuxtLink>
      </div>
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex"></div>
    </div>

    <div
      aria-hidden="true"
      class="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
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
</template>
<script setup lang="ts"></script>
