/*
 * Vue drops a pseudo-class or media query key from an inline style without a word,
 * so the only sign is a state that never paints.
 */
export default function warnOnPseudoSelectors(overrides, propName, componentName) {
  if (process.env.NODE_ENV === 'production' || !overrides) {
    return;
  }
  const keys = Object.keys(overrides).filter(key => key[0] === ':' || key[0] === '@');
  if (!keys.length) {
    return;
  }
  const hoverHint = keys.some(key => key.indexOf(':hover') === 0)
    ? ' Use the `hoverColor` and `hoverBackgroundColor` props for the hover state.'
    : '';
  // eslint-disable-next-line no-console
  console.warn(
    `${componentName}: '${propName}' does not support ${keys.join(', ')}. ` +
      'It is applied as an inline style, which cannot carry a pseudo-class or a media ' +
      `query. Move the rule into an application stylesheet.${hoverHint}`,
  );
}
