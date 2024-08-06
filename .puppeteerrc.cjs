const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: process.env.CI ? join(__dirname, '.cache', 'puppeteer') : undefined,
};
