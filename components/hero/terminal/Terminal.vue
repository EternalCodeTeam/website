<template>

    <div class="w-auto h-auto transition transform duration-300 ease-in-out"  ref="perspective" @mousemove="onMouseMove" @mouseleave="onMouseLeave" style="transform-style: preserve-3d">
      <div
          id="terminal"
          class="hidden w-auto rounded-lg md:mt-3 md:flex md:flex-row lg:mt-0 "
          aria-hidden="true">
        <div id="settings" class="h-full w-1/5">
          <div
              id="on-off-buttons"
              class="h-6 select-none rounded-tl-lg bg-[#d8dde6] dark:bg-[#4B5563]">
            <div
                class="group/item flex w-2/3 flex-row space-x-1 pl-1 pt-0.5 md:h-full">

              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g color="red" class="flex items-center justify-center">
                  <circle cx="50" cy="50" r="35" fill="currentcolor "/>
                  <text
                      x="50%"
                      y="55%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      class="group/edit invisible absolute text-xl group-hover/item:visible"
                      style="font-size: 400%">
                    x
                  </text>
                </g>
              </svg>

              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g color="orange" class="flex items-center justify-center">
                  <circle cx="50" cy="50" r="35" fill="currentcolor"/>
                  <text
                      x="50%"
                      y="55%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      class="group/edit invisible absolute text-xl group-hover/item:visible"
                      style="font-size: 500%">
                    -
                  </text>
                </g>
              </svg>

              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g color="green" class="flex items-center justify-center">
                  <circle cx="50" cy="50" r="35" fill="currentcolor"/>
                  <text
                      x="69%"
                      y="10%"
                      dominant-baseline="middle"
                      text-anchor="middle"
                      class="group/edit invisible absolute rotate-45 text-xl group-hover/item:visible"
                      style="font-size: 400%">
                    🡙
                  </text>
                </g>
              </svg>
            </div>
          </div>
          <div
              id="project-settings"
              class="center flex h-6 flex-row justify-between bg-[#cfd0d1] px-3 dark:bg-[#374151]">
            <a href="https://github.com/EternalCodeTeam/" target="_blank">
              <Icon
                  name="octicon:git-branch"
                  class="mb-[3px] dark:text-slate-500"
                  size="80%"/>
            </a>
            <a href="https://github.com/EternalCodeTeam/" target="_blank">
              <Icon
                  name="fluent:projection-screen-16-regular"
                  class="mb-[3px] dark:text-slate-500"/>
            </a>
            <a href="https://github.com/EternalCodeTeam/" target="_blank">
              <Icon name="ph:github-logo-fill" class="mb-[4px] pl-1 dark:text-slate-500" size="85%"/>
            </a>
          </div>
          <div
              id="files"
              class="h-80 rounded-bl-lg bg-[#d8dde6] p-2 dark:bg-[#4B5563]">
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄▄</p>
            <p class="select-none text-sm font-light text-gray-400">▄▄▄</p>
          </div>
        </div>
        <div id="main-tab" class="flex h-full w-4/5 flex-col rounded-tr-lg">
          <div id="file-section" class="flex">
            <div
                id="file-1"
                class="flex w-1/2 select-none flex-row bg-[#bfbfbf] pl-2 dark:bg-[#374151] dark:text-gray-400">
              <Icon
                  name="ic:round-folder"
                  class="mr-1 place-self-center dark:text-slate-500 font"/>
              <span class="font-mono ">EternalCodeWWW</span>
            </div>
            <div
                id="file-2"
                class="flex h-6 w-1/2 select-none flex-row rounded-tr-lg border-b-2 border-rose-500 bg-[#e6e7e8] pl-2 dark:border-gray-900 dark:bg-[#1F2A37] dark:text-gray-400">
              <Icon
                  name="ph:terminal-fill"
                  class="left-0 w-5 place-self-center dark:text-slate-500 "
                  size="85%"/>
              <span class="ml-1 mr-auto font-mono ">Terminal</span>
            </div>
          </div>
          <div
              id="file-2-code "
              class="min-h-80 inset-x-0 h-80 bg-[#e6e7e8] pl-2 dark:bg-[#1F2A37] ">
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
          <a v-if="line.special" href="https://eternalcode.pl/" target="_blank"
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
              class="m-0 h-6 w-full rounded-br-lg bg-[#bdbdbd] dark:bg-[#374151]"></div>
        </div>
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


    function runTerminal() {
      if (currentIndex.value < lines.length) {
        if (linesAndFormatting[currentIndex.value].endLine) {
          setTimeout(() => {
            currentIndex.value++;
            return runTerminal();
          }, delay)
        } else {
          currentIndex.value++;
          return runTerminal();
        }
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

  methods: {
    onMouseMove(event) {
      const card = this.$refs.perspective;
      const relX = (event.offsetX + 1) / card.offsetWidth;
      const relY = (event.offsetY + 1) / card.offsetHeight;
      const rotY = `rotateY(${(relX - 0.5) * 30 }deg)`;
      const rotX = `rotateX(${(relY - 0.5) * -30 }deg)`;
      card.style.transform = `perspective(500px) ${rotY} ${rotX}`;
    },
    onMouseLeave() {
      const card = this.$refs.perspective;
      card.style.transform = (`rotateY(0deg) rotateX(0deg)`);
    },
  },
};
</script>

<style scoped>

</style>
