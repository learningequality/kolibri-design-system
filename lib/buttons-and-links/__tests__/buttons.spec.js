const fs = require('node:fs');
const path = require('node:path');

const BUTTONS_SCSS_PATH = path.resolve(__dirname, '../buttons.scss');
const buttonsScss = fs.readFileSync(BUTTONS_SCSS_PATH, 'utf8');

// the body of `<selector> { ... }`, brace matched so that a nested block comes with it
function ruleBody(scss, selector) {
  if (!scss) {
    return null;
  }
  const header = `${selector} {`;
  const start = scss.indexOf(header);
  if (start === -1) {
    return null;
  }
  let depth = 0;
  for (let i = start + header.length - 1; i < scss.length; i++) {
    if (scss[i] === '{') {
      depth++;
    } else if (scss[i] === '}') {
      depth--;
      if (depth === 0) {
        return scss.slice(start + header.length, i);
      }
    }
  }
  return null;
}

describe('buttons.scss', () => {
  // `buttonMixin` sets a custom property for each hover prop on every appearance. An
  // appearance whose hover rule does not read one turns that prop into a no-op that no
  // jsdom test can see, because jsdom applies no stylesheet.
  it.each([['.link'], ['.button.raised'], ['.button.flat']])(
    'reads both hover props in the hover rule of %s',
    selector => {
      const hover = ruleBody(ruleBody(buttonsScss, selector), '&:hover');

      expect(hover).not.toBeNull();
      expect(hover).toContain('--k-button-hover-color');
      expect(hover).toContain('--k-button-hover-background-color');
    },
  );

  // a `fill` rule here flattens art that a caller passes into the icon slot
  it('leaves the fill of slotted SVGs alone', () => {
    expect(buttonsScss).not.toContain('fill:');
  });
});
