<script setup lang="ts">
type StyleType = "1" | "2" | "3"

interface Props {
  text: string
  size: string
  type: StyleType
}

const { text = "Enter Text", size = "16", type = "1" } = defineProps<Props>()
const lineHeight = `${Number(size) * 1.25}px`
const trueSize = `${size}px`
</script>

<template>
  <template v-if="type === '1'">
    <span :style="{ fontSize: trueSize }">
      <p
        class="absolute -translate-x-1/2 align-top max-w-[1150px] top-0 left-0 truncate drop-shadow-[4px_4px_2px_rgba(0,0,0,1)]"
      >
        {{ text }}
      </p>
      <p
        class="absolute -translate-x-1/2 align-top max-w-[1150px] truncate drop-shadow-[0px_0px_12px_rgba(255,255,255,0.75)]"
        id="Glow2"
      >
        {{ text }}
      </p>
    </span>
  </template>
  <template v-else-if="type === '2'">
    <span :style="{ fontSize: trueSize, lineHeight: lineHeight }">
      <p class="align-top max-w-[1200px] truncate drop-shadow-[4px_4px_2px_#000]/75">{{ text }}</p>
    </span>
  </template>
  <template v-else-if="type === '3'">
    <span :style="{ fontSize: trueSize, lineHeight: lineHeight }">
      <p class="align-top max-w-[1200px] truncate drop-shadow-[4px_4px_2px_#000]/75">{{ text }}</p>
    </span>
  </template>
</template>
