import type { IPlayerInfo } from "~/types/IPlayerInfo"

export default async (username: string): Promise<IPlayerInfo> => {
  const response = await $fetch(`/api/player`, {
    method: "POST",
    body: {
      username: username,
    },
  })

  const data: IPlayerInfo = (await response) as any

  return data
}
