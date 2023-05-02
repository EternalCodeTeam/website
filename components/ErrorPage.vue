<template>
  <section class>
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1
          class="text-primary-600 mb-4 text-7xl font-extrabold tracking-tight dark:text-white lg:text-9xl">
          404
        </h1>
        <p
          class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Something's missing.
        </p>
        <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <NuxtLink
          class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/50 transition duration-500 ease-in-out dark:shadow-lg dark:shadow-blue-800/80"
          data-aos="fade-up"
          data-aos-duration="650"
          :to="localePath('/')"
          type="button">
          Back to homepage!
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<script setup></script>
