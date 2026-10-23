import { render, screen } from '@testing-library/vue';
import UiIconButton from '../UiIconButton.vue';

const ARIA_LABEL = 'Add';

function renderUiIconButton(props = {}) {
  return render(UiIconButton, { props: { icon: 'add', ariaLabel: ARIA_LABEL, ...props } });
}

const getButton = () => screen.getByRole('button', { name: ARIA_LABEL });

describe('UiIconButton', () => {
  it('smoke test', () => {
    renderUiIconButton();

    expect(getButton()).toBeInTheDocument();
  });

  // An inline color would outrank the style block and hide the hover and focus ring
  // colors. `.style`, not the attribute, which `v-bind()` fills in a browser.
  it('colors a primary button by class, with no inline color', () => {
    renderUiIconButton({ type: 'secondary', color: 'primary' });

    expect(getButton()).toHaveClass(
      'ui-icon-button--type-secondary',
      'ui-icon-button--color-primary',
    );
    expect(getButton().style.color).toBe('');
    expect(getButton().style.backgroundColor).toBe('');
  });
});
