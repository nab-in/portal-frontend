module.exports = {
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    // "<rootDir>/node_modules/"
  ],
  moduleDirectories: ["node_module", "pages"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
}
