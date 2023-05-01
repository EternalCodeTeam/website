<template>
  <div class="relative">
    <button
      :aria-expanded="isOpen.toString()"
      aria-haspopup="true"
      class="flex items-center justify-between w-full py-2 pl-3 pr-4 rounded-[12px] hover:bg-gray-100t md:border-0 md:p-0 md:w-auto dark:text-white dark:border-white"
      @click="isOpen = !isOpen">
      {{ name }}
      <svg
        :class="{
          'transform rotate-180 transition-transform duration-300': isOpen,
          'transition-transform duration-300': !isOpen,
        }"
        aria-hidden="true"
        class="w-5 h-5 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          fill-rule="evenodd"></path>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-[12px] shadow w-44 dark:bg-[#161b22]"
      role="menu">
      <ul
        aria-labelledby="dropdownLargeButton"
        class="py-2 text-sm text-gray-700">
        <li v-for="item in items" :key="item.name">
          <a
            :aria-label="item.name"
            :href="item.href"
            class="block px-4 py-2 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-800 dark:hover:text-white"
            role="menuitem">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
