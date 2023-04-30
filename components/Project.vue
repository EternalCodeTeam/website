<template>
  <section id="projects">
    <div class="mx-auto max-w-screen-xl px-4 py-16 @container">
      <div class="@mt-8 space-y-8 @lg:mt-12">
        <div
          v-for="repo in filteredRepos"
          :key="repo.id"
          class="flex flex-col-reverse items-center justify-between @lg:flex-row">
          <div class="w-full @md:w-1/2 @lg:w-1/2">
            <h1
              class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight @md:text-5xl dark:text-white xl:text-6xl"
              data-aos="fade-up"
              data-aos-duration="500">
              {{ repo.name }}
            </h1>

            <p
              class="mb-6 max-w-2xl font-light text-gray-500 @md:text-lg @lg:mb-8 @lg:text-xl dark:text-gray-400"
              data-aos="fade-up"
              data-aos-duration="550">
              {{ repo.description }}
            </p>

            <div class="flex justify-center @md:flex-row @md:justify-start">
              <a :href="`https://github.com/EternalCodeTeam/${repo.name}`">
                <button
                  class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 @md:mb-0 @md:mr-2 dark:shadow-lg dark:shadow-blue-800/80"
                  data-aos="fade-up"
                  data-aos-duration="600">
                  <font-awesome-icon :icon="['fab', 'github']" />
                  Repository
                </button>
              </a>

              <button
                class="ml-2 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-yellow-500/50 @md:mb-0 @md:mr-2 dark:shadow-lg dark:shadow-yellow-500/80"
                data-aos="fade-up"
                data-aos-duration="650">
                <font-awesome-icon :icon="['fa', 'star']" />
                {{ repo.stargazers_count }} Stars
              </button>
            </div>
          </div>

          <div class="w-full overflow-hidden @md:w-1/2 @lg:w-1/2">
            <NuxtImg
              :src="getImageUrl(repo.name)"
              alt="Project image"
              class="rounded-[12px] object-cover"
              data-aos="fade-up"
              data-aos-duration="500"
              format="webp"
              width="1000"
              height="500" />
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
      const cachedData = localStorage.getItem("githubRepos");
      if (cachedData) {
        repos.value = JSON.parse(cachedData);
      }

      try {
        const response = await fetch(
          "https://api.github.com/orgs/EternalCodeTeam/repos"
        );

        const data = await response.json();
        repos.value = Array.isArray(data) ? data : [];

        localStorage.setItem("githubRepos", JSON.stringify(repos.value));
      } catch (error) {
        console.error(error);
      }

      filteredRepos.value = repos.value
        .filter((repo) => !repo.archived && repo.name !== ".github")
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
    };

    const repoImages = {
      EternalCore:
        "https://github.com/EternalCodeTeam/EternalCore/raw/master/assets/readme-banner.png",
      ChatFormatter:
        "https://github.com/EternalCodeTeam/ChatFormatter/raw/master/assets/img/chatformatter.png",
      EternalCombat:
        "https://github.com/EternalCodeTeam/EternalCombat/raw/master/assets/readme-banner.png",
    };

    const getImageUrl = (repoName) =>
      repoImages[repoName] ||
      `https://opengraph.githubassets.com/1/EternalCodeTeam/${repoName}`;

    onMounted(fetchData);

    return {
      filteredRepos,
      getImageUrl,
    };
  },
};
</script>
