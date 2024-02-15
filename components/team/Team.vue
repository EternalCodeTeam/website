<template>
  <section id="team">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle :title="$t('team.text')" :description="$t('team.text2')" />

      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TeamMember
          v-for="(member, index) in teamMembers.data"
          :key="index"
          :member="member.attributes"
          :index="index" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TeamMember from "~/components/team/TeamMember.vue";

const { ETERNALCODE_STRAPI_URL } = import.meta.env;
const { ETERNALCODE_STRAPI_KEY } = import.meta.env;

const { data: teamMembers, error } = await useAsyncData("team-members", () =>
  $fetch(ETERNALCODE_STRAPI_URL + "/api/team-members", {
    headers: {
      Authorization: `Bearer ${ETERNALCODE_STRAPI_KEY}`,
    },
  }),
);

if (error.value) {
  console.error("Error while fetching team members: ", error.value);
}
</script>
