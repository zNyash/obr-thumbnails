<script setup lang="ts">
import type { ScoreInfo } from "osu-classes"
import type { IBeatmapInfo } from "./types/IBeatmapInfo"
import type { TModKey } from "./types/IModBitwise"
import { ScoreDecoder } from "osu-parsers"
import _ from "lodash"
import type { ICalcAttrs } from "./types/ICalcAttrs"
import type { IMapAttributes } from "./types/IMapAttributes"
import type { IPlayerInfo } from "./types/IPlayerInfo"

// Basic Objects
const scoreInfo = ref<ScoreInfo>()
const beatmapInfo = ref<IBeatmapInfo>()
const playerInfo = ref<IPlayerInfo>()
const mapAttributesInfo = ref<IMapAttributes>()

const scoreMods = ref<TModKey[]>()
const scoreRank = ref<string>()
const mainColor = ref<string>("hsl(220 50 50)")

const hasSB = computed(() => {
  if (SBAmount.value <= 0) return false
  return true
})
const SBAmount = ref<number>(0)

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

  const file = await target.files[0].arrayBuffer() // Encode to buffer
  const decoder = new ScoreDecoder()
  const parsedScore = await decoder.decodeFromBuffer(file, true)
  if (!parsedScore) return

  console.log("Replay Parsed: ", parsedScore)

  // Area for setting the variable values
  scoreInfo.value = parsedScore.info
  playerInfo.value = await getPlayerInfo(scoreInfo.value.username)
  beatmapInfo.value = await getBeatmapByHash(scoreInfo.value.beatmapHashMD5)
  mapFile = await getOsuFile(beatmapInfo.value.id)
  mapAttributesInfo.value = await getMapAttributes(mapFile, scoreInfo.value)
  scoreRank.value = await getScoreRanking(scoreInfo.value)
  mainColor.value = await getMainColor(loadMapBackgroundImage.value)
  scoreMods.value = getMods(scoreInfo.value.rawMods)
}
</script>

<template>
  <main
    class="flex flex-row items-center justify-center p-6 gap-8 h-[100vh]"
    :style="{ '--main': mainColor }"
  >
    <section class="flex flex-row items-center justify-between p-6 gap-8 h-[100vh] w-fit">
      <!-- Input Area -->
      <div class="flex flex-col items-end justify-center w-full h-full">
        <div class="flex flex-col items-start w-fit h-fit gap-4">
          <span class="flex flex-col w-full items-start justify-center">
            <label for="FileInput">Choose a replay (.osr) file.</label>
            <input
              id="FileInput"
              type="file"
              class="bg-neutral-900 p-2 h-fit rounded-md border-neutral-700 border hover:bg-neutral-800/75 cursor-pointer"
              @change="handleFileInput"
            />
          </span>
          <span class="flex flex-col w-full items-start justify-center">
            <label for="hasSb">If theres any Slider Breaks, how many there is?</label>
            <input
              id="hasSb"
              type="number"
              min="0"
              class="bg-neutral-900 w-full p-2 rounded-md border-neutral-700 border hover:bg-neutral-800/75 outline-0"
              v-model="SBAmount"
            />
          </span>

          <span class="flex flex-col w-full items-start justify-center">
            <label for="ReplayComent">The comment for the replay.</label>
            <input
              id="ReplayComent"
              type="text"
              min="0"
              class="bg-neutral-900 w-full p-2 rounded-md border-neutral-700 border hover:bg-neutral-800/75 outline-0"
              v-model="SBAmount"
            />
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <!-- The Thumbnail Itself -->
        <div
          class="flex w-[1280px] h-[720px] bg-neutral-800 relative justify-center overflow-clip rounded-xl"
        >
          <Text
            id="Text"
            :text="`${beatmapInfo?.beatmapset.title}`"
            size="64"
            type="1"
            class="absolute top-[34px]"
          />
          <!-- Diff Name -->
          <div
            id="DiffName"
            class="absolute z-11 font-semibold bg-[#242424] px-2 rounded-xl top-[152px] outline-6 outline-[var(--main)]"
          >
            <Text size="48" :text="`[${beatmapInfo?.version}]`" type="2" />
            <div class="absolute bg-[var(--main)] mix-blend-overlay inset-0 -z-1"></div>
          </div>
          <!-- Star Rating -->
          <div
            id="StarRating"
            class="absolute top-[321px] w-fit px-2 right-0 bg-[var(--main)]/25 min-w-[200px] text-right py-1 flex flex-col rounded-l-[24px] border-l-6 border-[var(--main)]"
          >
            <Text :text="`${mapAttributesInfo?.starRating}`" size="48" type="2" class="mr-8" />
            <Icon
              name="material-symbols:kid-star"
              size="30"
              class="text-amber-400 absolute right-2 top-[18px]"
            />
            <template v-if="scoreInfo?.maxCombo == beatmapInfo?.max_combo">
              <Text
                :text="`${scoreInfo?.maxCombo}x`"
                size="48"
                type="2"
                class="text-amber-200 -mt-3"
              />
              <Text
                :text="`${beatmapInfo?.max_combo}x`"
                size="24"
                type="2"
                class="text-amber-200 -mt-3 hidden"
              />
            </template>
            <template v-else>
              <Text :text="`${scoreInfo?.maxCombo}x`" size="48" type="2" class="-mt-3" />
              <Text
                :text="`${beatmapInfo?.max_combo}x`"
                size="24"
                type="2"
                class="text-amber-200 -mt-3"
              />
            </template>
          </div>
          <!-- Play Info -->
          <span>
            <!-- Profile Username -->
            <Text
              id="Text"
              :text="`${scoreInfo?.username}`"
              size="64"
              type="1"
              class="absolute top-[221px] left-1/2"
            />
            <!-- PP -->
            <Text
              id="Text"
              :text="`${mapAttributesInfo?.pp}pp`"
              size="48"
              type="2"
              class="absolute top-[367px] right-[788px]"
            />
            <!-- FC/SB/Misscount -->
            <template v-if="scoreInfo?.countMiss === 0 && !hasSB">
              <Text
                id="Text"
                data-name="FC"
                :text="`FC`"
                size="48"
                type="3"
                class="absolute top-[476px] right-[788px] text-amber-400"
              />
            </template>
            <template v-else-if="scoreInfo?.countMiss === 0 && hasSB">
              <Text
                id="Text"
                data-name="SB"
                :text="`${SBAmount}sb`"
                size="48"
                type="3"
                class="absolute top-[476px] right-[788px] text-indigo-300"
              />
            </template>
            <template v-else>
              <Text
                id="Text"
                data-name="MISS"
                :text="`${scoreInfo?.countMiss}x`"
                size="48"
                type="3"
                class="absolute top-[476px] right-[788px] text-red-400"
              />
            </template>
            <!-- Accuracy -->
            <Text
              id="Text"
              :text="`${scoreInfo ? _.round(scoreInfo?.accuracy * 100, 2) : ''}%`"
              size="48"
              type="2"
              class="absolute top-[367px] left-[788px]"
            />
            <!-- Mods -->
            <Text
              id="Text"
              :text="`${scoreMods}`"
              size="48"
              type="2"
              class="absolute top-[476px] left-[788px]"
            />
            <!-- Score Ranking -->
            <ScoreRanking :rank="scoreRank" class="absolute z-10 left-[-250px] top-[35px]" />
          </span>
          <!-- Profile -->
          <img
            id="Profile"
            :src="playerInfo?.avatar_url"
            class="size-64 absolute top-[321px] left-[512px] rounded-[48px] border-5 bg-[#404040] border-[var(--main)]"
          />
          <!-- Background Area -->
          <span>
            <div id="Form" class="w-[1280px] h-[8px] absolute top-[176px] bg-[var(--main)]"></div>
            <div id="Form" class="w-[1280px] h-[8px] absolute bottom-[0px] bg-[var(--main)]"></div>
            <CornerLeft id="Form" :color="mainColor" class="absolute top-0 left-0" />
            <CornerRight id="Form" :color="mainColor" class="absolute top-0 right-0" />
            <span data-name="DarkenArea">
              <div id="Darken1" class="w-[1280px] h-[180px] absolute bg-black/50 top-0"></div>
              <BgGlow id="BgGlow" :color="mainColor" class="absolute bottom-0" />
              <div
                id="Darken2"
                class="w-[1280px] h-[540px] bg-black/75 absolute bottom-0 backdrop-blur-md"
              ></div>
            </span>
          </span>
          <img :src="loadMapBackgroundImage" class="object-cover w-full h-full object-center" />
        </div>
        <!-- Informations about the Replay and Beatmap as Text -->
        <div id="MapAndPlayInfoDiv" class="flex items-start flex-col w-fit">
          <p>Tittle: {{ beatmapInfo?.beatmapset.title }}</p>
          <p>Diff Name: {{ beatmapInfo?.version }}</p>
          <p>
            Star Rating: {{ beatmapInfo?.difficulty_rating }}*/{{ mapAttributesInfo?.starRating }}*
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
          <p>PP: {{ mapAttributesInfo?.pp }}pp/{{ mapAttributesInfo?.ppMax }}pp</p>
          <p>Mods: {{ scoreMods?.join("") }}</p>
          <p>
            Map Link:
            <a class="text-blue-400 underline" :href="`${beatmapInfo?.url}`">{{
              `${beatmapInfo?.url}`
            }}</a>
          </p>
        </div>
      </div>
    </section>
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
#Text {
  z-index: 2;
}
#MapAndPlayInfoDiv p {
  margin-top: -5px;
}
[data-name="FC"] {
  filter: drop-shadow(0px 0px 12px color-mix(in oklab, var(--color-amber-400) 40%, transparent));
}
[data-name="SB"] {
  filter: drop-shadow(0px 0px 12px color-mix(in oklab, var(--color-indigo-400) 40%, transparent));
}
[data-name="MISS"] {
  filter: drop-shadow(0px 0px 12px color-mix(in oklab, var(--color-red-400) 40%, transparent));
}
</style>
