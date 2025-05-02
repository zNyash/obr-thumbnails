import type { IMainColors } from "~/types/IMainColors"

const defaultColor: IMainColors = {
  base: `hsl(${0} ${40} ${50})`,
  glow: `hsl(${0} ${80} ${60})`,
}

/**
 * @param url Url of the image
 * @returns Hex code of the color
 */
export default async (url: string): Promise<IMainColors> => {
  const response = await $fetch("/api/main-color", {
    method: "POST",
    body: {
      url: url,
    },
  })
  if (!response) {
    console.log("Failed to fetch backend api for 'main-color'")
    return defaultColor
  }
  if (typeof response === "object" && "message" in response) return defaultColor

  console.log("HSL: ", response)
  return response
}
