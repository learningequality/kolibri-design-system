import useKShow from '../';

const { show } = useKShow();

describe('useKShow', () => {
  beforeAll(() => {
    // https://github.com/jestjs/jest/issues/11607
    jest.useFakeTimers('legacy');
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it(`'show' returns 'true' at least for a specified duration after an initial trigger`, () => {
    // Test that 'show1' instance evaluates to true
    // for at least 5 seconds after an initial trigger
    // Test 'show2' instance in the same way but for 2 seconds
    // (this is to test that there are no clashes between more
    // 'show' instances)
    expect(show('show1', true, 5000)).toBe(true);
    expect(show('show2', true, 2000)).toBe(true);

    // change 'shouldShow' condition to falsy
    expect(show('show1', false, 5000)).toBe(true);
    expect(show('show2', false, 2000)).toBe(true);

    // after 1 second in total
    jest.advanceTimersByTime(1000);
    expect(show('show1', false, 5000)).toBe(true);
    expect(show('show2', false, 2000)).toBe(true);

    // after 2.5 seconds in total
    jest.advanceTimersByTime(1500);
    expect(show('show1', false, 5000)).toBe(true);
    expect(show('show2', false, 2000)).toBe(false);

    // after 5.5 seconds in total
    jest.advanceTimersByTime(3000);
    expect(show('show1', false, 5000)).toBe(false);
    expect(show('show2', false, 2000)).toBe(false);
  });
});
