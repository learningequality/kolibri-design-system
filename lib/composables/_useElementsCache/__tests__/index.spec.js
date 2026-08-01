import _useElementsCache from '../index.js';

const { cachedQuery, clearCacheKey, clearCache } = _useElementsCache();

afterEach(() => {
  clearCache();
  document.body.innerHTML = '';
});

function connectedEl() {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

describe('_useElementsCache', () => {
  describe('cachedQuery', () => {
    it('runs the query on a miss and reuses the result on a hit', () => {
      const query = jest.fn(() => [connectedEl()]);

      const first = cachedQuery('key', query);
      const second = cachedQuery('key', query);

      expect(query).toHaveBeenCalledTimes(1);
      expect(second).toEqual(first);
    });

    it('leaves out an element that left the DOM, keeping the rest', () => {
      const staying = connectedEl();
      const leaving = connectedEl();
      const query = jest.fn(() => [staying, leaving]);

      cachedQuery('key', query);
      leaving.remove();

      expect(cachedQuery('key', query)).toEqual([staying]);
      expect(query).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearCacheKey', () => {
    it('drops one key, leaving the others cached', () => {
      const queryA = jest.fn(() => [connectedEl()]);
      const queryB = jest.fn(() => [connectedEl()]);
      cachedQuery('a', queryA);
      cachedQuery('b', queryB);

      clearCacheKey('a');

      cachedQuery('a', queryA);
      cachedQuery('b', queryB);
      expect(queryA).toHaveBeenCalledTimes(2);
      expect(queryB).toHaveBeenCalledTimes(1);
    });
  });

  describe('clearCache', () => {
    it('drops every key', () => {
      const queryA = jest.fn(() => [connectedEl()]);
      const queryB = jest.fn(() => [connectedEl()]);
      cachedQuery('a', queryA);
      cachedQuery('b', queryB);

      clearCache();

      cachedQuery('a', queryA);
      cachedQuery('b', queryB);
      expect(queryA).toHaveBeenCalledTimes(2);
      expect(queryB).toHaveBeenCalledTimes(2);
    });
  });
});
