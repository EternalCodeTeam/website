<template>
  <div
    aria-hidden="true"
    class="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="40" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none"
                          result="blur">
          </feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)" class="light:opacity-150 dark:opacity-70">
        <ellipse v-for="(data, index) in positionsRangeData"
                 :key="index"
                 :rx="data.range"
                 :ry="data.range"
                 :cx="data.posX"
                 :cy="data.posY"
                 fill="hsla(212, 72%, 59%, 1.00)">
        </ellipse>
      </g>
    </svg>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

const range = [
  { minX: 50, maxX: 150, minY: 50, maxY: 150 },
  { minX: 10, maxX: 110, minY: 680, maxY: 780 },
  { minX: 30, maxX: 130, minY: 450, maxY: 550 },
  { minX: 80, maxX: 180, minY: 50, maxY: 150 },
  { minX: 150, maxX: 250, minY: 600, maxY: 700 },
  { minX: 500, maxX: 600, minY: 50, maxY: 150 },
  { minX: 650, maxX: 750, minY: 400, maxY: 500 },
  { minX: 650, maxX: 750, minY: 600, maxY: 700 },
];

export default defineComponent({
  name: 'Blops',
  data() {
    return {
      positionsRangeData: [
        { posX: 50, posY: 50, range: 80 },
        { posX: 10, posY: 680, range: 80 },
        { posX: 30, posY: 450, range: 80 },
        { posX: 80, posY: 50, range: 80 },
        { posX: 150, posY: 600, range: 80 },
        { posX: 500, posY: 50, range: 80 },
        { posX: 650, posY: 400, range: 80 },
        { posX: 650, posY: 600, range: 80 },
      ],
    };
  },
  created() {
    setInterval(() => {
      this.moveBall();
    }, 1000);
  },
  methods: {
    moveBall() {
      for (let i = 0; i < this.positionsRangeData.length; i++) {
        const targetX = Math.floor(Math.random() * (range[i].maxX - range[i].minX + 1)) + range[i].minX;
        const targetY = Math.floor(Math.random() * (range[i].maxY - range[i].minY + 1)) + range[i].minY;
        const stepX = (targetX - this.positionsRangeData[i].posX) / 30;
        const stepY = (targetY - this.positionsRangeData[i].posY) / 30;

        const animate = () => {
          if (this.positionsRangeData[i].posX !== targetX || this.positionsRangeData[i].posY !== targetY) {
            this.positionsRangeData[i].posX += stepX;
            this.positionsRangeData[i].posY += stepY;
            requestAnimationFrame(animate);
          }
        };

        animate();
      }
    },
  },
});
</script>
<style scoped>

</style>



