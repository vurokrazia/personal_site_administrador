const Dotenv = require('dotenv-webpack');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
}