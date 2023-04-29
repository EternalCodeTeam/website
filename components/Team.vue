<template>
  <section>
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
        <h2
          class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our Team
        </h2>
        <p
          class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          EternalCodeTeam is a group of passionate and innovative programmers
          who, thanks to their commitment, creativity and determination, devote
          themselves to creating unique open source projects.
        </p>
      </div>

      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="max-w-screen-sm mx-auto mb-8 lg:mb-16 flex-1"
          data-aos="fade-up"
          data-aos-duration="500">
          <div
            class="items-center bg-gray-50 dark:bg-[#161b22] rounded-[12px] shadow sm:flex dark:border-gray-700 flex-1">
            <a :href="member.github">
              <NuxtImg
                :alt="member.name"
                :src="member.avatar"
                class="sm:rounded-none sm:rounded-l-lg rounded-lg"
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
              <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                {{ member.bio }}
              </p>
              <ul class="flex space-x-4 sm:mt-0">
                <li v-if="member.github">
                  <a
                    :href="member.github"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500">
                    <font-awesome-icon :icon="['fab', 'github']" />
                  </a>
                </li>
                <li v-if="member.linkedin">
                  <a
                    :href="member.linkedin"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500">
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
