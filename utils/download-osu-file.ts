
export default async (beatmapId: string): Promise<unknown> => {
  const response = await $fetch(`/api/mapdl?id=${beatmapId}`)
  const osuFile = await response
  return osuFile
}
