<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <SectionTitle
        :description="$t('features.text')"
        :title="$t('features.title')"
        data-aos="fade-up"
        data-aos-duration="550"
      />

      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        <div data-aos="fade-up" data-aos-duration="600">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <font-awesome-icon
              class="dark:invert"
              :icon="['fab', 'java']"
              size="2xl" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ $t("features.texts.text1.title") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("features.texts.text1.text") }}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="650">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <font-awesome-icon
              class="dark:invert"
              :icon="['fab', 'linux']"
              size="2xl" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ $t("features.texts.text2.title") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("features.texts.text2.text") }}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="700">
          <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <font-awesome-icon
              class="dark:invert"
              :icon="['fas', 'question']"
              size="2xl" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ $t("features.texts.text3.title") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("features.texts.text3.text") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BlueButton from "~/components/buttons/BlueButton.vue";
import SectionTitle from "~/components/section/SectionTitle.vue";

export default {
  components: {
      SectionTitle,
    BlueButton,
    FontAwesomeIcon,
  },
};
</script>
