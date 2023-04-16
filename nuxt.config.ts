// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  build: {
    transpile: ["trpc-nuxt"],
  },
  nitro: {
    esbuild: {
      options: {
        // Top-level await
        target: "es2022",
      },
    },
  },
});
