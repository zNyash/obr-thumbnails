export interface IBeatmapInfo {
  beatmapset_id: number
  difficulty_rating: number
  id: number
  mode: string
  status: string
  total_length: number
  user_id: number
  version: string
  accuracy: number
  ar: number
  bpm: number
  convert: boolean
  count_circles: number
  count_sliders: number
  count_spinners: number
  cs: number
  deleted_at: unknown
  drain: number
  hit_length: number
  is_scoreable: boolean
  last_updated: string
  mode_int: number
  passcount: number
  playcount: number
  ranked: number
  url: string
  checksum: string
  beatmapset: Beatmapset
  current_user_playcount: number
  failtimes: Failtimes
  max_combo: number
  owners: Owner[]
}

interface Beatmapset {
  artist: string
  artist_unicode: string
  covers: Covers
  creator: string
  favourite_count: number
  hype: unknown
  id: number
  nsfw: boolean
  offset: number
  play_count: number
  preview_url: string
  source: string
  spotlight: boolean
  status: string
  title: string
  title_unicode: string
  track_id: number
  user_id: number
  video: boolean
  bpm: number
  can_be_hyped: boolean
  deleted_at: unknown
  discussion_enabled: boolean
  discussion_locked: boolean
  is_scoreable: boolean
  last_updated: string
  legacy_thread_url: string
  nominations_summary: NominationsSummary
  ranked: number
  ranked_date: unknown
  rating: number
  storyboard: boolean
  submitted_date: string
  tags: string
  availability: Availability
  ratings: number[]
}

interface Covers {
  cover: string
  "cover@2x": string
  card: string
  "card@2x": string
  list: string
  "list@2x": string
  slimcover: string
  "slimcover@2x": string
}

interface NominationsSummary {
  current: number
  eligible_main_rulesets: string[]
  required_meta: RequiredMeta
}

interface RequiredMeta {
  main_ruleset: number
  non_main_ruleset: number
}

interface Availability {
  download_disabled: boolean
  more_information: unknown
}

interface Failtimes {
  fail: number[]
  exit: number[]
}

interface Owner {
  id: number
  username: string
}
