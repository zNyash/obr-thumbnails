import { osuApi } from "../lib/osuApi"

export default defineEventHandler(async (event) => {
  const { username } = await readBody(event)

  try {
    const playerInfo = await osuApi.getUser(username)
    return playerInfo
  } catch (error: any) {
    console.error("🔴 Error in route /api/player:", error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage:
        error.statusMessage || "🔴 Internal server error processing player information request",
      data: error.data,
    })
  }
})
