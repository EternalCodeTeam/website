<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div class="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
        <h2
          class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Our Team
        </h2>
        <p
          class="font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
          EternalCodeTeam is a group of passionate and innovative programmers
          who, thanks to their commitment, creativity and determination, devote
          themselves to creating unique open source projects.
        </p>
      </div>

      <div class="mb-6 grid gap-8 md:grid-cols-2 lg:mb-16">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="mx-auto mb-8 max-w-screen-sm flex-1 lg:mb-16"
          data-aos="fade-up"
          data-aos-duration="500">
          <div
            class="flex-1 items-center rounded-[12px] bg-gray-50 shadow dark:border-gray-700 dark:bg-[#161b22] sm:flex">
            <a :href="member.github">
              <NuxtImg
                :alt="member.name"
                :src="member.avatar"
                class="rounded-lg sm:rounded-none sm:rounded-l-lg"
                format="webp"
                height="400"
                sizes="sm:100vw md:50vw lg:400px"
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
              <ul class="flex space-x-4 sm:mt-0">
                <li v-if="member.github">
                  <a
                    :href="member.github"
                    class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white">
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>
                </li>
                <li v-if="member.linkedin">
                  <a
                    :href="member.linkedin"
                    class="text-gray-500 transition duration-500 hover:text-gray-900 dark:hover:text-white">
                    <font-awesome-icon :icon="['fab', 'linkedin']" />
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      teamMembers: [
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
          role: "Lead Team",
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
          role: "Lead Team",
          bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
          avatar: "https://avatars-githubusercontent.webp.se/u/77621271?v=4",
          github: "https://github.com/Osnixer/",
        },
        {
          name: "Jakub",
          role: "Moderator",
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
          role: "Student",
          bio: "Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.",
          avatar: "https://avatars.githubusercontent.com/u/80779749?v=4",
          github: "https://github.com/Embrejs",
        },
      ],
    };
  },
};
</script>
