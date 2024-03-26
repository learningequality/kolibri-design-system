export function validateAndFormatUnits(propValue) {
  if (propValue) {
    if (!isNaN(propValue)) {
      return `${propValue}px`;
    } else {
      // split numbers apart from units
      const [, ...arr] = propValue.match(/(\d*\.?\d+)([a-zA-Z | %]*)/);
      const validUnits = [
        '%',
        'cm',
        'em',
        'ex',
        'ch',
        'in',
        'lh',
        'mm',
        'px',
        'rem',
        'rlh',
        'vh',
        'vw',
      ];

      // if made up of valid numbers and valid units
      if (!isNaN(arr[0]) && validUnits.includes(arr[1])) {
        return propValue;
      }
    }
  }
}
