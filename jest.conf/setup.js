import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import * as Aphrodite from 'aphrodite';
import * as AphroditeNoImportant from 'aphrodite/no-important';

// eslint-disable-next-line import/no-unresolved
import 'mock-match-media/jest-setup';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueIntl from 'vue-intl';
import VueCompositionAPI from '@vue/composition-api';
import KThemePlugin from '../lib/KThemePlugin';

global.beforeEach(() => {
  return new Promise(resolve => {
    Aphrodite.StyleSheetTestUtils.suppressStyleInjection();
    AphroditeNoImportant.StyleSheetTestUtils.suppressStyleInjection();
    return process.nextTick(resolve);
  });
});

global.afterEach(() => {
  return new Promise(resolve => {
    Aphrodite.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    AphroditeNoImportant.StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

// Register Vue plugins and components
Vue.use(VueRouter);
Vue.use(VueCompositionAPI);
Vue.use(KThemePlugin);
Vue.use(VueIntl);

Vue.config.silent = true;
Vue.config.devtools = false;
Vue.config.productionTip = false;

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

// Shows better NodeJS unhandled promise rejection errors
process.on('unhandledRejection', (reason, p) => {
  /* eslint-disable no-console */
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.log(reason.stack);
});

// Copied from https://github.com/kentor/flush-promises/blob/f33ac564190c784019f1f689dd544187f4b77eb2/index.js
global.flushPromises = function flushPromises() {
  return new Promise(function(resolve) {
    setImmediate(resolve);
  });
};
