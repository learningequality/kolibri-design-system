import Color from 'color';

function darkenBy(color, amount) {
  if (!color || typeof color !== 'string') {
    // `Color(undefined)` returns black with no error. Returning the input instead
    // leaves the caller to supply its own fallback.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`darken: expected a color string, received '${color}'`);
    }
    return color;
  }
  try {
    return Color(color).darken(amount).hex();
  } catch (e) {
    // `var()`, `calc()` and `color-mix()` are valid CSS that 'color' cannot parse
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`darken: cannot darken '${color}', returning unchanged`);
    }
    return color;
  }
}

export function darken1(color) {
  return darkenBy(color, 0.19);
}

export function darken2(color) {
  return darkenBy(color, 0.4);
}

export function darken3(color) {
  return darkenBy(color, 0.58);
}
