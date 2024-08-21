import Color from 'color';

export function darken1(color) {
  return Color(color)
    .darken(0.19)
    .hex();
}

export function darken2(color) {
  return Color(color)
    .darken(0.4)
    .hex();
}

export function darken3(color) {
  return Color(color)
    .darken(0.58)
    .hex();
}
