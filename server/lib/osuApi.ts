import { NitroFetchOptions, NitroFetchRequest } from "nitropack"
import { IBeatmapInfo } from "~/types/IBeatmapInfo"
import { IPlayerInfo } from "~/types/IPlayerInfo"

interface IOsuTokenResponse {
  access_token: string
  expires_in: number
}

interface IOsuApiOptions
  extends NitroFetchOptions<
    NitroFetchRequest,
    "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"
  > {}

class OsuApi {
  private url = {
    api: "https://osu.ppy.sh/api/v2",
    token: "https://osu.ppy.sh/oauth/token",
    mapFile: "https://osu.ppy.sh/osu",
  }
  private clientId: string | undefined
  private clientSecret: string | undefined

  private token: string | null = null
  private tokenExpiry: number = 0

  constructor() {
    this.clientId = process.env.OSU_CLIENT_ID
    this.clientSecret = process.env.OSU_CLIENT_SECRET

    if (!this.clientId || !this.clientSecret) {
      console.error("🔴 OSU_CLIENT_ID or OSU_CLIENT_SECRET is not defined at enviroment variables.")
    }
  }

  private async getAuthToken(): Promise<string> {
    if (!this.clientId || !this.clientSecret) {
      return Promise.reject(
        createError({
          statusCode: 500,
          statusMessage:
            "🔴 OSU_CLIENT_ID or OSU_CLIENT_SECRET is not defined at enviroment variables.",
        })
      )
    }

    const response = await $fetch<IOsuTokenResponse>(this.url.token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "client_credentials",
        scope: "public",
      },
    }).catch((error) => {
      console.error("🔴 Error getting osu! API token:", error)
      throw createError({
        statusCode: error.response.status || 500,
        statusMessage: "🔴 Error getting osu! API token",
        data: error.data,
      })
    })

    this.token = response.access_token
    this.tokenExpiry = Date.now() + response.expires_in * 1000 - 60000

    console.log("🟢 New osu API token obtained.")
    return this.token
  }

  private async ensureTokenIsValid(): Promise<string> {
    if (!this.token || Date.now() >= this.tokenExpiry) {
      return this.getAuthToken()
    }
    return Promise.resolve(this.token)
  }

  private async request<T>(
    endpoint: string,
    options?: IOsuApiOptions,
    urlMode?: "API" | "MAPFILE"
  ) {
    const validToken = await this.ensureTokenIsValid()
    let url: string
    let fetchOptions: IOsuApiOptions = {
      headers: {
        Authorization: `Bearer ${validToken}`,
        "Content-Type": "application/json",
      },
      method: options?.method || "GET",
    }

    if (options) {
      fetchOptions = { ...fetchOptions, ...options }
    }

    switch (urlMode) {
      case "API": {
        url = this.url.api
        break
      }
      case "MAPFILE": {
        url = this.url.mapFile
        break
      }
      default: {
        url = this.url.api
      }
    }

    return $fetch<T>(`${url}${endpoint}`, fetchOptions).catch((error) => {
      console.error("🔴 Error in osu API request to")
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage:
          error.response?.statusText || `Erro na requisição da API do osu! para ${endpoint}`,
        data: error.data,
      })
    })
  }

  /**
   * Fetches user information from the osu! API by username.
   * @param username The username of the player.
   * @returns A Promise that resolves with the player information or rejects with an error.
   */
  public async getUser(username: string): Promise<IPlayerInfo> {
    return this.request<IPlayerInfo>(`/users/${username}`)
  }

  /**
   * Fetches beatmap information from the osu! API using its MD5 checksum.
   * @param checksum The MD5 checksum of the beatmap.
   * @returns A Promise that resolves with the beatmap information or rejects with an error.
   */
  public async getBeatmapByChecksum(checksum: string): Promise<IBeatmapInfo> {
    return this.request<IBeatmapInfo>(`/beatmaps/lookup?checksum=${checksum}`)
  }

  /**
   * Fetches the .osu file content for a given beatmap ID.
   * @param beatmapId The ID of the beatmap difficulty (can be a number or string).
   * @returns A Promise that resolves with the content of the .osu file as a string or rejects with an error.
   */
  public async getBeatmapOsuFile(beatmapId: number | string): Promise<string> {
    return this.request(`/${beatmapId}`, {}, "MAPFILE")
  }
}

export const osuApi = new OsuApi()
