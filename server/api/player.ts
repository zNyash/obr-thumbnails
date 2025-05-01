export default defineEventHandler(async (event) => {
  const { username } = await readBody(event)
  const OSU_TOKEN = process.env.OSU_TOKEN

  const response = await $fetch(`https://osu.ppy.sh/api/v2/users/${username}`, {
    headers: {
      Authorization: `Bearer ${OSU_TOKEN}`,
    },
  })
  return response
})
