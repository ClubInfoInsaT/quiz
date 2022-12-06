// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  // https://nuxt.com/docs/getting-started/deployment#static-hosting
  ssr: false,

  // https://nuxt.com/docs/api/configuration/nuxt-config/#sourcemap
  sourcemap: {
    server: false,
    client: false,
  },
});
