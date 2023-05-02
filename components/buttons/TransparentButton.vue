<template>
  <NuxtLink
    :to="to"
    :aria-label="name + ' button'"
    class="dark:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
    {{ name }}
  </NuxtLink>
</template>

<script lang="ts">
export default {
  name: "TransparentButton",
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
