export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const beatmapId = query.id as string

  if (!beatmapId) return sendError(event, new Error("Missing beatmap id"))

  const response = await fetch(`https://osu.ppy.sh/osu/${beatmapId}`)
  if (!response.ok) return sendError(event, new Error("Failed to fetch .osu file"))

  const osuFile = await response.text()

  setHeader(event, "Content-Type", "text/plain; charset=utf-8")
  return osuFile
})
