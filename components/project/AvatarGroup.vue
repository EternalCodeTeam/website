<template>
    <div class="flex -space-x-4" data-aos="fade-up" data-aos-duration="700">
      <a
        v-for="(contributor, index) in contributors.slice(0, maxContributorsToShow)"
        :key="index"
        :href="`https://github.com/${contributor.login}`"
        target="_blank"
        class="w-10 h-10 border-2 border-white rounded-full mx-auto flex items-center justify-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-600 dark:border-gray-800"
        :title="contributor.login"
      >
        <NuxtImg
          :alt="`${contributor.login} avatar`"
          :src="contributor.avatar_url"
          format="webp"
          class="w-full h-full rounded-full object-cover"
        />
      </a>
  
      <a
        v-if="contributors && contributors.length > maxContributorsToShow"
        :href="`https://github.com/EternalCodeTeam/${repoName}/graphs/contributors`"
        target="_blank"
        class="w-10 h-10 border-2 border-white rounded-full mx-auto flex items-center justify-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-600 dark:border-gray-800"
      >
        +{{ contributors.length - maxContributorsToShow }}
      </a>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      repo: {
        type: Object,
        required: true,
      },
      maxContributorsToShow: {
        type: Number,
        default: 5,
      },
    },
    computed: {
      repoName() {
        return this.repo.name;
      },
      contributors() {
        return this.repo.contributors || [];
      },
    },
  };
  </script>