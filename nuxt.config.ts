// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon"],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [{ name: "Nunito", provider: "google" }],
    defaults: {
      preload: true,
    },
  },

  css: ["~/assets/css/main.css"],
})
