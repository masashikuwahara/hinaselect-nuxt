export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

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
