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
