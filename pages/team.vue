<template>
  <LazyTeam />
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const route = useRoute();

useSeoMeta({
  ogImage: "/assets/img/logo-white-background.webp",
  twitterTitle: "EternalCode.pl",
  twitterDescription: "We are a team creating open source projects!",
  twitterImage: "/assets/img/logo-white-background.webp",
  twitterCard: "summary",
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
