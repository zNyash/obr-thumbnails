import type { IBeatmapInfo } from "~/types/IBeatmapInfo"

/**
 * 
 * @param md5 The beatmap md5 hash
 */
export default async function(md5: string) {
  const {data} = await useFetch(`/api/beatmap-by-hash?md5=${md5}`)
  const beatmapInfoData: IBeatmapInfo = await data.value
  return beatmapInfoData
  
}