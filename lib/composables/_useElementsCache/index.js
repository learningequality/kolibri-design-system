// Caches DOM elements by key, so the same lookup doesn't re-hit the DOM.
// Each call creates its own cache, so separate features don't share it,
// otherwise one feature's `clearCache` would wipe another feature's cache.

export default function _useElementsCache() {
  const cache = new Map();

  // Retrieves query result from cache if available.
  // Otherwise runs query, caches and returns its result.
  // Clears elements that are not in the DOM from
  // the cache automatically, so they're not kept in memory.
  function cachedQuery(key, query) {
    const cached = cache.get(key);
    if (cached) {
      const connected = cached.filter(el => el.isConnected);
      if (connected.length !== cached.length) {
        cache.set(key, [...connected]);
      }
      return connected;
    }
    const result = query();
    cache.set(key, [...result]);
    return result;
  }

  // Clears one key
  function clearCacheKey(key) {
    cache.delete(key);
  }

  // Clears the whole cache
  function clearCache() {
    cache.clear();
  }

  return { cachedQuery, clearCacheKey, clearCache };
}
