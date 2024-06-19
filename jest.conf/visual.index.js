const path = require('node:path');

process.env.JEST_PUPPETEER_CONFIG = require.resolve('../jest-puppeteer.config.js');

const moduleNameMapper = {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': path.resolve(
    __dirname,
    './fileMock.js'
  ),
};

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  preset: 'jest-puppeteer',
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper,
  testEnvironmentOptions: {
    url: 'http://localhost:4000/',
  },
  transform: {
    '^.+\\.js$': require.resolve('babel-jest'),
    '^.+\\.vue$': require.resolve('vue-jest'),
  },
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    URL: 'http://localhost:4000/',
    'vue-jest': {
      hideStyleWarn: true,
      experimentalCSSCompile: true,
    },
  },
  setupFilesAfterEnv: [path.resolve(__dirname, './setup.visual')],
  verbose: true,
};
