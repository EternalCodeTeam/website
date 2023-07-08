<template>
  <div
    aria-hidden="true"
    class="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
      <defs>
        <filter
          id="bbblurry-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="900%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="40"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g
        filter="url(#bbblurry-filter)"
        class="light:opacity-150 dark:opacity-70"
      >
        <ellipse
          v-for="(data, index) in Balls"
          :key="index"
          :rx="isDark ? '40' : '70'"
          :ry="isDark ? '40' : '70'"
          :cx="data.position.x"
          :cy="data.position.y"
          fill="hsla(212, 72%, 59%, 1.00)"
        ></ellipse>
      </g>
    </svg>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

let isDark = ref(false);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  multiply(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }
}

class Ball {
  constructor(posX, posY) {
    this.position = new Vector(posX, posY);
    this.velocity = this.generateRandomVelocity().multiply(0.2);
  }

  generateRandomVelocity() {
    const randomX =
      (
        Math.floor(Math.random() * 120) +
        100
      ) * (Math.random() < 0.5 ? -1 : 1);
    const randomY =
      (
      Math.floor(Math.random() * 150) +
      100
      ) * (Math.random() < 0.5 ? -1 : 1);

    return new Vector(randomX, randomY);
  }

  move() {
    const newPosition = this.position.add(this.velocity);
    const smoothness = 0.05;
    this.position = this.position
      .add(newPosition.subtract(this.position).multiply(smoothness));

    // If the ball is out of the screen, generate a new velocity vector with reverse direction
    if (this.position.x < 0 || this.position.x > 800 || this.position.y < 0 || this.position.y > 800) {
      this.velocity = this.velocity.multiply(-1);
    }

  }
}

const Balls = [
  new Ball(50, 50),
  new Ball(10, 680),
  new Ball(30, 450),
  new Ball(80, 50),
  new Ball(150, 600),
  new Ball(500, 50),
  new Ball(650, 400),
  new Ball(650, 600),
];

export default defineComponent({
  name: 'Blops',
  data() {
    return {
      Balls,
      isDark: isDark.value,
    };
  },
  mounted() {
    // Move the balls gradually
    setInterval(() => {
      for (const ball of this.Balls) {
        ball.move();
      }
    }, 50);
    // Generate new random velocity for the balls
    setInterval(() => {
      for (const ball of this.Balls) {
        setTimeout(() => {
          ball.velocity = ball.generateRandomVelocity().multiply(0.2);
        }, Math.random() * 100);
      }
    }, 5000);

    //check for dark mode
    const theme = localStorage.getItem("theme");
    this.isDark = theme === "dark";

    //listen for dark mode changes
    addEventListener("storage", (e) => {
      this.isDark = e.newValue === "dark";
    });

  },
});
</script>

<style scoped>
</style>