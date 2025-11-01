import { getCookie, sendRedirect } from 'h3'
import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.passwordProtection.enabled) {
    return
  }

  const path = event.path

  if (path.startsWith('/__protected')) {
    return
  }

  const sessionToken = getCookie(event, 'nuxt-protected')

  if (!sessionToken) {
    return sendRedirect(event, '/__protected', 302)
  }

  const parts = sessionToken.split('.')
  if (parts.length !== 2) {
    return sendRedirect(event, '/__protected', 302)
  }

  const [timestamp, signature] = parts

  const isValid = verifyToken(timestamp, signature, config.passwordProtection.sessionSecret)

  if (!isValid) {
    return sendRedirect(event, '/__protected', 302)
  }

  const sessionAge = Date.now() - parseInt(timestamp, 10)
  const maxAge = 30 * 24 * 60 * 60 * 1000

  if (sessionAge > maxAge) {
    return sendRedirect(event, '/__protected', 302)
  }
})
