import _ from "lodash"
import sharp from "sharp"
import { ColorExtractor } from "../utils/getMainColor"

export default defineEventHandler(async (event) => {
  const query = await readBody(event)
  if (!query) return

  const url = query.url as string
  const response = await fetch(url)
  const rawBuffer = Buffer.from(await response.arrayBuffer())

  const cleanedImage = await sharp(rawBuffer).png().toBuffer()

  const quantizer = new ColorExtractor(1)
  let [h, s, l] = await quantizer.getMainColor(cleanedImage)

  h = _.round(h)
  s = _.round(_.clamp(s * 100, 30, 50))
  l = _.round(_.clamp(l * 100, 40, 50))

  const color = {
    base: `hsl(${h} ${s} ${l})`,
    glow: `hsl(${h} ${65} ${60})`,
  }

  return color
})
