// Set the test type to visual

import './setup';
import { percySnapshot } from '@percy/puppeteer';

process.env.TEST_TYPE = 'visual';

// if (typeof window !== 'undefined') {
//   global.matchMedia =
//     global.matchMedia ||
//     function() {
//       return {
//         matches: false,
//         addListener: function() {},
//         removeListener: function() {},
//       };
//     };
// }

global.percySnapshot = percySnapshot;
