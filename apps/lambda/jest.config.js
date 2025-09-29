module.exports = {
  moduleNameMapper: {
    '^/opt/nodejs/(.*)$': '<rootDir>/$1'
  },
  moduleFileExtensions: ['js', 'ts'],
  maxWorkers: '49%',
  rootDir: 'src',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: [
    '**/*/*.(t|j)s',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/layers/**',
    '!**/utils/**/index.ts',
    '!**/utils/**/prismaClient.ts',
    '!**/types/index.ts'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }]
  ],
  coverageReporters: [
    'text',
    ['text', { file: 'coverage.txt' }],
    ['html'],
    ['json-summary', { file: 'coverage-summary.json' }]
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
