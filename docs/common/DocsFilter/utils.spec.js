import { termList, matches } from './utils';

test('termList', () => {
  expect(termList('Term1 term2')).toEqual(['term1', 'term2']);
  expect(termList('lowercase UPPERCASE')).toEqual(['lowercase', 'uppercase']);
  expect(termList('  space     between')).toEqual(['space', 'between']);
  expect(termList('  space     between')).toEqual(['space', 'between']);
  expect(termList('ĜĚĔĶŜ ĝęėķś')).toEqual(['geeks', 'geeks']);
});

test('matches', () => {
  expect(matches(termList('KButton'), 'KButton')).toEqual(true);
  expect(matches(termList('KButton'), 'KCheckbox')).toEqual(false);

  // TODO - add more complex variations
});
