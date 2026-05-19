/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@babel/runtime|chalk|gradient-string|boxen|discord.js-selfbot-v13|node-fetch)/)"
  ],
  silent: true
};