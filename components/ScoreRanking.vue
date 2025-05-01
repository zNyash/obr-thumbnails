<script lang="ts" setup>
const { rank } = defineProps({
  rank: String,
})
</script>

<template>
  <div>
    <template v-if="rank === 'XH'">
      <img src="/assets/ScoreRanking/XH.png" />
    </template>
    <template v-else-if="rank === 'X'">
      <img src="/assets/ScoreRanking/X.png" />
    </template>
    <template v-else-if="rank === 'S'">
      <img src="/assets/ScoreRanking/S.png" />
    </template>
    <template v-else-if="rank === 'SH'">
      <img src="/assets/ScoreRanking/SH.png" />
    </template>
    <template v-else-if="rank === 'A'">
      <img src="/assets/ScoreRanking/A.png" />
    </template>
    <template v-else-if="rank === 'B'">
      <img src="/assets/ScoreRanking/B.png" />
    </template>
    <template v-else-if="rank === 'C'">
      <img src="/assets/ScoreRanking/C.png" />
    </template>
    <template v-else-if="rank === 'D'">
      <img src="/assets/ScoreRanking/D.png" />
    </template>
  </div>
</template>
