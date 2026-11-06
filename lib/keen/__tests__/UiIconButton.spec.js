import { render, screen } from '@testing-library/vue';
import { setTokenMapping } from '../../styles/theme';
import UiIconButton from '../UiIconButton.vue';

// derived from the `#4368f5` that `tokens.primary` resolves to by default
const DERIVED = {
  '--ui-icon-button-primary-ring': '#0D3CF0',
  '--ui-icon-button-primary-hover': 'rgba(67, 104, 245, 0.12)',
  '--ui-icon-button-primary-tint': 'rgba(67, 104, 245, 0.26)',
};

const ARIA_LABEL = 'Add';

function renderUiIconButton(props = {}) {
  return render(UiIconButton, { props: { icon: 'add', ariaLabel: ARIA_LABEL, ...props } });
}

const getButton = () => screen.getByRole('button', { name: ARIA_LABEL });

const derivedValues = () =>
  Object.keys(DERIVED).map(property => getButton().style.getPropertyValue(property));

describe('UiIconButton', () => {
  it('smoke test', () => {
    renderUiIconButton();

    expect(getButton()).toBeInTheDocument();
  });

  // an inline color would outrank the style block and hide the hover and focus ring colors
  it('colors a primary button by class, with no inline color', () => {
    renderUiIconButton({ type: 'secondary', color: 'primary' });

    expect(getButton()).toHaveClass(
      'ui-icon-button--type-secondary',
      'ui-icon-button--color-primary',
    );
    expect(getButton().style.color).toBe('');
    expect(getButton().style.backgroundColor).toBe('');
  });

  // the hover tint and the focus ring are alpha composites and a relative darkening of
  // `tokens.primary`, which CSS cannot express on the browsers in `browserslist-config-kolibri`
  describe('the derived primary colors', () => {
    afterEach(() => {
      setTokenMapping({ primary: 'brand.primary.v_500' });
    });

    it('derives each one from tokens.primary', () => {
      renderUiIconButton({ color: 'primary' });

      for (const [property, value] of Object.entries(DERIVED)) {
        expect(getButton().style.getPropertyValue(property)).toBe(value);
      }
    });

    it('follows a remapped tokens.primary', () => {
      setTokenMapping({ primary: '#008000' });
      renderUiIconButton({ color: 'primary' });

      expect(getButton().style.getPropertyValue('--ui-icon-button-primary-hover')).toBe(
        'rgba(0, 128, 0, 0.12)',
      );
    });

    it('sets none of them for another color', () => {
      renderUiIconButton({ color: 'default' });

      expect(derivedValues()).toEqual(['', '', '']);
    });

    // a theme can map a token to any CSS value, and the style block falls back in CSS
    it('sets none of them when tokens.primary cannot be parsed', () => {
      setTokenMapping({ primary: 'var(--my-primary)' });

      expect(() => renderUiIconButton({ color: 'primary' })).not.toThrow();
      expect(derivedValues()).toEqual(['', '', '']);
    });
  });
});
