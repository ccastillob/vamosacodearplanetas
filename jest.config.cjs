module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./custom.setup.js'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}