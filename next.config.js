const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  publicRuntimeConfig: {
    API_URL: "../api",
    DASH_URL: "../dashboard",
    BACKEND_URL: "../api",
  },
});