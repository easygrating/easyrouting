/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: { "^.+\\.ts?$": "ts-jest" },
  testRegex: "/test/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: ["index.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
};
