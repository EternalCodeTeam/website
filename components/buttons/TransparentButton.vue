<template>
  <NuxtLink
    :to="localePath(to)"
    :aria-label="name + ' button'"
    class="text-black dark:text-white font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">
    {{ name }}
  </NuxtLink>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  components: { FontAwesomeIcon },
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
