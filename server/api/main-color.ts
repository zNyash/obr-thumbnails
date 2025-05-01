import _ from "lodash"
import getColorPalette from "~/utils/get-color-palette"

export default defineEventHandler(async (event) => {
  const query = await readBody(event)
  if (!query) return

  const url = query.url as string

  let [[h, s, l]] = await getColorPalette(url, 1)

  h = _.round(h)
  s = _.round(_.clamp(s * 100, 30, 50))
  l = _.round(_.clamp(l * 100, 40, 50))

  return `hsl(${h} ${s} ${l})`
})
