<template>
  <div
    id="terminal"
    class="hidden w-full md:mt-3 md:flex md:flex-row lg:mt-0"
    aria-hidden="true">
    <div class="w-full flex flex-col">
      <div
        class="flex border-b-2 border-rose-500 bg-[#d8dde6] dark:bg-[#4B5563] dark:border-gray-900 w-full rounded-t-lg">
        <div
          id="on-off-buttons"
          class="h-6 select-none bg-[#d8dde6] dark:bg-[#4B5563] rounded-lg">
          <div
            class="flex justify-center items-center h-full space-x-1.5 ml-2 h-6 select-none rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]"
            style="width: fit-content">
            <div class="w-[12px] h-[12px] bg-[#f9644e] rounded-full"></div>
            <div class="w-[12px] h-[12px] bg-[#ffb630] rounded-full"></div>
            <div class="w-[12px] h-[12px] bg-[#3cc548] rounded-full"></div>
          </div>
        </div>
        <div
          id="file-name"
          class="text-center mx-auto text-2xs text-gray-800 dark:text-gray-400 select-none">
          <span class="font-medium">EternalCode</span>
        </div>
      </div>
      <div id="section-left" class="flex flex-row">
        <div id="settings" class="h-full w-1/5 flex">
          <div
            id="project-settings"
            class="center flex h-full w-1/4 flex-col py-2 px-2 bg-[#cfd0d1] space-y-2 items-center dark:bg-[#374151] rounded-bl-lg">
            <span>
              <Icon
                name="octicon:git-branch"
                class="mb-[3px] dark:text-slate-500"
                s />
            </span>

            <span>
              <Icon
                name="carbon:code-hide"
                class="mb-[3px] dark:text-slate-500" />
            </span>

            <span>
              <Icon
                name="teenyicons:git-commit-outline"
                class="mb-[3px] dark:text-slate-500" />
            </span>

            <span>
              <Icon
                name="ph:github-logo-fill"
                class="mb-[4px] dark:text-slate-500" />
            </span>

            <span>
              <Icon
                name="ic:sharp-more-vert"
                class="mb-[3px] dark:text-slate-500" />
            </span>
          </div>
          <div
            id="files"
            class="h-full bg-[#d8dde6] w-3/4 pl-4 dark:bg-[#4B5563] select-none text-sm font-light text-gray-400">
            <p>▄▄▄▄▄</p>
            <p>▄▄▄▄▄▄▄▄</p>
            <p>▄▄▄▄</p>
            <p>▄▄▄▄▄▄▄</p>
            <p>▄▄▄▄▄</p>
            <p>▄▄▄▄▄▄</p>
            <p>▄▄▄▄</p>
            <p>▄▄▄▄▄▄▄</p>
            <p>▄▄▄▄</p>
            <p>▄▄▄▄▄</p>
            <p>▄▄▄▄</p>
            <p>▄▄▄</p>
          </div>
        </div>
        <div
          id="main-tab"
          class="flex h-full w-4/5 flex-col bg-[#bfbfbf] dark:bg-[#374151] rounded-br-lg">
          <div id="file-section" class="flex">
            <div
              id="file-1"
              class="flex w-1/2 select-none flex-row bg-[#bfbfbf] pl-2 dark:bg-[#374151] dark:text-gray-400 pr-4"
              style="width: fit-content">
              <Icon
                name="ic:round-folder"
                class="mr-1 place-self-center dark:text-slate-500 font" />
              <span class="font-mono">EternalCode</span>
            </div>
            <div
              id="file-2"
              class="flex h-6 select-none flex-row border-b-2 border-rose-500 bg-[#e6e7e8] pl-2 dark:border-gray-900 dark:bg-[#1F2A37] dark:text-gray-400 pr-4"
              style="width: fit-content">
              <Icon
                name="ph:terminal-fill"
                class="left-0 w-5 place-self-center dark:text-slate-500"
                size="85%" />
              <span class="ml-1 mr-auto font-mono">Terminal</span>
            </div>
          </div>
          <div
            id="file-2-code"
            class="min-h-80 inset-x-0 h-80 bg-[#e6e7e8] pl-2 dark:bg-[#1F2A37]">
            <span
              v-for="(line, index) in lines"
              :key="index"
              :class="[
                'line',
                'inset-x-0 bottom-0',
                'text-sm',
                'font-mono',
                'leading-6',
                'before:opacity-0',
                'transition',
                'duration-500 ease-in-out',
                'opacity-0',
                { 'opacity-100': index <= currentIndex },
                line.formatting,
              ]">
              <NuxtLink
                v-if="line.special && line.locale !== false"
                :to="localePath(line.url)"
                >{{ line.line }}</NuxtLink
              >
              <a v-else-if="line.special" :href="line.url" target="_blank">{{
                line.line
              }}</a>
              <span v-else>{{ line.line }}</span>
              <br v-if="line.endLine" />
            </span>
          </div>
          <div
            id="file-settings"
            class="m-0 h-6 w-full rounded-br-lg bg-[#bdbdbd] dark:bg-[#374151]"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";

const linesAndFormatting = [
  {
    line: "> eternalcode --help",
    formatting: "dark:text-gray-100 text-black-300 text-sm",
    endLine: true,
  },
  {
    line: "",
    endLine: true,
  },
  {
    line: "Help requested!",
    formatting: "text-slate-600 text-sm",
    endLine: true,
  },
  {
    line: "Try finding answers in our ",
    formatting: "text-slate-600 text-sm",
    endLine: false,
  },
  {
    line: "documentation!",
    formatting: "text-blue-500 text-sm",
    special: true,
    locale: false,
    url: "https://docs.eternalcode.pl/",
    endLine: true,
  },
  {
    line: "",
    endLine: true,
  },
  {
    line: "> eternalcode --tree",
    formatting: "dark:text-gray-100 text-black-300 text-sm",
    endLine: true,
  },
  {
    line: "",
    endLine: true,
  },
  {
    line: "├── 📁 ",
    formatting: "text-slate-600 text-sm",
    endLine: false,
  },
  {
    line: "Home",
    formatting: "text-blue-500 text-sm",
    special: true,
    locale: true,
    url: "/",
    endLine: true,
  },
  {
    line: "│   ├── 📁 ",
    formatting: "text-slate-600 text-sm",
    endLine: false,
  },
  {
    line: "Team",
    formatting: "text-blue-500 text-sm",
    special: true,
    locale: true,
    url: "/team",
    endLine: true,
  },
  {
    line: "│   ├── 📁 ",
    formatting: "text-slate-600 text-sm",
    endLine: false,
  },
  {
    line: "Projects",
    formatting: "text-blue-500 text-sm",
    special: true,
    locale: true,
    url: "/projects",
    endLine: true,
  },
  {
    line: "├── 📁 FAQ",
    formatting: "text-slate-600 text-sm",
    endLine: true,
  },
  {
    line: "│   │   ├── 📁 ",
    formatting: "text-slate-600 text-sm",
    endLine: false,
  },
  {
    line: "Docs",
    formatting: "text-blue-500 text-sm",
    special: true,
    locale: false,
    url: "https://docs.eternalcode.pl/",
    endLine: true,
  },
];

export default {
  name: "Terminal",
  setup() {
    const lines = ref(linesAndFormatting);
    const currentIndex = ref(0);
    const delay = 300; // Delay in milliseconds

    function runTerminal() {
      if (
        currentIndex.value < lines.value.length &&
        lines.value[currentIndex.value].endLine
      ) {
        setTimeout(() => {
          currentIndex.value++;
          runTerminal();
        }, delay);
      } else if (currentIndex.value < lines.value.length) {
        currentIndex.value++;
        runTerminal();
      }
    }

    onMounted(() => {
      runTerminal();
    });

    return {
      lines,
      currentIndex,
    };
  },
};
</script>
