<template>
  <div class="mx-auto mb-8 lg:mb-16">
    <div class="flex flex-col lg:flex-row justify-between items-center">
      <h2
        class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 lg:mb-0 lg:mr-8">
        {{ title }}
      </h2>
      <p
        class="font-light text-gray-500 text-xl dark:text-gray-400 text-center lg:text-right break-words">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionTitle",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
