import _ from "lodash";
import {Beatmap, Performance} from "rosu-pp-js";

export default defineEventHandler(async (event) => {
	const {mapFile, rawMods, countMiss, count300, count100, count50, maxCombo, accuracy} = await readBody(event);
	const mapBuffer = Buffer.from(String(mapFile), "utf-8");
	const map = new Beatmap(mapBuffer);

	const maxAttrs = new Performance({mods: Number(rawMods)}).calculate(map);
	const currAttrs = new Performance({
		mods: Number(rawMods),
		accuracy: accuracy,
		combo: maxCombo,
		lazer: false,
		n300: count300,
		n100: count100,
		n50: count50,
		misses: countMiss,
	}).calculate(maxAttrs);
	console.log({
		starRating: currAttrs.difficulty.stars,
		pp: currAttrs.pp,
	});
	return {
		starRating: _.round(currAttrs.difficulty.stars, 2),
		pp: _.round(currAttrs.pp, 2),
	};
});
