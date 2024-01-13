// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [],
  modules: ["@nuxtjs/google-fonts", "@nuxt/content"],
  googleFonts: {
    families: {
      Roboto: true,
      Raleway: true,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
})
