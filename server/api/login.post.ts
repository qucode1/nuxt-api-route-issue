import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body;

    if (!username || !password) {
        throw createError({ statusMessage: "Missing username or password. (login.post)" });
    }

    const user = {
        username,
    }

    return user
  } catch (error) {
    console.log('app token api error', { error })
    return sendError(event, createError({
      ...error,
      statusMessage: error.message,
    }))
  }
})
