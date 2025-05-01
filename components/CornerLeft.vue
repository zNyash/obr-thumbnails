<script lang="ts" setup>
const { color } = defineProps({
  color: String,
})
</script>

<template>
  <div>
    <svg
      width="176"
      height="176"
      viewBox="0 0 176 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 176V0H176C176 0 102.608 0.704 51.392 51.92C0.176 103.136 0 176 0 176Z"
        :fill="color"
      />
    </svg>
  </div>
</template>
