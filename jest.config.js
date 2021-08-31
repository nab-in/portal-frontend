module.exports = {
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    // "<rootDir>/node_modules/"
  ],
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "pages"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
}
