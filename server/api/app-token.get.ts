export default defineEventHandler(async (event) => {
  try {
    const appToken = await new Promise((res) => {
        setTimeout(() => {
            res('my-token')
        }, 0)
    })
    return appToken
  } catch (error) {
    console.log('app token api error', { error })
    return sendError(event, createError({
      ...error,
      statusMessage: error.message,
    }))
  }
})
