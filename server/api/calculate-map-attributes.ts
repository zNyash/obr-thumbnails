import _ from "lodash"
import { Beatmap, Performance } from "rosu-pp-js"

export default defineEventHandler(async (event) => {
  const query = await readBody(event)
  const attr = {
    mapFile: query.mapFile as number,
    rawMods: query.rawMods as number,
    maxCombo: query.maxCombo as number,
    accuracy: query.accuracy as number,
    count300: query.count300 as number,
    count100: query.count100 as number,
    count50: query.count50 as number,
    countMiss: query.countMiss as number,
    countGeki: query.countGeki as number,
    countKatu: query.countKatu as number,
  }
  console.log(attr)
  const mapBuffer = Buffer.from(String(attr.mapFile), "utf-8")
  const map = new Beatmap(mapBuffer)

  const maxAttrs = new Performance({ mods: attr.rawMods }).calculate(map)
  const currAttrs = new Performance({
    accuracy: attr.accuracy * 100,
    mods: attr.rawMods,
    combo: attr.maxCombo,
    lazer: false,
    misses: attr.countMiss,
    n300: attr.count300,
    n100: attr.count100,
    n50: attr.count50,
    nGeki: attr.countGeki,
    nKatu: attr.countKatu,
  }).calculate(map)

  console.log(
    `PP: ${currAttrs.pp}/${maxAttrs.pp} | Stars: ${maxAttrs.difficulty.stars}`
  )
  return {
    starRating: _.round(currAttrs.difficulty.stars, 2),
    pp: _.round(currAttrs.pp, 2),
    ppMax: _.round(maxAttrs.pp, 2),
    rest: currAttrs,
  }
  // return currAttrs
})
