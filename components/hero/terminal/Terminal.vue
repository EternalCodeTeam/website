<template>
  <div id="terminal" class="h-72 w-auto md:flex md:flex-row rounded-lg hidden md:mt-3 lg:mt-0" aria-hidden="true" >
    <div id="settings" class="h-full w-1/5">
      <div id="on-off-buttons" class="h-6 rounded-tl-lg select-none dark:bg-[#4B5563] bg-[#d8dde6] ">
        <div class="w-1/3 m-0 flex flex-row pt-1 pl-1 ">

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="red">
              <circle cx="50" cy="50" r="35" fill="currentcolor"/>
            </g>
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="orange">
              <circle cx="50" cy="50" r="35" fill="currentcolor"/>
            </g>
          </svg>

          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g color="green">
              <circle cx="50" cy="50" r="35" fill="currentcolor"/>
            </g>
          </svg>
        </div>
      </div>
      <div id="project-settings" class="h-6 flex center flex-row dark:bg-[#374151] bg-[#cfd0d1]">
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <NuxtImg
              class="h-4 w-4 m-1 select-none"
              format="svg"
              alt="branch icon"
              aria-label="branch icon"
              src="/assets/img/hero/branch.svg"
              width="16"
              height="16" />
        </a>
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <NuxtImg
              class="h-4 w-4 m-1 select-none"
              format="svg"
              alt="project icon"
              aria-label="project icon"
              src="/assets/img/hero/project.svg"
              width="16"
              height="16" />
        </a>
        <a href="https://github.com/EternalCodeTeam/" target="_blank">
          <NuxtImg
              class="h-4 w-4 m-1 select-none"
              format="svg"
              alt="github icon"
              aria-label="github icon"
              src="/assets/img/hero/github.svg"
              width="16"
              height="16" />
        </a>
      </div>
      <div id="files" class="h-72 dark:bg-[#4B5563] bg-[#d8dde6] p-2 rounded-bl-lg">

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
        <div id="file-1" class="h- w-1/2 dark:bg-[#374151] bg-[#bfbfbf] flex flex-row dark:text-gray-400 pl-2 select-none ">
          <NuxtImg
              class="h-4 w-4 m-1 select-none"
              format="svg"
              alt="project icon"
              aria-label="project icon"
              src="/assets/img/hero/project.svg"
              width="16"
              height="16" />
          <label>EternalCodeWWW</label>
        </div>
        <div id="file-2" class="h-6  w-1/2 dark:bg-[#1F2A37] bg-[#e6e7e8] flex flex-row rounded-tr-lg dark:text-gray-400 pl-2 select-none border-b-2 border-rose-500 dark:border-gray-900">
          <NuxtImg
              class="h-4 w-4 m-1 select-none"
              format="svg"
              alt="terminal icon"
              aria-label="terminal icon"
              src="/assets/img/hero/terminal.svg"
              width="16"
              height="16" />
          <label>Terminal</label>
        </div>
      </div>
      <div id="file-2-code " class=" h-72 sticky inset-x-0 bottom-0 dark:bg-[#1F2A37] bg-[#e6e7e8] pl-2 ">
        <label
            v-for="(line, index) in lines"
            v-show="index <= currentIndex"
            :key="index"
            :class="['line', 'inset-x-0 bottom-0', 'text-sm',  'font-mono', 'leading-6', line.formatting]"
        >
          <a v-if="line.special" href="https://eternalcode.pl/" target="_blank">{{ line.line }}</a>
          <label v-else>
            {{ line.line }}
          </label>
          <br v-if="line.endLine">
        </label>
      </div>
      <div id="file-settings" class="w-auto h-6 rounded-br-lg dark:bg-[#374151] bg-[#bdbdbd]"></div>
    </div>
  </div>
</template>

<script>
import linesAndFormatting from "~/components/hero/terminal/text";
import {ref, onMounted} from "vue";

export default {
  name: "Terminal",
  setup() {
    const lines = linesAndFormatting;
    const currentIndex = ref(0);
    const delay = 300; // Delay in milliseconds

    function displayLines() {
      if (currentIndex.value < linesAndFormatting.length) {
        setTimeout(() => {
          currentIndex.value++;
          displayLines();
        }, delay);
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

</style>