import _ from "lodash";
import type { ICalcAttrs } from "~/types/ICalcAttrs";
import type { IMapAttributes } from "~/types/IMapAttributes";

/**
 * @param mapFile Osu beatmap file as string
 * @param rawMods Bitwise value of mods combination
 * @returns Beatmap difficulty attributes.
 */
export default async (mapFile: string, rawMods: number | string, attrs: ICalcAttrs): Promise<IMapAttributes> => {
	console.log("Size of mapFile:", mapFile.length, "characters");
	try {
		const response = await $fetch("/api/calculate-map-attributes", {
			method: "POST",
			body: {
				mapFile: mapFile,
				rawMods: rawMods,
        accuracy: attrs.accuracy,
        combo: attrs.combo,
        n300: attrs.n300,
        n100: attrs.n100,
        n50: attrs.n50,
        misses: attrs.misses,
			},
		});
		console.log("Star Rating Caclulation Response: ", response);
    return response
	} catch (fetchError) {
		console.error("Failed to fetch backend api for 'calculate-sr':", fetchError);
    return {pp: 0, starRating: 0}
	}
};
