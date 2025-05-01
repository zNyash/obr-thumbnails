<script lang="ts" setup>
const { color } = defineProps({
  color: String,
})
</script>

<template>
  <div>
    <svg
      width="1280"
      height="540"
      viewBox="0 0 1280 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1280" height="540" fill="url(#paint0_radial_4185_71)" fill-opacity="0.25" />
      <defs>
        <radialGradient
          id="paint0_radial_4185_71"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(640 270) rotate(90) scale(622.5)"
        >
          <stop :stop-color="color" stop-opacity="0" />
          <stop offset="1" :stop-color="color" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>
