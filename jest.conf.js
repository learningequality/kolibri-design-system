const baseConfig = require('kolibri-tools/jest.conf');

module.exports = Object.assign(baseConfig, {
  transformIgnorePatterns: [
    '/node_modules/(?!(keen-ui|kolibri-tools)/).*/',
  ],
  collectCoverageFrom: [
    'lib/**/*.{js|vue}',
    '!**/node_modules/**',
    'utils/*.{js|vue}',
  ],
});
