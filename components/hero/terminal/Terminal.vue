<template>
  <div
      id="terminal"
      class="h-72 w-auto md:flex md:flex-row rounded-lg hidden md:mt-3 lg:mt-0"
      aria-hidden="true">
    <div id="settings" class="h-full w-1/5">
      <div
          id="on-off-buttons"
          class="h-6 rounded-tl-lg select-none dark:bg-[#4B5563] bg-[#d8dde6]">
        <div class="group/item w-2/3  flex flex-row pt-0.5 pl-1 space-x-1 md:h-full">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="red" class="flex items-center justify-center">
              <circle cx="50" cy="50" r="35" fill="currentcolor "/>
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
                    class="group/edit group-hover/item:visible invisible absolute text-xl" style="font-size: 400%">x
              </text>
            </g>
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="orange" class="flex items-center justify-center">
              <circle cx="50" cy="50" r="35" fill="currentcolor"/>
              <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
                    class="group/edit group-hover/item:visible invisible absolute text-xl" style="font-size: 500%">-
              </text>
            </g>
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="green" class="flex items-center justify-center">
              <circle cx="50" cy="50" r="35" fill="currentcolor"/>
              <text x="69%" y="10%" dominant-baseline="middle" text-anchor="middle"
                    class="group/edit group-hover/item:visible invisible absolute text-xl rotate-45" style="font-size: 400%">🡙
              </text>
            </g>
          </svg>

        </div>
      </div>
      <div
          id="project-settings"
          class="h-6 flex center flex-row dark:bg-[#374151] bg-[#cfd0d1] justify-between px-3">
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <Icon name="octicon:git-branch" class="mb-[3px] dark:text-slate-500" size="80%" />
        </a>
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <Icon name="fluent:projection-screen-16-regular" class="mb-[3px] dark:text-slate-500" />
        </a>
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <Icon name="ph:github-logo-fill" class="mb-[4px] pl-1 dark:text-slate-500" size="85%"/>
        </a>
      </div>
      <div
          id="files"
          class="h-80 dark:bg-[#4B5563] bg-[#d8dde6] p-2 rounded-bl-lg">
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄▄</p>
        <p class="text-sm font-light text-gray-400 select-none">▄▄▄</p>
      </div>
    </div>
    <div id="main-tab" class="h-60 rounded-tr-lg w-4/5">
      <div id="file-section" class="flex">
        <div
            id="file-1"
            class="font-Monaco w-1/2 dark:bg-[#374151] bg-[#bfbfbf] flex flex-row dark:text-gray-400 pl-2 select-none">
          <Icon name="ic:round-folder" class="mr-1 place-self-center dark:text-slate-500" />
          <span>EternalCodeWWW</span>
        </div>
        <div
            id="file-2"
            class="font-Monaco h-6 w-1/2 dark:bg-[#1F2A37] bg-[#e6e7e8] flex flex-row rounded-tr-lg dark:text-gray-400 pl-2 select-none border-b-2 border-rose-500 dark:border-gray-900 font-mono">
          <Icon name="ph:terminal-fill" class="place-self-center left-0 dark:text-slate-500 w-5 " size="85%"/>
          <span class="ml-1 mr-auto">Terminal</span>
        </div>
      </div>
      <div
          id="file-2-code "
          class="h-80 overflow-auto inset-x-0 bottom-0 dark:bg-[#1F2A37] bg-[#e6e7e8] pl-2">
        <span
            v-for="(line, index) in lines"
            :key="index"
            :class="[
            'line',
            'inset-x-0 bottom-0',
            'text-sm',
            'font-mono',
            'leading-6',
            { 'active': index <= currentIndex },
            line.formatting,
          ]">
          <a
              v-if="line.special"
              href="https://eternalcode.pl/"
              target="_blank"
          >{{ line.line }}
          </a>
          <span v-else>
            {{ line.line }}
          </span>
          <br v-if="line.endLine"/>
        </span>
      </div>
      <div
          id="file-settings"
          class="w-auto h-6 rounded-br-lg dark:bg-[#374151] bg-[#bdbdbd]"></div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
import linesAndFormatting from "~/components/hero/terminal/text";

export default {
  name: "Terminal",
  setup() {
    const lines = linesAndFormatting;
    const currentIndex = ref(0);
    const delay = 300; // Delay in milliseconds

    function displayLines() {
      if (currentIndex.value < linesAndFormatting.length) {
        if (linesAndFormatting[currentIndex.value].endLine) {
          setTimeout(() => {
            currentIndex.value++;
            displayLines();
          }, delay);
        } else {
          currentIndex.value++;
          displayLines();
        }
      }
    }

    onMounted(() => {
      setTimeout(() => {
        displayLines();
      }, delay);
    });
    return {
      lines,
      currentIndex,
    };
  },
};
</script>

<style scoped>

.line {
  opacity: 0;
}

.line.active {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.font-Monaco {
  font-family: Monaco, monospace;
}

</style>
