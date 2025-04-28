<script setup lang="ts">
import type {ScoreInfo} from "osu-classes";
import type {IBeatmapInfo} from "./types/IBeatmapInfo";
import type {TModKey} from "./types/IModBitwise";
import {ScoreDecoder} from "osu-parsers";
import _ from "lodash";
import type { ICalcAttrs } from "./types/ICalcAttrs";
import type { IMapAttributes } from "./types/IMapAttributes";

getAuthToken();

// Basic Objects
const scoreInfo = ref<ScoreInfo>();
const scoreMods = ref<TModKey[]>();
const beatmapInfo = ref<IBeatmapInfo>();
const calculatedMapAttributes = ref<IMapAttributes>();
const scoreRank = ref<string>()
let mapFile: string;



/**
 * Responsible for parsing the replay after upload
 */
async function handleFileInput(e: Event) {
	const target = e.target as HTMLInputElement;

	if (!target.files) return; // Assuring a file exists

	const file = await target.files[0].arrayBuffer();

	const decoder = new ScoreDecoder();
	const parsedScore = await decoder.decodeFromBuffer(file, true);
	if (parsedScore) console.log("Replay Parsed: ", parsedScore);
	else return;
	scoreInfo.value = parsedScore.info;

	beatmapInfo.value = await getBeatmapByHash(scoreInfo.value.beatmapHashMD5);
	scoreMods.value = getMods(scoreInfo.value.rawMods);
	mapFile = await getOsuFile(beatmapInfo.value.id);

	const attrs: ICalcAttrs = {
		accuracy: scoreInfo.value.accuracy,
		combo: scoreInfo.value.maxCombo,
		n300: scoreInfo.value.count300,
		n100: scoreInfo.value.count100,
		n50: scoreInfo.value.count50,
		misses: scoreInfo.value.countMiss
	}
	calculatedMapAttributes.value = await getCalculatedStarRating(mapFile, scoreInfo.value.rawMods, attrs)

	scoreRank.value = await getScoreRanking(scoreInfo.value.rawMods, scoreInfo.value.count300, scoreInfo.value.count100, scoreInfo.value.count50, scoreInfo.value.countMiss)
}
</script>

<template>
	<main class="flex flex-col items-center justify-center h-[100vh]">
		<!-- Input Area -->
		<input type="file" class="bg-neutral-900 p-1 rounded-md border-neutral-700 border hover:bg-neutral-800/75 cursor-pointer" @change="handleFileInput">
		<p>Tittle: {{ beatmapInfo?.beatmapset.title }}</p>
		<p>Diff Name: {{ beatmapInfo?.version }}</p>
		<p>Star Rating: {{ beatmapInfo?.difficulty_rating }}*</p>
    <p>Calculated Star Rating: {{ calculatedMapAttributes?.starRating }}*</p>
		<p>Player Name: {{ scoreInfo?.username }}</p>
		<p>Score Ranking: {{ scoreRank }}</p>
		<p>Play Max Combo: {{ scoreInfo?.maxCombo }}x</p>
		<p>Map Max Combo: {{ beatmapInfo?.max_combo }}x</p>
		<p>Play Accuracy: {{ `${scoreInfo ? _.round(scoreInfo?.accuracy * 100, 2) : ""}%` }}</p>
		<p>Miss Count: {{ scoreInfo?.countMiss }}x</p>
		<p>PP: {{ calculatedMapAttributes?.pp }}</p>
		<p>Mods: {{ scoreMods?.join("") }}</p>
		<p>
			Map Link: <a :href="`${beatmapInfo?.url}`">{{ `${beatmapInfo?.url}` }}</a>
		</p>
		<p>{{ scoreInfo?.count300 }}</p>
	</main>
</template>
