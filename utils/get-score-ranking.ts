import type { ScoreInfo } from "osu-classes"

/**
 * @param scoreInfo Replay information object
 * @returns A string containing the score rank. Example: "S"
 */
export default async (scoreInfo: ScoreInfo): Promise<string> => {
  const response = await $fetch(
    `/api/calculate-rank?count300=${scoreInfo.count300}&count100=${scoreInfo.count100}&count50=${scoreInfo.count50}&count0=${scoreInfo.countMiss}&rawMods=${scoreInfo.rawMods}`
  )
  return response.rank
}
