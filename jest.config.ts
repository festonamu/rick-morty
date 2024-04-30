import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  verbose: true,
  automock: false,
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__tests__"
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
}
export default config