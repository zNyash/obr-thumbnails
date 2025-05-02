import _ from "lodash"
import type { ScoreInfo } from "osu-classes"
import type { ICalcAttrs } from "~/types/ICalcAttrs"
import type { IMapAttributes } from "~/types/IMapAttributes"

/**
 * @param mapFile Osu beatmap file as string
 * @param scoreInfo Replay information object
 * @returns Beatmap difficulty attributes.
 */
export default async (mapFile: string, scoreInfo: ScoreInfo): Promise<IMapAttributes> => {
  console.log("Size of mapFile:", mapFile.length, "characters")
  try {
    const response = await $fetch("/api/calculate-map-attributes", {
      method: "POST",
      body: {
        mapFile: mapFile,
        rawMods: scoreInfo.rawMods,
        accuracy: scoreInfo.accuracy,
        maxCombo: scoreInfo.maxCombo,
        countMiss: scoreInfo.countMiss,
        count300: scoreInfo.count300,
        count100: scoreInfo.count100,
        count50: scoreInfo.count50,
        countGeki: scoreInfo.countGeki,
        countKatu: scoreInfo.countKatu,
      },
    })
    console.log("Star Rating Caclulation Response: ", response)
    return response
  } catch (fetchError) {
    console.error("Failed to fetch backend api for 'calculate-sr':", fetchError)
    return { pp: 0, starRating: 0, ppMax: 0 }
  }
}
