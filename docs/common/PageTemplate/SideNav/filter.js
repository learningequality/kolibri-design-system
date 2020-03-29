import flow from 'lodash/flow';
import words from 'lodash/words';
import lowerCase from 'lodash/lowerCase';
import deburr from 'lodash/deburr';
import every from 'lodash/every';
import includes from 'lodash/includes';

// normalize a term
const cleanup = flow([lowerCase, deburr]);

// given an input query string, return a list of search terms
export function termList(filterText) {
  return words(filterText).map(cleanup);
}

// given a list of search terms, decide whether to match some section or page
export function matches(termList, targetText) {
  const text = cleanup(targetText);
  return every(termList, term => includes(text, term));
}
