<template>
  <section class="py-14">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <div class="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
        <div class="flex-1 sm:hidden lg:block">
          <NuxtImg
            src="https://www.eternalcode.pl/assets/img/header/about/eternalcore-intellij.webp"
            class="rounded-[12px]"
            alt="about me presentation"
            data-aos="fade-up"
            data-aos-duration="450" />
        </div>
        <div class="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
          <p
            class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 lg:mb-0 lg:mr-8"
            data-aos="fade-up"
            data-aos-duration="500">
            {{ $t("about.title") }}
            <Icon name="ph:terminal-fill" class="mb-2" />
          </p>
          <p
            class="font-light text-gray-500 text-xl dark:text-gray-400"
            data-aos="fade-up"
            data-aos-duration="550">
            {{ $t("about.text") }}
          </p>

          <p
            class="font-light text-gray-500 text-xl dark:text-gray-400"
            data-aos="fade-up"
            data-aos-duration="550">
            {{ $t("about.text2") }}
          </p>

          <ul class="flex gap-y-6 flex-wrap items-center justify-center">
            <li class="flex-none" data-aos="fade-up" data-aos-duration="600">
              <a href="https://github.com">
                <Icon
                  name="akar-icons:github-fill"
                  size="48"
                  class="m-4 text-black dark:text-white" />
              </a>
            </li>

            <li class="flex-none" data-aos="fade-up" data-aos-duration="650">
              <a href="https://www.jetbrains.com">
                <Icon name="logos:jetbrains" size="48" class="m-4" />
              </a>
            </li>

            <li class="flex-none" data-aos="fade-up" data-aos-duration="700">
              <a href="https://sentry.io">
                <Icon
                  name="vscode-icons:file-type-sentry"
                  size="48"
                  class="m-4" />
              </a>
            </li>

            <li class="flex-none" data-aos="fade-up" data-aos-duration="750">
              <a href="https://www.atlassian.com/software/jira">
                <Icon name="logos:jira" size="48" class="m-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
