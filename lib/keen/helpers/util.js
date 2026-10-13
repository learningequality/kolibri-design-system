/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
  // eslint-disable-next-line eqeqeq
  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
}

/**
 * Check if the given string starts with the query, beginning
 * at the given position
 */
export function startsWith(string, query, position = 0) {
  return string.substr(position, query.length) === query;
}
