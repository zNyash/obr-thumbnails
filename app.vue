<script setup lang="ts">
import type { ScoreInfo } from "osu-classes"
import type { IBeatmapInfo } from "./types/IBeatmapInfo"
import type { TModKey } from "./types/IModBitwise"
import { ScoreDecoder } from "osu-parsers"
import _ from "lodash"
import type { ICalcAttrs } from "./types/ICalcAttrs"
import type { IMapAttributes } from "./types/IMapAttributes"
import type { IPlayerInfo } from "./types/IPlayerInfo"

getAuthToken()

// Basic Objects
const scoreInfo = ref<ScoreInfo>()
const scoreMods = ref<TModKey[]>()
const beatmapInfo = ref<IBeatmapInfo>()
const playerInfo = ref<IPlayerInfo>()
const calculatedMapAttributes = ref<IMapAttributes>()
const scoreRank = ref<string>()
const colorMain = ref<string>("hsl(220 50 50)")
let mapFile: string

// Image Handling
const loadMapBackgroundImage = computed(() => {
  if (beatmapInfo.value)
    return `https://assets.ppy.sh/beatmaps/${beatmapInfo.value.beatmapset_id}/covers/raw.jpg`
  return `https://assets.ppy.sh/beatmaps/${2327424}/covers/raw.jpg`
})

/**
 * Responsible for parsing the replay after upload
 */
async function handleFileInput(e: Event) {
  const target = e.target as HTMLInputElement

  if (!target.files) return

  const file = await target.files[0].arrayBuffer()

  const decoder = new ScoreDecoder()
  const parsedScore = await decoder.decodeFromBuffer(file, true)
  if (parsedScore) console.log("Replay Parsed: ", parsedScore)
  else return
  scoreInfo.value = parsedScore.info
  playerInfo.value = await getPlayerInfo(scoreInfo.value.username)

  beatmapInfo.value = await getBeatmapByHash(scoreInfo.value.beatmapHashMD5)
  scoreMods.value = getMods(scoreInfo.value.rawMods)
  mapFile = await getOsuFile(beatmapInfo.value.id)

  const replayAttributes: ICalcAttrs = {
    accuracy: scoreInfo.value.accuracy,
    maxCombo: scoreInfo.value.maxCombo,
    countMiss: scoreInfo.value.countMiss,
    count300: scoreInfo.value.count300,
    count100: scoreInfo.value.count100,
    count50: scoreInfo.value.count50,
    countGeki: scoreInfo.value.countGeki,
    countKatu: scoreInfo.value.countKatu,
  }
  calculatedMapAttributes.value = await getMapAttributes(
    mapFile,
    scoreInfo.value.rawMods,
    replayAttributes
  )

  scoreRank.value = await getScoreRanking(
    scoreInfo.value.rawMods,
    scoreInfo.value.count300,
    scoreInfo.value.count100,
    scoreInfo.value.count50,
    scoreInfo.value.countMiss
  )
  colorMain.value = await getMainColor(loadMapBackgroundImage.value)
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center p-6 gap-4"
    :style="{ '--main': colorMain }"
  >
    <!-- Input Area -->
    <input
      type="file"
      class="bg-neutral-900 p-1 rounded-md border-neutral-700 border hover:bg-neutral-800/75 cursor-pointer"
      @change="handleFileInput"
    />
    <div class="flex items-start flex-col w-fit">
      <p>Tittle: {{ beatmapInfo?.beatmapset.title }}</p>
      <p>Diff Name: {{ beatmapInfo?.version }}</p>
      <p>
        Star Rating: {{ beatmapInfo?.difficulty_rating }}*/{{
          calculatedMapAttributes?.starRating
        }}*
      </p>
      <p>Player Name: {{ scoreInfo?.username }}</p>
      <p>Score Ranking: {{ scoreRank }}</p>
      <p>Play Max Combo: {{ scoreInfo?.maxCombo }}x</p>
      <p>Map Max Combo: {{ beatmapInfo?.max_combo }}x</p>
      <p>
        Play Accuracy:
        {{ `${scoreInfo ? _.round(scoreInfo?.accuracy * 100, 2) : ""}%` }}
      </p>
      <p>Miss Count: {{ scoreInfo?.countMiss }}x</p>
      <p>PP: {{ calculatedMapAttributes?.pp }}pp/{{ calculatedMapAttributes?.ppMax }}pp</p>
      <p>Mods: {{ scoreMods?.join("") }}</p>
      <p>
        Map Link:
        <a :href="`${beatmapInfo?.url}`">{{ `${beatmapInfo?.url}` }}</a>
      </p>
    </div>
    <div class="flex items-center w-[1280px] h-[720px] bg-neutral-800 relative">
      <!-- Star Rating -->
      <div
        id="StarRating"
        class="absolute top-[321px] w-fit px-2 right-0 bg-[var(--main)]/25 min-w-[200px] text-right py-1 flex flex-col rounded-l-[24px] border-l-6 border-[var(--main)]"
      >
        <Text :text="`${calculatedMapAttributes?.starRating}`" size="48" type="2" class="mr-8" />
        <Icon
          name="material-symbols:kid-star"
          size="30"
          class="text-amber-400 absolute right-2 top-[18px]"
        />

        <Text :text="`${scoreInfo?.maxCombo}x`" size="48" type="2" class="-mt-3" />
        <Text
          :text="`${beatmapInfo?.max_combo}x`"
          size="24"
          type="2"
          class="text-amber-200 -mt-4"
        />
      </div>

      <!-- Profile -->
      <img
        id="Profile"
        :src="playerInfo?.avatar_url"
        class="size-64 absolute top-[321px] left-[512px] rounded-[48px] border-5 bg-[#404040] border-[var(--main)]"
      />

      <!-- Background Area -->
      <div id="Form" class="w-[1280px] h-[8px] absolute top-[176px] bg-[var(--main)]"></div>
      <div id="Form" class="w-[1280px] h-[8px] absolute bottom-[0px] bg-[var(--main)]"></div>
      <CornerLeft id="Form" :color="colorMain" class="absolute top-0 left-0" />
      <CornerRight id="Form" :color="colorMain" class="absolute top-0 right-0" />

      <span data-name="DarkenArea">
        <div id="Darken1" class="w-[1280px] h-[180px] absolute bg-black/50 top-0"></div>
        <BgGlow id="BgGlow" :color="colorMain" class="absolute bottom-0" />
        <div
          id="Darken2"
          class="w-[1280px] h-[540px] bg-black/75 absolute bottom-0 backdrop-blur-lg"
        ></div>
      </span>
      <img :src="loadMapBackgroundImage" class="object-cover w-full h-full object-center" />
    </div>
  </main>
</template>

<style scoped>
[data-name="DarkenArea"] {
  z-index: 1;
}
#BgGlow {
  z-index: 1;
}
#Form {
  z-index: 2;
}
#StarRating {
  z-index: 2;
}
#Profile {
  z-index: 2;
}
</style>
