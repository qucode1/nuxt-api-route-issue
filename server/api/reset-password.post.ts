// import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    console.log('resetPassword')
    return
  } catch (error) {
    console.log('reset password error', { error })
    return sendError(event, createError({
      ...error,
      statusMessage: error.message,
    }))
  }
})
