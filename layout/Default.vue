<template>
  <Navbar/>
  <SeoKit/>
  <OgImageScreenshot/>
  <OgImageStatic/>
  <NuxtPage/>
  <Footer/>
</template>

<script lang="ts" setup>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>
