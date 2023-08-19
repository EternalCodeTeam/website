<template>
  <section id="about" class="py-14">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <div class="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
        <div class="flex-1 sm:hidden lg:block">
          <NuxtImg
            src="https://i.imgur.com/CLmOMVd.png"
            class="rounded-[12px]"
            foramt="webp"
            width="1000"
            height="500"
            sizes="100vw"
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
        </div>
      </div>
    </div>
  </section>
</template>
