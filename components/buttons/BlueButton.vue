<template>
  <NuxtLink
    :to="to"
    :aria-label="name + ' button'"
    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
    {{ name }}
  </NuxtLink>
</template>

<script lang="ts">
export default {
  name: "BlueButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
};
</script>