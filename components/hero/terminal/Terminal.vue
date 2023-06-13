<template>

  <div class="w-auto h-auto transition transform duration-300 ease-in-out" ref="perspective" @mousemove="onMouseMove"
       @mouseleave="onMouseLeave" style="transform-style: preserve-3d">
    <div
        id="terminal"
        class="hidden w-full md:mt-3 md:flex md:flex-row lg:mt-0 "
        aria-hidden="true">
      <div class="w-full flex flex-col">
        <div class="flex border-b-2 border-rose-500 bg-[#d8dde6] dark:bg-[#4B5563] dark:border-gray-900 w-full rounded-t-lg">
          <div
              id="on-off-buttons"
              class="h-6 select-none  bg-[#d8dde6] dark:bg-[#4B5563] rounded-lg">
            <div
                class="flex justify-center items-center h-full space-x-1.5 ml-2 h-6 select-none rounded-lg bg-[#d8dde6] dark:bg-[#4B5563]"
                style="width: fit-content">
              <div class="w-[12px] h-[12px] bg-[#f9644e] rounded-full"></div>
              <div class="w-[12px] h-[12px] bg-[#ffb630] rounded-full"></div>
              <div class="w-[12px] h-[12px] bg-[#3cc548] rounded-full"></div>
            </div>
          </div>
          <div id="file-name" class="text-center mx-auto text-2xs text-gray-800 dark:text-gray-400 select-none">
            <span class="font-bold">Eternalcode - Git blame: CitralFlo</span>
          </div>
        </div>
        <div id="section-left" class="flex flex-row ">
          <div id="settings" class="h-full w-1/5 flex">
            <div
                id="project-settings"
                class="center flex h-full w-1/4 flex-col py-2 px-2 bg-[#cfd0d1] space-y-2 items-center dark:bg-[#374151] rounded-bl-lg">
              <a href="https://github.com/EternalCodeTeam/" target="_blank">
                <Icon
                    name="octicon:git-branch"
                    class="mb-[3px] dark:text-slate-500"
                    s/>
              </a>
              <a href="https://github.com/EternalCodeTeam/" target="_blank">
                <Icon
                    name="carbon:code-hide"
                    class="mb-[3px] dark:text-slate-500"/>
              </a>
              <a href="https://github.com/EternalCodeTeam/" target="_blank">
                <Icon
                    name="teenyicons:git-commit-outline"
                    class="mb-[3px] dark:text-slate-500"/>
              </a>
              <a href="https://github.com/EternalCodeTeam/" target="_blank">
                <Icon name="ph:github-logo-fill" class="mb-[4px] dark:text-slate-500"  />
              </a>
              <a href="https://github.com/EternalCodeTeam/" target="_blank">
                <Icon
                    name="ic:sharp-more-vert"
                    class="mb-[3px] dark:text-slate-500"/>
              </a>
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
          <div id="main-tab"
               class="flex h-full w-4/5 flex-col bg-[#bfbfbf] dark:bg-[#374151] rounded-br-lg">
            <div id="file-section" class="flex">
              <div
                  id="file-1"
                  class="flex w-1/2 select-none flex-row bg-[#bfbfbf] pl-2 dark:bg-[#374151] dark:text-gray-400 pr-4"
                  style="width: fit-content;">
                <Icon
                    name="ic:round-folder"
                    class="mr-1 place-self-center dark:text-slate-500 font"/>
                <span class="font-mono ">EternalCodeWWW</span>
              </div>
              <div
                  id="file-2"
                  class="flex h-6 select-none flex-row border-b-2 border-rose-500 bg-[#e6e7e8] pl-2 dark:border-gray-900 dark:bg-[#1F2A37] dark:text-gray-400 pr-4"
                  style="width: fit-content;">
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
      const rotY = `rotateY(${(relX - 0.5) * 20}deg)`;
      const rotX = `rotateX(${(relY - 0.5) * -15}deg)`;
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
