<template>
  <div class="mr-1">
    <button
      class="transition-all duration-500 mr-2 h-6 w-6 overflow-hidden hover:grayscale-[100]"
      @click="setLanguage('pl')">
      <NuxtImg
        class="rounded-[15%]"
        src="/assets/img/lang/pl.svg"
        alt="Polish language"
        aria-label="Polish language"
        width="24"
        height="24" />
    </button>
    <button
      class="transition-all duration-500 h-6 w-6 overflow-hidden hover:grayscale-[100]"
      @click="setLanguage('en')">
      <NuxtImg
        class="rounded-[15%]"
        src="/assets/img/lang/en.svg"
        alt="English language"
        aria-label="English language"
        width="24"
        height="24" />
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
