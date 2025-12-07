import sharp from "sharp"

export type RGB = { r: number; g: number; b: number }
export type HSL = [number, number, number]

/**
 * ColorExtractor
 * Extracts a representative main color from an image using K-means clustering.
 */
export class ColorExtractor {
  private clusters: number

  /**
   * @param clusters Number of clusters used in K-means color quantization.
   */
  constructor(clusters = 5) {
    this.clusters = clusters
  }

  /**
   * Processes the image buffer and extracts the dominant HSL color.
   * @param input Raw image buffer.
   * @returns {Promise<HSL>} Dominant color in HSL format.
   */
  async getMainColor(input: Buffer): Promise<HSL> {
    const pixels = await this.extractPixels(input)
    const dominant = this.kmeans(pixels, this.clusters)
    return this.rgbToHsl(dominant.r, dominant.g, dominant.b)
  }

  // -------------------------------------------------------
  // IMAGE → PIXEL EXTRACTION
  // -------------------------------------------------------

  /**
   * Extracts and downsamples image pixels for processing.
   * @param input Image buffer.
   * @returns {Promise<RGB[]>} Array of RGB pixels.
   */
  private async extractPixels(input: Buffer): Promise<RGB[]> {
    const { data } = await sharp(input)
      .resize(50, 50, { fit: "inside" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const pixels: RGB[] = []
    for (let i = 0; i < data.length; i += 3) {
      pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] })
    }
    return pixels
  }

  // -------------------------------------------------------
  // K-MEANS COLOR QUANTIZATION
  // -------------------------------------------------------

  /**
   * Runs K-means color quantization.
   * @param pixels Array of RGB pixels.
   * @param k Number of clusters.
   * @returns {RGB} Dominant quantized color.
   */
  private kmeans(pixels: RGB[], k: number): RGB {
    let centroids = this.pickInitialCentroids(pixels, k)

    for (let iteration = 0; iteration < 8; iteration++) {
      const groups = Array.from({ length: k }, () => [] as RGB[])
      for (const p of pixels) {
        const idx = this.nearestCentroid(p, centroids)
        groups[idx].push(p)
      }

      centroids = groups.map((g, i) => (g.length ? this.averageColor(g) : centroids[i]))
    }

    const groups = Array.from({ length: k }, () => [] as RGB[])
    for (const p of pixels) {
      groups[this.nearestCentroid(p, centroids)].push(p)
    }

    const largest = groups.sort((a, b) => b.length - a.length)[0]
    return this.averageColor(largest)
  }

  /**
   * Selects k random initial centroids.
   */
  private pickInitialCentroids(pixels: RGB[], k: number): RGB[] {
    return [...pixels].sort(() => Math.random() - 0.5).slice(0, k)
  }

  /**
   * Finds nearest centroid using squared Euclidean distance.
   */
  private nearestCentroid(p: RGB, centroids: RGB[]): number {
    let best = 0
    let min = Infinity

    centroids.forEach((c, idx) => {
      const d = (p.r - c.r) ** 2 + (p.g - c.g) ** 2 + (p.b - c.b) ** 2

      if (d < min) {
        min = d
        best = idx
      }
    })
    return best
  }

  /**
   * Computes the average RGB color of a cluster.
   */
  private averageColor(pixels: RGB[]): RGB {
    let r = 0,
      g = 0,
      b = 0
    for (const p of pixels) {
      r += p.r
      g += p.g
      b += p.b
    }
    const n = pixels.length
    return { r: (r / n) | 0, g: (g / n) | 0, b: (b / n) | 0 }
  }

  // -------------------------------------------------------
  // RGB → HSL
  // -------------------------------------------------------

  /**
   * Converts an RGB color to HSL format.
   * @returns {HSL} [h, s, l]
   */
  private rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    let h = 0,
      s = 0

    if (max !== min) {
      const d = max - min
      s = d / (1 - Math.abs(2 * l - 1))

      switch (max) {
        case r:
          h = ((g - b) / d) % 6
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }

      h *= 60
      if (h < 0) h += 360
    }

    return [h, s, l]
  }
}

