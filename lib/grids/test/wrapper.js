import { mount } from '@vue/test-utils';
import { resizeWindow } from '../../../jest.conf/testUtils';

function _makeWrapper(Component, propsData, gridMetrics) {
  return mount(Component, {
    propsData,
    provide: { gridMetrics },
  });
}

// mimic the behavior of the responsive KGrid
const SMALL_GRID = { numCols: 4, gutterWidth: 16 };
const SMALL_DIMENSIONS = { width: 400, height: 400 };
const MEDIUM_GRID = { numCols: 8, gutterWidth: 24 };
const MEDIUM_DIMENSIONS = { width: 700, height: 700 };
const LARGE_GRID = { numCols: 12, gutterWidth: 24 };
const LARGE_DIMENSIONS = { width: 900, height: 900 };

export function makeWrapperSmall(Component, propsData) {
  const wrapper = _makeWrapper(Component, propsData, SMALL_GRID);
  resizeWindow(SMALL_DIMENSIONS.width, SMALL_DIMENSIONS.height);
  return wrapper;
}

export function makeWrapperMedium(Component, propsData) {
  const wrapper = _makeWrapper(Component, propsData, MEDIUM_GRID);
  resizeWindow(MEDIUM_DIMENSIONS.width, MEDIUM_DIMENSIONS.height);
  return wrapper;
}

export function makeWrapperLarge(Component, propsData) {
  const wrapper = _makeWrapper(Component, propsData, LARGE_GRID);
  resizeWindow(LARGE_DIMENSIONS.width, LARGE_DIMENSIONS.height);
  return wrapper;
}
