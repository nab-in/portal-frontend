const withPWA = require("next-pwa")
// const runtimeCaching = require("next-pwa/cache")

// module.exports = withPWA({
module.exports = {
  // pwa: {
  //   dest: "public",
  //   runtimeCaching,
  // },
  publicRuntimeConfig: {
    API_URL: "http://107.191.98.130/backend/api",
  },
}
// )
