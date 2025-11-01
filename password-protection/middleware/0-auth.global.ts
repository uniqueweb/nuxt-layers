import { getCookie } from 'h3'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/__protected')) {
    return
  }

  if (to.path.startsWith('/api/__protected') || to.path.startsWith('/_nuxt')) {
    return
  }

  const config = useRuntimeConfig()

  if (!config.public.passwordProtectionEnabled) {
    return
  }

  if (import.meta.server) {
    const event = useRequestEvent()
    if (!event) return

    const sessionToken = getCookie(event, 'nuxt-protected')

    if (!sessionToken) {
      return navigateTo('/__protected')
    }

    const parts = sessionToken.split('.')
    if (parts.length !== 2) {
      return navigateTo('/__protected')
    }

    const [timestamp] = parts
    const sessionAge = Date.now() - parseInt(timestamp, 10)
    const maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days

    if (sessionAge > maxAge) {
      return navigateTo('/__protected')
    }
  }

  if (import.meta.client) {
    const cookies = document.cookie.split(';')
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('nuxt-protected='))

    if (!sessionCookie) {
      return navigateTo('/__protected')
    }
  }
})
