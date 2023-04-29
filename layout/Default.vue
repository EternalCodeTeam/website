<template>
  <Navbar />
  <SeoKit />
  <OgImageScreenshot />
  <OgImageStatic />
  <NuxtPage />
  <Footer />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

onMounted(() => {
  initFlowbite();
});
</script>
