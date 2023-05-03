<script setup>
const story = await useAsyncStoryblok('test', { version: 'draft' })
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>