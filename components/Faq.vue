<template>
  <section id="faq" aria-label="Frequently Asked Questions">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <SectionTitle
        :title="$t('faq.title')"
        :description="$t('faq.text')"
        data-aos="fade-up"
        data-aos-duration="750" />

      <div class="grid pt-8 text-left md:grid-cols-2 md:gap-16">
        <div class="mb-10" data-aos="fade-up" data-aos-duration="800">
          <h3
            class="mb-4 flex text-lg font-medium text-gray-900 dark:text-white"
            role="heading"
            aria-level="3">
            {{ $t("faq.answers.question1.question") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("faq.answers.question1.answer") }}
          </p>
        </div>

        <div class="mb-10" data-aos="fade-up" data-aos-duration="850">
          <h3
            class="mb-4 flex text-lg font-medium text-gray-900 dark:text-white"
            role="heading"
            aria-level="3">
            {{ $t("faq.answers.question2.question") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("faq.answers.question2.answer") }}
          </p>
        </div>

        <div class="mb-10" data-aos="fade-up" data-aos-duration="900">
          <h3
            class="mb-4 flex text-lg font-medium text-gray-900 dark:text-white"
            role="heading"
            aria-level="3">
            {{ $t("faq.answers.question3.question") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("faq.answers.question3.answer") }}
          </p>
        </div>

        <div class="mb-10" data-aos="fade-up" data-aos-duration="950">
          <h3
            class="mb-4 flex text-lg font-medium text-gray-900 dark:text-white"
            role="heading"
            aria-level="3">
            {{ $t("faq.answers.question4.question") }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ $t("faq.answers.question4.answer") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
