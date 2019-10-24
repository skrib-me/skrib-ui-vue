
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
      loaderOptions: {
          sass: {
              prependData: `@import "@/assets/styles/_variables.scss";`
          }
      }
  },
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
