<script setup lang="ts">
import type { ScoreInfo, ModUtils } from 'osu-classes';
import {ScoreDecoder} from 'osu-parsers';
import type { IBeatmapInfo } from './types/IBeatmapInfo';

getAuthToken()

// Basic Objects
const scoreInfo = ref<ScoreInfo>();
const beatmapInfo = ref<IBeatmapInfo>()

/**
 * Responsible for parsing the replay after upload
 */
async function handleFileInput(e: Event){
  const target = e.target as HTMLInputElement

  if (!target.files) return; // Assuring a file exists

  const file = await target.files[0].arrayBuffer()

  const decoder = new ScoreDecoder()
  const parsedScore = await decoder.decodeFromBuffer(file, true)
  console.log("Parsed Score: ", parsedScore.info)
  scoreInfo.value = parsedScore.info
  const beatmapHashMD5 = scoreInfo.value.beatmapHashMD5
  beatmapInfo.value = await getBeatmapByHash(beatmapHashMD5)
  
}


</script>

<template>
  <main class="flex flex-col items-center justify-center h-[100vh]">
    <!-- Input Area -->
     <input type="file" class="bg-neutral-900 p-1 rounded-md border-neutral-700 border hover:bg-neutral-800/75 cursor-pointer" @change="handleFileInput">
  </main>
</template>
