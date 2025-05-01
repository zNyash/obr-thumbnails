/**
 * @param rawMods Bitwise value of the mods.
 * @param count300 Amount of 300s on the replay.
 * @param count100 Amount of 100s on the replay.
 * @param count50 Amount of 50s on the replay.
 * @param count0 Amount of misses on the replay.
 * @returns A string containing the score rank. Example: "S"
 */
export default async (
  rawMods: number | string,
  count300: number,
  count100: number,
  count50: number,
  count0: number
) => {
  const response = await $fetch(
    `/api/calculate-rank?count300=${count300}&count100=${count100}&count50=${count50}&count0=${count0}&rawMods=${rawMods}`
  )
  return response.rank
}
