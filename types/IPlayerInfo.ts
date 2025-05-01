export interface IPlayerInfo {
  avatar_url: string
  country_code: string
  default_group: string
  id: number
  is_active: boolean
  is_bot: boolean
  is_deleted: boolean
  is_online: boolean
  is_supporter: boolean
  last_visit: string
  pm_friends_only: boolean
  profile_colour: any
  username: string
  cover_url: string
  discord: string
  has_supported: boolean
  interests: string
  join_date: string
  location: string
  max_blocks: number
  max_friends: number
  occupation: any
  playmode: string
  playstyle: string[]
  post_count: number
  profile_hue: number
  profile_order: string[]
  title: any
  title_url: any
  twitter: string
  website: string
  country: Country
  cover: Cover
  kudosu: Kudosu
  account_history: any[]
  active_tournament_banner: any
  active_tournament_banners: any[]
  badges: any[]
  beatmap_playcounts_count: number
  comments_count: number
  current_season_stats: any
  daily_challenge_user_stats: DailyChallengeUserStats
  favourite_beatmapset_count: number
  follower_count: number
  graveyard_beatmapset_count: number
  groups: any[]
  guest_beatmapset_count: number
  loved_beatmapset_count: number
  mapping_follower_count: number
  monthly_playcounts: MonthlyPlaycount[]
  nominated_beatmapset_count: number
  page: Page
  pending_beatmapset_count: number
  previous_usernames: string[]
  rank_highest: RankHighest
  ranked_beatmapset_count: number
  replays_watched_counts: ReplaysWatchedCount[]
  scores_best_count: number
  scores_first_count: number
  scores_pinned_count: number
  scores_recent_count: number
  statistics: Statistics
  support_level: number
  team: Team
  user_achievements: UserAchievement[]
  rank_history: RankHistory
  rankHistory: RankHistory2
  ranked_and_approved_beatmapset_count: number
  unranked_beatmapset_count: number
}

interface Country {
  code: string
  name: string
}

interface Cover {
  custom_url: string
  url: string
  id: any
}

interface Kudosu {
  available: number
  total: number
}

interface DailyChallengeUserStats {
  daily_streak_best: number
  daily_streak_current: number
  last_update: string
  last_weekly_streak: string
  playcount: number
  top_10p_placements: number
  top_50p_placements: number
  user_id: number
  weekly_streak_best: number
  weekly_streak_current: number
}

interface MonthlyPlaycount {
  start_date: string
  count: number
}

interface Page {
  html: string
  raw: string
}

interface RankHighest {
  rank: number
  updated_at: string
}

interface ReplaysWatchedCount {
  start_date: string
  count: number
}

interface Statistics {
  count_100: number
  count_300: number
  count_50: number
  count_miss: number
  level: Level
  global_rank: number
  global_rank_exp: any
  pp: number
  pp_exp: number
  ranked_score: number
  hit_accuracy: number
  play_count: number
  play_time: number
  total_score: number
  total_hits: number
  maximum_combo: number
  replays_watched_by_others: number
  is_ranked: boolean
  grade_counts: GradeCounts
  country_rank: number
  rank: Rank
}

interface Level {
  current: number
  progress: number
}

interface GradeCounts {
  ss: number
  ssh: number
  s: number
  sh: number
  a: number
}

interface Rank {
  country: number
}

interface Team {
  flag_url: string
  id: number
  name: string
  short_name: string
}

interface UserAchievement {
  achieved_at: string
  achievement_id: number
}

interface RankHistory {
  mode: string
  data: number[]
}

interface RankHistory2 {
  mode: string
  data: number[]
}
