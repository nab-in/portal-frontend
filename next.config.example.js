const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  publicRuntimeConfig: {
    API_URL: "http://localhost:5000/api",
    DASH_URL: "http://localhost:3005",
    BACKEND_URL: "http://localhost:5000",
  },
})
