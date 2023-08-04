<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle
        title="Our Team"
        description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects." />

      <div class="mb-6 grid gap-8 @md:grid-cols-2 @lg:mb-16">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="mx-auto mb-8 max-w-screen-md flex-1 @lg:mb-16"
          data-aos="fade-up"
          data-aos-duration="450">
          <div class="flex-1 items-center rounded-[12px] @sm:flex">
            <a
              :href="member.github"
              class="aspect-w-1 aspect-h-1 container @sm:w-full @sm:max-w-[32rem]">
              <NuxtImg
                :alt="member.name"
                :src="member.avatar"
                class="object-cover rounded-full"
                format="webp"
                height="400"
                width="400" />
            </a>
            <div class="p-8">
              <h3
                class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {{ member.name }}
              </h3>
              <span class="text-gray-500 dark:text-gray-400">
                {{ member.role }}
              </span>
              <p class="mb-4 mt-3 font-light text-gray-500 dark:text-gray-400">
                {{ member.bio }}
              </p>
              <ul class="flex space-x-4 @sm:mt-0">
                <li v-if="member.github">
                  <a
                    :href="member.github"
                    aria-label="Github profile link"
                    class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white">
                    <Icon name="ph:github-logo-fill" />
                  </a>
                </li>
                <li v-if="member.linkedin">
                  <a
                    :href="member.linkedin"
                    aria-label="LinkedIn profile link"
                    class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white">
                    <Icon name="akar-icons:linkedin-fill" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/65517973?v=4",
    github: "https://github.com/vLuckyyy",
    linkedin: "https://www.linkedin.com/in/vlucky",
  },
  {
    name: "Norbert Dejlich",
    role: "Lead Team & Meeting Leader",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/49173834?v=4",
    github: "https://github.com/Rollczi/",
    linkedin: "https://www.linkedin.com/in/rollczi/",
  },
  {
    name: "Krzysztof Haller",
    role: "Lead Team",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/60399586?v=4",
    github: "https://github.com/Hyd3r1/",
    linkedin: "https://www.linkedin.com/in/khallercom/",
  },
  {
    name: "Piotr Zych",
    role: "Lead Team, Meeting Leader & Team Manager",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/77621271?v=4",
    github: "https://github.com/Osnixer/",
  },
  {
    name: "Jakub",
    role: "Discord Moderator & Team Developer",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/77227023?v=4",
    github: "https://github.com/Jakubk15",
  },
  {
    name: "Karol Dronia",
    role: "Team Developer",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/80169196?v=4",
    github: "https://github.com/eripe14",
  },
  {
    name: "Kamil Jęczeń",
    role: "Team Developer",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/66566758?v=4",
    github: "https://github.com/Kamicjusz",
  },
  {
    name: "Michał Wojtas",
    role: "Student & Team Analyst",
    bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
    avatar: "https://avatars-githubusercontent.webp.se/u/80779749?v=4",
    github: "https://github.com/Embrejs",
  },
];
</script>
