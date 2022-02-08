const path = require('path');

const moduleNameMapper = {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': path.resolve(
    __dirname,
    './fileMock.js'
  ),
};

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  moduleFileExtensions: ['js', 'json', 'vue'],
  moduleNameMapper,
  testEnvironment: 'jsdom',
  testURL: 'http://kolibri.time',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'vue-jest': {
      hideStyleWarn: true,
      experimentalCSSCompile: true,
    },
  },
  setupFilesAfterEnv: [path.resolve(__dirname, './setup')],
  verbose: true,
};
