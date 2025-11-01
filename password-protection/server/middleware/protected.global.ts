import {
  getCookie,
  sendRedirect
} from 'h3'
import { verifyToken } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (process.env.NODE_ENV === 'development') {
    return
  }

  if (!config.passwordProtection.enabled) {
    return
  }

  const path = event.path
  const sessionToken = getCookie(event, 'nuxt-protected')

  // Helper function to verify if session is valid
  const isSessionValid = () => {
    if (!sessionToken) {
      return false
    }

    const parts = sessionToken.split('.')
    if (parts.length !== 2) {
      return false
    }

    const [timestamp, signature] = parts
    const isValid = verifyToken(timestamp, signature, config.passwordProtection.sessionSecret)

    if (!isValid) {
      return false
    }

    const sessionAge = Date.now() - parseInt(timestamp, 10)
    const maxAge = 30 * 24 * 60 * 60 * 1000

    if (sessionAge > maxAge) {
      return false
    }

    return true
  }

  // If user is on __protected page and already verified, redirect to startpage
  if (path === '/__protected') {
    if (isSessionValid()) {
      return sendRedirect(event, '/', 302)
    }
    return
  }

  // Skip authentication for API routes and __protected page
  if (path.startsWith('/api')) {
    return
  }

  // For all other pages, check if user is verified
  if (!isSessionValid()) {
    return sendRedirect(event, '/__protected', 302)
  }
})
