require("dotenv").config()
const webpack = require("webpack")
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
}

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     runtimeCaching,
//   }
// })
