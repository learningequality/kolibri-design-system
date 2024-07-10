const path = require('node:path');
const http = require('http');
const puppeteer = require('puppeteer');

/* eslint-disable no-console */

const SERVER_URL = 'http://localhost:4000/testing-playground';
const SERVER_TIMEOUT = 360000;
const WAIT_FOR_SELECTOR = '#testing-playground';
let setupDone = false;

const waitForServer = async (url, timeout = 30000) => {
  const start = Date.now();
  let waitingLogged = false;

  const checkServer = () => {
    return new Promise((resolve, reject) => {
      const req = http.get(url, res => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error(`Server responded with status code: ${res.statusCode}`));
        }
      });

      req.on('error', () => {
        if (!waitingLogged) {
          console.error('Waiting for server to respond.');
          waitingLogged = true;
        }
        resolve(false);
      });

      req.end();
    });
  };

  while (Date.now() - start < timeout) {
    try {
      const isServerUp = await checkServer();
      if (isServerUp) {
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('Server did not start within the timeout period');
};

const checkPageLoad = async (url, timeout = 30000) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout });
    await page.waitForSelector(WAIT_FOR_SELECTOR, { timeout });
    console.log('Visual testing playground is loaded.');
  } catch (error) {
    throw new Error('Failed to load visual testing playground.');
  } finally {
    await browser.close();
  }
};

const validatePercyToken = () => {
  if (!process.env.PERCY_TOKEN) {
    throw new Error(
      'PERCY_TOKEN environment variable is not set. Please set it to run visual tests.'
    );
  }
};

const runServerChecks = async () => {
  if (setupDone) return;
  setupDone = true;
  try {
    await waitForServer(SERVER_URL, SERVER_TIMEOUT);
    await checkPageLoad(SERVER_URL, SERVER_TIMEOUT);
    console.log('Server and testing playground are up and running');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = async () => {
  try {
    validatePercyToken();
    await runServerChecks();
    return {
      rootDir: path.resolve(__dirname, '..'),
      preset: 'jest-puppeteer',
      testTimeout: 50000,
      moduleFileExtensions: ['js', 'json', 'vue'],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': path.resolve(
          __dirname,
          './fileMock.js'
        ),
      },
      transform: {
        '^.+\\.js$': require.resolve('babel-jest'),
        '^.+\\.vue$': require.resolve('vue-jest'),
      },
      snapshotSerializers: ['jest-serializer-vue'],
      globals: {
        HOST: 'http://localhost:4000/',
        'vue-jest': {
          hideStyleWarn: true,
          experimentalCSSCompile: true,
        },
      },
      setupFilesAfterEnv: [path.resolve(__dirname, './visual.setup')],
      verbose: true,
    };
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
