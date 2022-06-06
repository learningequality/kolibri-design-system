export function validateAlignment(value) {
  if (!['right', 'center', 'left', 'auto'].includes(value)) {
    console.error(`If provided, alignment must be one of: 'left', 'right', 'center', or 'auto`);
    return false;
  }
  return true;
}

export function validateSpan(value) {
  if (isNaN(value)) {
    console.error(`Span (${value}) must be a number`);
    return false;
  }
  const size = parseInt(value);
  if (size !== Number(value)) {
    console.error(`Span (${value}) must be an integer`);
    return false;
  }
  if (size < 1 || size > 12) {
    console.error(`Span (${value}) must be between 1 and 12`);
    return false;
  }
  return true;
}

export function validateGutter(value) {
  if (isNaN(value)) {
    console.error(`Gutter (${value}) must be an integer`);
    return false;
  }
  const size = parseInt(value);
  if (size !== Number(value)) {
    console.error(`Gutter (${value}) must be an integer`);
    return false;
  }
  if (size % 2) {
    console.error(`Gutter (${value}) must be divisible by 2`);
    return false;
  }
  return true;
}
