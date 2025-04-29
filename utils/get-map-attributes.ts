import _ from "lodash"
import type { ICalcAttrs } from "~/types/ICalcAttrs"
import type { IMapAttributes } from "~/types/IMapAttributes"

/**
 * @param mapFile Osu beatmap file as string
 * @param rawMods Bitwise value of mods combination
 * @returns Beatmap difficulty attributes.
 */
export default async (
  mapFile: string,
  rawMods: number | string,
  attrs: ICalcAttrs
): Promise<IMapAttributes> => {
  console.log("Size of mapFile:", mapFile.length, "characters")
  try {
    const response = await $fetch("/api/calculate-map-attributes", {
      method: "POST",
      body: {
        mapFile: mapFile,
        rawMods: rawMods,
        accuracy: attrs.accuracy,
        maxCombo: attrs.maxCombo,
        countMiss: attrs.countMiss,
        count300: attrs.count300,
        count100: attrs.count100,
        count50: attrs.count50,
        countGeki: attrs.countGeki,
        countKatu: attrs.countKatu,
      },
    })
    console.log("Star Rating Caclulation Response: ", response)
    return response
  } catch (fetchError) {
    console.error("Failed to fetch backend api for 'calculate-sr':", fetchError)
    return { pp: 0, starRating: 0, ppMax: 0 }
  }
}
