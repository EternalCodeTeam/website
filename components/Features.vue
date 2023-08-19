<template>
  <section id="features">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <SectionTitle
        :description="$t('features.text')"
        :title="$t('features.title')"
        data-aos="fade-up"
        data-aos-duration="550" />

      <div
        class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 text-center md:flex-col">
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          class="flex flex-col items-center">
          <div
            class="flex justify-center items-center center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <Icon name="logos:java" size="48" />
          </div>

          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ $t("features.texts.text1.title") }}
          </h3>

          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("features.texts.text1.text") }}
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="750"
          class="flex flex-col items-center">
          <div
            class="flex justify-center items-center center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <Icon name="flat-color-icons:linux" size="48" />
          </div>
          <h3 class="mb-2 text-xl font-bold dark:text-white">
            {{ $t("features.texts.text2.title") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("features.texts.text2.text") }}
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="800"
          class="flex flex-col items-center">
          <div
            class="flex justify-center items-center center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <Icon
              name="material-symbols:tab-new-right-outline-rounded"
              class="dark:invert"
              size="48" />
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
