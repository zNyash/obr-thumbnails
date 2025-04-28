import _ from "lodash";
import {BeatmapDecoder} from "osu-parsers";
import {StandardRuleset} from "osu-standard-stable";

/**
 * @param mapFile Osu beatmap file as string
 * @param rawMods Bitwise value of mods combination
 * @returns Beatmap difficulty attributes.
 */
export default (mapFile: string, rawMods: number | string) => {
	const decoder = new BeatmapDecoder();
	const parsedMap = decoder.decodeFromString(mapFile);

	const ruleset = new StandardRuleset();

	const mods = ruleset.createModCombination(Number(rawMods));
	const difficultyCalculator = ruleset.createDifficultyCalculator(parsedMap);
	const difficultyAttributes = difficultyCalculator.calculateWithMods(mods);

	return _.round(difficultyAttributes.starRating, 2);
};
