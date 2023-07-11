<template>
  <div
    aria-hidden="true"
    class="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
      </defs>
      <g>
        <ellipse
          v-for="(data, index) in balls"
          :key="index"
          :rx="data.radius"
          :ry="data.radius"
          :cx="data.position.x"
          :cy="data.position.y"
          :fill="isDark() ?  'hsl(215,92%,75%)' : 'hsl(212,95%,59%)'"
        ></ellipse>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Ball} from "./Ball";


function fibonacci(n: number): number[] {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 2] + result[i - 1]);
  }
  return result;
}

const FIBONACCI: number[] = fibonacci(10);
const BALL_ROWS = 30;
const balls = [];


export default defineComponent({
  name: "Blobs",
  data() {
    return {
      balls: balls,
      screenWidth: 0,
    };
  },

  methods: {
    isDark() {
      if (!process.client) {
        return false;
      }

      return document.documentElement.classList.contains("dark");
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.updateScreenWidth);

    for (let i = 0; i < BALL_ROWS; i++) {
      const BALLS_PER_ROW = FIBONACCI[i];
      for (let j = 0; j < BALLS_PER_ROW; j++) {
        if (BALLS_PER_ROW < 8) {
          this.balls.push(new Ball((j + 1) * this.screenWidth * (1 / (1 + BALLS_PER_ROW)), 100 * i));
        } else {
          if (j < BALLS_PER_ROW / 2) {
            this.balls.push(new Ball((j + 1) * this.screenWidth * (1 / (1 + BALLS_PER_ROW)), 100 * i));
          } else {
            this.balls.push(new Ball((j + 1) * this.screenWidth * (1 / (1 + BALLS_PER_ROW)), 100 * i + 100));
          }
        }
      }
    }

    setInterval(() => {
      for (const ball of this.balls) {
        ball.move();
      }
    }, 50);

    setInterval(() => {
      for (const ball of this.balls) {
        setTimeout(() => {
          ball.velocity = ball.generateParallelVelocity().multiply(0.2);
        }, Math.random() * 100);
      }
    }, 5000);
  },
});
</script>

<style scoped>
</style>