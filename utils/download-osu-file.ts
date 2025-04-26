
export default async (beatmapId: string): Promise<unknown> => {
  const response = await $fetch(`/api/mapdl?id=${beatmapId}`)
  console.log("Map Data: ", response)
  return response
}
