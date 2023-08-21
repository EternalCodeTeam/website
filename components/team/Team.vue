<template>
  <section id="team">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle :title="$t('team.text')" :description="$t('team.text2')" />

      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TeamMember
          v-for="(member, index) in teamMembers"
          :key="index"
          :member="member"
          :index="index" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import TeamMember from "~/components/team/TeamMember.vue";

export default {
  components: {
    TeamMember,
  },
  data() {
    return {
      teamMembers,
    };
  },
};

const teamMembers = [
  {
    name: "Martin Sulikowski",
    role: "Lead Team",
    avatar: "https://avatars-githubusercontent.webp.se/u/65517973",
    github: "https://github.com/vLuckyyy",
    linkedin: "https://www.linkedin.com/in/vlucky",
  },
  {
    name: "Piotr Zych",
    nick: "Piotrulla & Osnixer",
    role: "Team Manager, Meeting Leader",
    avatar: "https://avatars-githubusercontent.webp.se/u/77621271",
    github: "https://github.com/Osnixer/",
    linkedin: "https://www.linkedin.com/in/piotrulla/",
  },
  {
    name: "Norbert Dejlich",
    nick: "Rollczi",
    role: "Lead Team & Meeting Leader",
    avatar: "https://avatars-githubusercontent.webp.se/u/49173834",
    github: "https://github.com/Rollczi/",
    linkedin: "https://www.linkedin.com/in/rollczi/",
  },
  {
    name: "Krzysztof Haller",
    role: "Lead Team",
    avatar: "https://avatars-githubusercontent.webp.se/u/60399586",
    github: "https://github.com/Hyd3r1/",
    linkedin: "https://www.linkedin.com/in/khallercom/",
  },
  {
    name: "Jakub",
    nick: "Jakubk15",
    role: "Discord Moderator & Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/77227023",
    github: "https://github.com/Jakubk15",
  },
  {
    name: "Karol Dronia",
    nick: "eripe14",
    role: "Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/80169196",
    github: "https://github.com/eripe14",
  },
  {
    name: "Kamil Jęczeń",
    nick: "Kamicjusz",
    role: "Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/66566758",
    github: "https://github.com/Kamicjusz",
  },
  {
    name: "Michał Wojtas",
    nick: "EMMA & CitrlaFlo",
    role: "Student & Team Analyst",
    avatar: "https://avatars-githubusercontent.webp.se/u/80779749",
    github: "https://github.com/Embrejs",
  },
  {
    name: "Igor",
    nick: "igoyek",
    role: "Student",
    avatar: "https://avatars-githubusercontent.webp.se/u/65646893",
    github: "https://github.com/igoyek",
  },
  {
    name: "DMK",
    role: "Student",
    avatar: "https://avatars-githubusercontent.webp.se/u/81445555",
    github: "https://github.com/imDMK",
    linkedin: "https://www.linkedin.com/in/dominik-s-7b8a91286",
  },
];
</script>
