import { osuApi } from "../../lib/osuApi"
import { IBeatmapInfo } from "~/types/IBeatmapInfo"

export default defineEventHandler(async (event) => {
  const { md5 }: { md5: string } = getQuery(event)

  try {
    const playerInfo: IBeatmapInfo = await osuApi.getBeatmapByChecksum(md5)
    return playerInfo
  } catch (error: any) {
    console.error("🔴 Error in route /api/beatmap-by-hash:", error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage:
        error.statusMessage || "🔴 Internal server error processing beatmap download request",
      data: error.data,
    })
  }
})
