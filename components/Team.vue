<template>
  <section class="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
    <div class="max-w-screen-sm mx-auto mb-8 lg:mb-16 text-center">
      <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Our Team
      </h2>
      <p class="font-light text-gray-500 dark:text-gray-400 lg:mb-16 sm:text-xl">
        Explore the whole collection of open-source web components and elements built with the utility classes from
        Tailwind
      </p>
    </div>

    <div class="max-w-screen-sm mx-auto mb-8 lg:mb-16 justify-items-center mouse-cursor-gradient-tracking">
      <div class="items-center bg-gray-50 dark:bg-[#161b22] rounded-lg shadow sm:flex dark:border-gray-700">
        <a href="#">
          <NuxtImg
              alt="Bonnie Green"
              class="w-full sm:rounded-none sm:rounded-l-lg rounded-lg"
              format="webp"
              src="https://avatars.githubusercontent.com/u/65517973?v=4"
              width="200"
              height="200"
          />
        </a>
        <div class="p-8">
          <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">Davis Schiller</a>
          </h3>
          <span class="text-gray-500 dark:text-gray-400">Team</span>
          <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
            Consetetur feugait semper pellentesque nihil intellegebat interdum ultricies noster.
          </p>
          <ul class="flex space-x-4 sm:mt-0">
            <li>
              <a class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-500" href="#">
                <font-awesome-icon :icon="['fa', 'github']"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  components: { FontAwesomeIcon },
});

</script>
