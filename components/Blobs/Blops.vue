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
          :rx="30"
          :ry="30"
          :cx="data.position.x"
          :cy="data.position.y"
          fill="hsla(212, 72%, 59%, 1.00)"
        ></ellipse>
      </g>
    </svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

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
  constructor(posX, posY, range) {
    this.position = new Vector(posX, posY);
    this.velocity = this.generateRandomVelocity(range).multiply(0.2);
  }

  generateRandomVelocity(range) {
    const randomIndex = Math.floor(Math.random() * range.length);
    const randomRange = range[randomIndex];

    const randomX =
      Math.floor(Math.random() * (randomRange.maxX - randomRange.minX + 1)) +
      randomRange.minX;
    const randomY =
      Math.floor(Math.random() * (randomRange.maxY - randomRange.minY + 1)) +
      randomRange.minY;

    return new Vector(randomX, randomY);
  }

  move() {
    const newPosition = this.position.add(this.velocity);
    const smoothness = 0.05;
    this.position = this.position
      .add(newPosition.subtract(this.position).multiply(smoothness));

    // If the ball is out of the screen, generate a new velocity vector with reverse direction
    if ( this.position.x < 0 || this.position.x > 800 || this.position.y < 0 || this.position.y > 800 ) {
      this.velocity = this.velocity.multiply(-1);
    }

  }
}

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

const Balls = [
  new Ball(50, 50, range),
  new Ball(10, 680, range),
  new Ball(30, 450, range),
  new Ball(80, 50, range),
  new Ball(150, 600, range),
  new Ball(500, 50, range),
  new Ball(650, 400, range),
  new Ball(650, 600, range),
];

export default defineComponent({
  name: 'Blops',
  data() {
    return {
      Balls,
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
        ball.velocity = ball.generateRandomVelocity(range).multiply(0.2);
      }
    }, 5000);
  },
});
</script>

<style scoped>
</style>