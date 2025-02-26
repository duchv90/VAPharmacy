// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/VAPharmacy/',
  },
  nitro: {
    prerender: {
      routes: ['/', '/about', '/upload'],
    },
  },
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
});
