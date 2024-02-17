<template>
  <section id="projects">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle
        :title="$t('projects.text')"
        :description="$t('projects.text2')" />

      <div class="mt-8 space-y-8 lg:mt-12 lg:alternate">
        <div
          v-for="(repo, index) in fetchResult.data"
          :key="repo.id"
          :index="index"
          class="flex flex-col-reverse items-center justify-between lg:flex-row gap-12">
          <div class="w-full md:w-1/2 lg:w-1/2">
            <h1
              class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
              data-aos="fade-up"
              data-aos-duration="500">
              {{ repo.attributes.name }}
            </h1>
            <p
              class="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
              data-aos="fade-up"
              data-aos-duration="550">
              {{ repo.attributes.description }}
            </p>
            <div class="flex">
              <a :href="`${repo.attributes.repository_url}`" target="_blank">
                <button
                  aria-label="Go to repository"
                  class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 md:mb-0 md:mr-2"
                  data-aos="fade-up"
                  data-aos-duration="600">
                  <Icon name="ph:github-logo-fill" class="mb-[0.5px]" />
                  Repository
                </button>
              </a>
            </div>
          </div>
          <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2">
            <NuxtImg
              :alt="`${repo.attributes.name} project image`"
              :src="`${repo.attributes.banner_url}`"
              class="rounded-[12px] object-cover"
              data-aos="fade-up"
              data-aos-duration="500"
              format="webp"
              loading="lazy"
              height="500"
              width="1000" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fetchResult = await $fetch("/api/projects");
</script>

<style scoped>
@tailwind utilities;

@layer utilities {
  .alternate div:nth-child(even) {
    @apply flex-row-reverse;
  }
}
</style>
