import type { IBeatmapInfo } from "~/types/IBeatmapInfo"

/**
 * @param md5 The beatmap md5 hash. Example: "73e414af70392b8451127381669959a4"
 * @returns An object containing all information about the beatmap.
 */
export default async (md5: string): Promise<IBeatmapInfo> => {
  try {
    const data: IBeatmapInfo = await $fetch<IBeatmapInfo>(`/api/beatmaps/lookup?md5=${md5}`)
    return data
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `❌ Backend error (${error.response.status}): ${error.response.statusText || "Unknown error"}`
      )
    } else if (error.request) {
      throw new Error("❌ Could not connect to backend server for /api/beatmaps/lookup.")
    } else {
      throw new Error(
        `❌ An unexpected error occurred during beatmap lookup: ${error.message || "Unknown error"}`
      )
    }
  }
}
