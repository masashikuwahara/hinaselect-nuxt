export default defineNuxtConfig({
  srcDir: '.',
  compatibilityDate: '2025-10-22',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/main.css'],

  app: {
    head: {
      titleTemplate: '%s - HINASELECT',
      meta: [
        { name: 'description', content: '日向坂46 推しメン診断 HINASELECT' },
        { name: 'format-detection', content: 'email=no,telephone=no,address=no' },
      ],
    },
  },
});
