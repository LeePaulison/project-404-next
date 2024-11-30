module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__tests__'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  preset: 'ts-jest',
};