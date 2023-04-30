<template>
  <div>
    <button class="mr-2 h-6 w-6 overflow-hidden" @click="setLanguage('pl')">
      <NuxtImg class="rounded-[15%]" src="/assets/img/lang/pl.svg" />
    </button>
    <button class="h-6 w-6 overflow-hidden" @click="setLanguage('en')">
      <NuxtImg class="rounded-[15%]" src="/assets/img/lang/en.svg" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    setLanguage(language) {
      this.$i18n.locale = language;
    },
  },
};
</script>