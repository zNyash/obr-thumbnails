/**
 * @param beatmapId The ID of the beatmap (not beatmap set)
 * @returns osu file as a string.
 */
export default async (beatmapId: string | number): Promise<string> => {
  const response = await $fetch(`/api/mapdl?id=${beatmapId}`)
  // console.log("Map Data: ", response)
  return response
}
