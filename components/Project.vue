<template>
  <section id="projects">
    <div class="@container max-w-screen-xl py-16 px-4 mx-auto">
      <div class="@mt-8 space-y-8 @lg:mt-12">
        <div
          v-for="repo in filteredRepos"
          :key="repo.id"
          class="flex flex-col-reverse items-center justify-between @lg:flex-row">
          <div class="w-full @md:w-1/2 @lg:w-1/2">
            <h1
              class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none @md:text-5xl xl:text-6xl dark:text-white"
              data-aos="fade-up"
              data-aos-duration="500">
              {{ repo.name }}
            </h1>

            <p
              class="max-w-2xl mb-6 font-light text-gray-500 @lg:mb-8 @md:text-lg @lg:text-xl dark:text-gray-400"
              data-aos="fade-up"
              data-aos-duration="550">
              {{ repo.description }}
            </p>

            <div class="flex @md:flex-row justify-center @md:justify-start">
              <a :href="`https://github.com/EternalCodeTeam/${repo.name}`">
                <button
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center @md:mb-0 @md:mr-2"
                  data-aos="fade-up"
                  data-aos-duration="600">
                  <font-awesome-icon :icon="['fab', 'github']" />
                  Repository
                </button>
              </a>

              <button
                class="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 @md:mb-0 @md:mr-2"
                data-aos="fade-up"
                data-aos-duration="650">
                <font-awesome-icon :icon="['fa', 'star']" />
                {{ repo.stargazers_count }} Stars
              </button>
            </div>
          </div>

          <div class="w-full @md:w-1/2 @lg:w-1/2">
            <NuxtImg
              :src="`https://d-art.ppstatic.pl/kadry/k/r/1/aa/9c/5608ac1621d7a_o_large.jpg`"
              alt="`{{ repo.name }}` Project image"
              class="object-cover w-full h-64 rounded-[12px] @md:h-96"
              data-aos="fade-up"
              data-aos-duration="500" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: { FontAwesomeIcon },
  setup() {
    const repos = ref([]);
    const filteredRepos = ref([]);

    const fetchData = async () => {
      const cachedData = localStorage.getItem("repos");
      if (cachedData) {
        repos.value = JSON.parse(cachedData);
      } else {
        const response = await fetch(
          "https://api.github.com/orgs/EternalCodeTeam/repos"
        );
        repos.value = await response.json();
        localStorage.setItem("repos", JSON.stringify(repos.value));
      }
      filteredRepos.value = repos.value
        .filter((repo) => !repo.archived && repo.name !== ".github")
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
    };

    onMounted(() => {
      fetchData();
    });

    return {
      filteredRepos,
    };
  },
};
</script>
