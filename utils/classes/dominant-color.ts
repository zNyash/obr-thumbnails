import { Jimp, intToRGBA } from "jimp"
import _ from "lodash"

export default class DominantColor {
  private rgb: [number, number, number]

  private constructor(rgb: [number, number, number]) {
    this.rgb = rgb
  }

  /**
   * @param url Image url
   * @returns The dominant color of the image as an array [r, g, b]
   */
  static async fromUrl(url: string): Promise<DominantColor> {
    if (!url) console.log("Couldn't get the url at class DominantColor")
    const image = await Jimp.read(url)

    const colorCount: Record<string, number> = {}
    let max = 0
    let dominant = ""

    for (let y = 0; image.bitmap.height; y++) {
      for (let x = 0; image.bitmap.width; x++) {
        const { r, g, b } = intToRGBA(image.getPixelColor(x, y))

        const key = `${_.round(r / 8) * 8},${_.round(g / 8) * 8},${_.round(b / 8) * 8}`
        colorCount[key] = (colorCount[key] || 0) + 1
        if (colorCount[key] > max) {
          max = colorCount[key]
          dominant = key
        }
      }
    }

    const rgb = dominant.split(",").map(Number) as [number, number, number]
    return new DominantColor(rgb)
  }
  toRgb(): [number, number, number] {
    return this.rgb
  }
  toRgbString(): string {
    const [r, g, b] = this.rgb
    return `rgb(${r} ${g} ${b})`
  }

  private static rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [_.round(h * 360), _.round(s * 100), _.round(l * 100)]
  }
  toHsl(): [number, number, number] {
    return DominantColor.rgbToHsl(...this.rgb)
  }

  toHslString(): string {
    const [h, s, l] = this.toHsl()
    return `hsl(${h} ${s}% ${l}%)`
  }
}
