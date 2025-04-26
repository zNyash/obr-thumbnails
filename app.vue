<script setup lang="ts">
import type { ScoreInfo } from 'osu-classes';
import type { IBeatmapInfo } from './types/IBeatmapInfo';
import type { TModKey } from './types/IModBitwise';
import {ScoreDecoder} from 'osu-parsers';
import _ from "lodash"

getAuthToken()

// Basic Objects
const scoreInfo = ref<ScoreInfo>();
const scoreMods = ref<TModKey[]>()
const beatmapInfo = ref<IBeatmapInfo>()
const mapFile = ref()


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
  scoreMods.value = getMods(scoreInfo.value.rawMods)
  mapFile.value = await downloadOsuFile(String(beatmapInfo.value.id))
}


</script>

<template>
  <main class="flex flex-col items-center justify-center h-[100vh]">
    <!-- Input Area -->
     <input type="file" class="bg-neutral-900 p-1 rounded-md border-neutral-700 border hover:bg-neutral-800/75 cursor-pointer" @change="handleFileInput">
     <p>Tittle: {{ beatmapInfo?.beatmapset.title }}</p>
     <p>Diff Name: {{ beatmapInfo?.version }}</p>
     <p>Star Rating: {{ beatmapInfo?.difficulty_rating }}*</p>
     <p>Player Name: {{ scoreInfo?.username }}</p>
     <p>Play Max Combo: {{ scoreInfo?.maxCombo }}x</p>
     <p>Map Max Combo: {{ beatmapInfo?.max_combo }}x</p>
     <p>Play Accuracy: {{ `${scoreInfo ? _.round(scoreInfo?.accuracy * 100, 2) : ""}%`}}</p>
     <p>Mods: {{ scoreMods }}</p>
     <p>Map Link: <a :href="`${beatmapInfo?.url}`">{{ `${beatmapInfo?.url}` }}</a></p>

  </main>
</template>
