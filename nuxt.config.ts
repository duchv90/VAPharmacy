// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/global.css'],
  googleFonts: {
    display: 'swap',
    subsets: 'latin-ext',
    families: {
      Jost: true,
    },
  },
})
