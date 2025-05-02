/**
 * @param url Url of the image
 * @returns Hex code of the color
 */
export default async (url: string): Promise<string> => {
  const response = await $fetch("/api/main-color", {
    method: "POST",
    body: {
      url: url,
    },
  })
  if (!response) {
    console.log("Failed to fetch backend api for 'main-color'")
    return "#121212"
  }
  if (typeof response === "object" && "message" in response) return "#242424"

  console.log("HSL: ", response)
  return response
}
