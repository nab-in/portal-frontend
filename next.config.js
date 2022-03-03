const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  publicRuntimeConfig: {
    API_URL: `${process.env.API_URL}`,
    DASH_URL: `${process.env.DASHBOARD_URL}`,
    BACKEND_URL: `${process.env.API_URL}`,
  },
});