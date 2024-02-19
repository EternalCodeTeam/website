<template>
  <section id="team">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle :title="$t('team.text')" :description="$t('team.text2')" />

      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TeamMember
          v-for="(member, index) in fetchResult.data"
          :key="member.id"
          :member="member.attributes"
          :index="index" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fetchResult = ref([]);

onMounted(async () => {
  fetchResult.value = await $fetch("/api/members");
});
</script>