<template>
  <section id="projects">
    <div class="mx-auto max-w-screen-xl px-4 py-16">
      <SectionTitle
        description="Discover our open source projects!"
        title="Our Projects" />
      <div class="mt-8 space-y-8 lg:mt-12 lg:alternate">
        <div
          v-for="repo in filteredRepos"
          :key="repo.id"
          class="flex flex-col-reverse items-center justify-between lg:flex-row gap-12">
          <div class="w-full md:w-1/2 lg:w-1/2">
            <h1
              class="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
              data-aos="fade-up"
              data-aos-duration="500">
              {{ repo.name }}
            </h1>
            <p
              class="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
              data-aos="fade-up"
              data-aos-duration="550">
              {{ repo.description }}
            </p>
            <div class="flex">
              <a :href="`https://github.com/EternalCodeTeam/${repo.name}`">
                <button
                  aria-label="Go to repository"
                  class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 md:mb-0 md:mr-2"
                  data-aos="fade-up"
                  data-aos-duration="600">
                  <Icon name="ph:github-logo-fill" class="mb-[0.5px]" />
                  Repository
                </button>
              </a>
              <a
                :href="`https://github.com/EternalCodeTeam/${repo.name}/stargazers`">
                <button
                  aria-label="Number of stars"
                  class="ml-2 cursor-pointer rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-500/80 md:mb-0 md:mr-2"
                  data-aos="fade-up"
                  data-aos-duration="650">
                  <Icon name="ic:round-star" size="20" class="mb-[0.5px]" />
                  {{ repo.stargazers_count }} Stars
                </button>
              </a>

              <div
                class="flex -space-x-4"
                data-aos="fade-up"
                data-aos-duration="700">
                <a
                  v-for="(contributor, index) in (
                    repo.contributors || []
                  ).slice(0, 5)"
                  :key="index"
                  :href="`https://github.com/${contributor.login}`"
                  target="_blank"
                  class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 mx-auto flex items-center justify-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-600 dark:border-gray-800"
                  :title="contributor.login">
                  <NuxtImg
                    :alt="`${contributor.login} avatar`"
                    :src="contributor.avatar_url"
                    format="webp"
                    class="w-full h-full rounded-full object-cover" />
                </a>

                <a
                  v-if="repo.contributors && repo.contributors.length > 5"
                  :href="`https://github.com/EternalCodeTeam/${repo.name}/graphs/contributors`"
                  target="_blank"
                  class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 mx-auto flex items-center justify-center text-xs font-medium text-white bg-gray-700 hover:bg-gray-600 dark:border-gray-800">
                  +{{ repo.contributors.length - 5 }}
                </a>
              </div>
            </div>
          </div>
          <div class="w-full overflow-hidden md:w-1/2 lg:w-1/2">
            <NuxtImg
              :alt="`${repo.name} project image`"
              :src="getImageUrl(repo.name)"
              class="rounded-[12px] object-cover"
              data-aos="fade-up"
              data-aos-duration="500"
              format="webp"
              height="500"
              width="1000" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    const filteredRepos = ref([]);

    const fetchData = async () => {
      const cachedData = localStorage.getItem("githubRepos");
      if (cachedData) {
        filteredRepos.value = JSON.parse(cachedData);
      }

      filteredRepos.value = filteredRepos.value.map((repo) => ({
        ...repo,
        contributors: [],
      }));

      try {
        const response = await fetch(
          "https://api.github.com/orgs/EternalCodeTeam/repos"
        );
        const data = await response.json();
        filteredRepos.value = Array.isArray(data) ? data : [];
        localStorage.setItem(
          "githubRepos",
          JSON.stringify(filteredRepos.value)
        );

        for (const repo of filteredRepos.value) {
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/EternalCodeTeam/${repo.name}/contributors`
          );
          const contributorsData = await contributorsResponse.json();
          repo.contributors = contributorsData
            .filter((contributor) => !contributor.login.includes("bot"))
            .map((contributor) => ({
              login: contributor.login,
              avatar_url: contributor.avatar_url,
            }));
        }
      } catch (error) {
        console.error(error);
      }

      filteredRepos.value = filteredRepos.value
        .filter((repo) => !repo.archived && repo.name !== ".github")
        .sort((a, b) => b.stargazers_count - a.stargazers_count);
    };

    const getImageUrl = (repoName) =>
      `https://opengraph.githubassets.com/1/EternalCodeTeam/${repoName}`;

    onMounted(fetchData);

    return {
      filteredRepos,
      getImageUrl,
    };
  },
};
</script>

<style scoped>
@tailwind utilities;

@layer utilities {
  .alternate div:nth-child(even) {
    @apply flex-row-reverse;
  }
}
</style>
