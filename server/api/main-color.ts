import _ from "lodash"
import dominantColor from "~/utils/classes/dominant-color"

export default defineEventHandler(async (event) => {
  const query = await readBody(event)
  if (!query) return

  const url = query.url as string
  const image = await dominantColor.fromUrl(url)
  let [h, s, l] = image.toHsl()

  if (!image) {
    return {
      message: "Something went wrong trying to get dominant color from image on the backend",
    }
  }

  h = h * 100
  s = _.clamp(s * 100, 30, 50)
  l = _.clamp(l * 100, 40, 50)

  return `hsl(${h} ${s} ${l})`
})
