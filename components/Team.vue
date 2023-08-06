<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle
        title="Our Team"
        description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects." />

      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="text-center text-gray-500 dark:text-gray-400"
          data-aos="fade-up"
          :data-aos-duration="`${index * 100 + 300}`">
          <NuxtImg
            class="mx-auto mb-4 w-36 h-36 rounded-full"
            :src="member.avatar"
            :alt="`${member.name} Avatar`" />

          <h3
            class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>{{ member.name }}</p>
          </h3>

          <p>{{ member.role }}</p>

          <ul class="flex justify-center mt-4 space-x-4">
            <li v-if="member.github">
              <a
                :href="member.github"
                class="transition duration-500 hover:text-gray-900 dark:hover:text-white">
                <Icon name="ph:github-logo-fill" />
              </a>
            </li>

            <li v-if="member.linkedin">
              <a
                :href="member.linkedin"
                class="transition duration-500 hover:text-gray-900 dark:hover:text-white">
                <Icon name="akar-icons:linkedin-fill" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
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
    avatar: "https://avatars-githubusercontent.webp.se/u/65517973?v=4",
    github: "https://github.com/vLuckyyy",
    linkedin: "https://www.linkedin.com/in/vlucky",
  },
  {
    name: "Norbert Dejlich",
    role: "Lead Team & Meeting Leader",
    avatar: "https://avatars-githubusercontent.webp.se/u/49173834?v=4",
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
    name: "Piotr Zych",
    role: "Lead Team, Meeting Leader",
    avatar: "https://avatars-githubusercontent.webp.se/u/77621271?v=4",
    github: "https://github.com/Osnixer/",
  },
  {
    name: "Jakub",
    role: "Discord Moderator & Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/77227023?v=4",
    github: "https://github.com/Jakubk15",
  },
  {
    name: "Karol Dronia",
    role: "Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/80169196?v=4",
    github: "https://github.com/eripe14",
  },
  {
    name: "Kamil Jęczeń",
    role: "Team Developer",
    avatar: "https://avatars-githubusercontent.webp.se/u/66566758?v=4",
    github: "https://github.com/Kamicjusz",
  },
  {
    name: "Michał Wojtas",
    role: "Student & Team Analyst",
    avatar: "https://avatars-githubusercontent.webp.se/u/80779749?v=4",
    github: "https://github.com/Embrejs",
  },
  {
    name: "Igor",
    role: "Student",
    avatar: "https://avatars-githubusercontent.webp.se/u/65646893?v=4",
    github: "https://github.com/igoyek",
  },
];
</script>
