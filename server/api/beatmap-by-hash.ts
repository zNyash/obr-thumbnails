import axios from "axios"

export default defineEventHandler(async (event) => {
  const { md5 } = getQuery(event)
  const OSU_TOKEN = process.env.OSU_TOKEN

  try {
    const { data } = await axios.get(
      `https://osu.ppy.sh/api/v2/beatmaps/lookup?checksum=${md5}`,
      {
        headers: {
          Authorization: `Bearer ${OSU_TOKEN}`,
        },
      }
    )
    return data
  } catch (error) {
    return { "Failed to get beatmap by hash from osu api: ": error }
  }
})
