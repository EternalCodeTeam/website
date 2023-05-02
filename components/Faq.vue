<template>
  <section id="faq" aria-label="Frequently Asked Questions">
    <div class="mx-auto max-w-screen-xl px-4 py-8">
      <SectionTitle
        title="Frequently Asked Questions"
        description="Frequently asked questions about us!" />

      <div class="grid pt-8 text-left md:grid-cols-2 md:gap-16">
        <div v-for="(faq, index) in faqs" :key="index" role="listitem">
          <div class="mb-10" data-aos="fade-up" data-aos-duration="500">
            <h3
              class="mb-4 flex items-center text-lg font-medium text-gray-900 dark:text-white"
              role="heading"
              aria-level="3">
              {{ faq.question }}
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faqs,
    };
  },
};

const faqs = [
  {
    question:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
    answer:
      "dignissim reprehendunt scripta erroribus qualisque quot dolore postea euripidis ponderum theophrastus turpis pertinacia pri tractatos",
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
    answer:
      "sale repudiandae vestibulum agam interpretaris regione platea mediocritatem sententiae decore reformidans alienum reformidans unum nascetur",
  },
  {
    question: "This hypnosis has only been eated by a galactic space suit.",
    answer:
      "The breeze breaks with amnesty, scrape the bikini atoll until it whines.",
  },
  {
    question: "Peanuts taste best with milk and lots of anise.",
    answer:
      "Try flavoring the joghurt steaks with aromatic tuna sauce and sweet chili sauce, cooked.",
  },
];
</script>
