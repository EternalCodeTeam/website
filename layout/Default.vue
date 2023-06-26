<template>
  <header>
    <Navbar />
    <Hero />
  </header>
  <SeoKit />
  <OgImageScreenshot />
  <OgImageStatic />
  <NuxtPage />
  <Footer />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { initDropdowns } from "flowbite";

import Navbar from "~/components/navbar/Navbar.vue";
import Footer from "~/components/Footer.vue";

onMounted(() => {
  initDropdowns();
});
</script>
