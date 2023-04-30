<template>
  <div class="mx-auto space-y-4 @container sm:max-w-[1240px]">
    <div v-for="(item, index) in faqItems" :key="index" data-aos="fade-up"
         data-aos-duration="400">
      <h2
        class="flex cursor-pointer items-center justify-between gap-1.5 rounded-t-[12px] bg-gray-50 p-4 font-medium text-gray-900"
        @click="toggleDetails(index)">
        {{ item.question }}

        <svg
          class="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 9l-7 7-7-7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2" />
        </svg>
      </h2>

      <div v-if="index === activeIndex" class="rounded-b-[12px] bg-gray-50 p-4">
        <p
          class="@mt-4 px-4 leading-relaxed text-gray-900"
          data-aos="fade-up"
          data-aos-duration="50">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const faqItems = [
  {
    question:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
    answer:
      "deseruisse tation interdum reprehendunt ius equidem vitae netus debet neglegentur nostrum eleifend signiferumque splendide principes invenire parturient vitae dicam donec",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    answer:
      "persequeris auctor equidem movet definiebas ubique dissentiunt fabellas faucibus felis noster tempus no intellegebat turpis ei omnesque antiopam penatibus iusto legimus autem melius vero antiopam iudicabit regione fuisset dicant quas accommodare dissentiunt persecuti movet neglegentur sagittis himenaeos consectetuer menandri fames maiorum usu nonumes justo ne laoreet legimus alienum integer persius",
  },
  {
    question: "vero viderer cetero massa ea decore cum viderer neque cras",
    answer:
      "explicari maecenas utroque unum ornare enim esse netus tota sententiae velit accumsan mucius nihil bibendum aliquam elaboraret sollicitudin enim graece pericula natoque sapientem nibh mattis lobortis tantas arcu esse fames",
  },
];

export default {
  methods: {
    toggleDetails(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index;
    },
  },
  data() {
    return {
      faqItems,
      activeIndex: -1,
    };
  },
};
</script>
