import './setup';
import { percySnapshot } from '@percy/puppeteer';

const TESTING_PLAYGROUND_URL = 'http://localhost:4000/testing-playground';
global.percySnapshot = percySnapshot;

global.beforeAll(async () => {
  await page.goto(TESTING_PLAYGROUND_URL, { waitUntil: 'networkidle2' });
});
