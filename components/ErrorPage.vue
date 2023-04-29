<template>
  <section class>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-white">
          404
        </h1>
        <p
          class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <NuxtLink
          class="bg-gradient-to-r transition duration-500 ease-in-out from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-white font-medium"
          data-aos="fade-up"
          data-aos-duration="650"
          to="/"
          type="button">
          Back to homepage!
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<script setup></script>
