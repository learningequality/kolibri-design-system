import flow from 'lodash/flow';
import toLower from 'lodash/toLower';
import deburr from 'lodash/deburr';
import every from 'lodash/every';
import includes from 'lodash/includes';

// normalize a term
const cleanup = flow([toLower, deburr]);

// given an input query string, return a list of search terms
export function termList(filterText) {
  return filterText
    .split(' ')
    .map(cleanup)
    .filter(val => val);
}

// given a list of search terms, decide whether to match some section or page
export function matches(termList, targetText) {
  const text = cleanup(targetText);
  return every(termList, term => includes(text, term));
}
