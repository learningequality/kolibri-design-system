import './setup';
import { percySnapshot } from '@percy/puppeteer';

// Set the test type to visual
process.env.TEST_TYPE = 'visual';

global.percySnapshot = percySnapshot;
