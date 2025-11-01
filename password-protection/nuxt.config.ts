// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-11-01',
  runtimeConfig: {
    passwordProtection: {
      enabled: process.env.PASSWORD_PROTECTION_ENABLED,
      password: process.env.PASSWORD_PROTECTION_PASSWORD,
      sessionSecret: process.env.PASSWORD_PROTECTION_SESSION_SECRET,
    },
  },
  imports: {
    dirs: ['composables'],
  }
})
