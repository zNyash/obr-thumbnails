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
        d="M176 176V0H0C0 0 73.392 0.704 124.608 51.92C175.824 103.136 176 176 176 176Z"
        :fill="color"
      />
    </svg>
  </div>
</template>
