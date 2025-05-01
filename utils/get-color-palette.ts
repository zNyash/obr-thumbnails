import getColors from "get-image-colors"

/**
 * Extrai uma paleta de cores de uma imagem usando get-image-colors
 * @param url URL da imagem
 * @param numColors Quantidade de cores na paleta
 * @returns Array de cores em formato HEX
 */
export default async (url: string, numColors = 5) => {
  const colors = await getColors(url, { count: numColors })
  return colors.map((color) => color.hsl())
}
