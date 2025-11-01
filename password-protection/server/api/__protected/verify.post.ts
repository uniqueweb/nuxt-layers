import { readBody, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!body.password) {
    throw createError({
      statusCode: 400,
      message: 'Password is required',
    })
  }

  if (body.password !== config.passwordProtection.password) {
    throw createError({
      statusCode: 401,
      message: 'Invalid password',
    })
  }

  const timestamp = Date.now().toString()
  const signature = signToken(timestamp, config.passwordProtection.sessionSecret)
  const sessionValue = `${timestamp}.${signature}`

  setCookie(event, 'nuxt-protected', sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return {
    success: true,
    message: 'Authentication successful',
  }
})
