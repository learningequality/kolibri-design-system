import Color from 'color';

export function darken1(color) {
  return Color(color)
    .darken(0.15)
    .hex();
}

export function darken2(color) {
  return Color(color)
    .darken(0.3)
    .hex();
}

export function darken3(color) {
  return Color(color)
    .darken(0.45)
    .hex();
}
