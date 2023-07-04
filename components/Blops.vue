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
        <ellipse rx="80" ry="80" cx="709.0676475644736" cy="104.87774498425227" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down"></ellipse>
        <ellipse rx="80" ry="80" cx="693.4348876314014" cy="438.0825482912712" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down"></ellipse>
        <ellipse rx="80" ry="80" cx="191.9203423505054" cy="624.7306258116716" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down" ></ellipse>
        <ellipse rx="80" ry="80" cx="70.57745409261497" cy="492.2083264096245" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down" ></ellipse>
        <ellipse rx="80" ry="80" cx="131.1563270129459" cy="98.49645229159847" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down" ></ellipse>
        <ellipse rx="80" ry="80" cx="66.43386920709258" cy="715.8552271658211" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down" ></ellipse>
        <ellipse rx="80" ry="80" cx="540.8173732258263" cy="94.11494194150595" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down" ></ellipse>
        <ellipse rx="80" ry="80" cx="709.0446689465907" cy="639.5999723903795" fill="hsla(272, 99%, 54%, 1.00)"
                 class="animate-bounce-up-down"></ellipse>
      </g>
    </svg>
  </div>
</template>

<style scoped>

</style>



