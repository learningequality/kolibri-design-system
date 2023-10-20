import { ref } from '@vue/composition-api';
import has from 'lodash/has';

/**
 * A composable that exposes `show` function.
 * See below for `show` documentation.
 *
 * @returns {Object} { show }
 */
export default function useKShow() {
  const itemsMap = {};

  function _clearItemTimeout(key) {
    const item = itemsMap[key];
    clearTimeout(item.timeoutId);
  }

  function _freezeItem(key) {
    const item = itemsMap[key];
    item.isFrozen.value = true;
    item.timeoutId = setTimeout(() => {
      item.isFrozen.value = false;
    }, item.minVisibleTime);
  }

  /**
   * Guarantees that something will be displayed at least for a specified
   * duration after an initial trigger
   *
   * This is typically used to prevent a jarring user experience when showing
   * or hiding certain elements. For example, it can be used to ensure that a
   * loader remains visible for a certain amount of time, even when the related
   * data has already been loaded.
   *
   * @param {String, Number} key Each `show` function instance has to pass
   *                             a key unique in the context of a whole page
   *                             to this attribute
   * @param {Boolean} shouldShow Accurate, real-time information on whether
   *                             something should be shown. For example, it
   *                             should be set to `false` for a loader immediately
   *                             after related data have finished loading.
   * @param {Number} minVisibleTime For how long should `show` return `true`
   *                                after an initial trigger
   *
   * @returns {Boolean} Returns `true` after `shouldShow` becomes truthy
   *                    and keeps returning `true` for the duration of
   *                    `minVisibleTime` (even when `shouldShow` changes
   *                    back to falsy meanwhile). After `minVisibleTime`
   *                    elapses and when `shouldShow` is falsy already,
   *                    it returns `false`.
   */
  function show(key, shouldShow = false, minVisibleTime = 0) {
    if (!['number', 'string'].includes(typeof key)) {
      throw new Error('[show] `key` has to be a number or a string');
    }

    if (!has(itemsMap, key)) {
      // save a tiny bit of memory by halting the execution right away
      // in situations when `minVisibleTime` is not set (can happen
      // in some components that are using this composable and provide
      // its functionality as optional)
      if (minVisibleTime === 0 || minVisibleTime < 0) {
        return shouldShow;
      }
      itemsMap[key] = {
        shouldShow: false,
        minVisibleTime,
        isFrozen: ref(false),
        timeoutId: null,
      };
    }

    const item = itemsMap[key];
    const previousShouldShow = item.shouldShow;
    const previousMinVisibleTime = item.minVisibleTime;

    if (previousShouldShow !== shouldShow) {
      item.shouldShow = shouldShow;
      // freeze when changing from false to true
      // but only when it's not already frozen
      if (!item.isFrozen.value && shouldShow) {
        _freezeItem(key);
      }
    }

    // probably not a typical use-case but ensures
    // that reactive updates of `minVisibleTime`
    // will work too
    if (previousMinVisibleTime !== minVisibleTime) {
      item.minVisibleTime = minVisibleTime;
      _clearItemTimeout(key);
      _freezeItem(key);
    }

    return shouldShow || item.isFrozen.value;
  }

  return {
    show,
  };
}
