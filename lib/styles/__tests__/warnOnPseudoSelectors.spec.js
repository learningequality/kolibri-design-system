import warnOnPseudoSelectors from '../warnOnPseudoSelectors';

describe('warnOnPseudoSelectors', () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('says nothing about a plain style object or a missing value', () => {
    warnOnPseudoSelectors({ color: 'red', textTransform: 'none' }, 'appearanceOverrides', 'KThing');
    warnOnPseudoSelectors(undefined, 'appearanceOverrides', 'KThing');

    expect(warn).not.toHaveBeenCalled();
  });

  it.each([':hover', '::placeholder', '@media (min-width: 600px)'])(
    'names %s, the prop and the component',
    key => {
      warnOnPseudoSelectors({ [key]: { color: 'red' } }, 'appearanceOverrides', 'KThing');

      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain(key);
      expect(warn.mock.calls[0][0]).toContain('appearanceOverrides');
      expect(warn.mock.calls[0][0]).toContain('KThing');
    },
  );

  it('points at the hover props only when a :hover key is given', () => {
    warnOnPseudoSelectors({ ':hover': {} }, 'appearanceOverrides', 'KThing');
    warnOnPseudoSelectors({ ':focus': {} }, 'appearanceOverrides', 'KThing');

    expect(warn.mock.calls[0][0]).toContain('hoverColor');
    expect(warn.mock.calls[1][0]).not.toContain('hoverColor');
  });

  it('names every offending key at once', () => {
    warnOnPseudoSelectors(
      { ':hover': {}, ':focus': {}, color: 'red' },
      'appearanceOverridesActive',
      'KTabsList',
    );

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain(':hover');
    expect(warn.mock.calls[0][0]).toContain(':focus');
    expect(warn.mock.calls[0][0]).not.toContain('color');
  });
});
