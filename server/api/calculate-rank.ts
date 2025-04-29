import { tools } from "osu-api-extended"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const hits = {
    300: query.count300,
    100: query.count100,
    50: query.count50,
    0: query.count0,
  }
  const result = tools.calculate_rank(hits, Number(query.rawMods), 0)
  return result
})
