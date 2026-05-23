import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KChip from '../index.vue';

function renderComponent(props = {}) {
  return render(KChip, {
    props: { text: 'Test Chip', close: false, ...props },
  });
}

describe('KChip', () => {
  it('renders with text prop', () => {
    renderComponent({ text: 'Mathematics' });
    expect(screen.getByText('Mathematics')).toBeInTheDocument();
  });

  it('renders slot content when provided', () => {
    render(KChip, { slots: { default: '<strong>Custom label</strong>' } });
    expect(screen.getByText('Custom label')).toBeInTheDocument();
  });

  it('renders close button when close prop is true', () => {
    renderComponent({ close: true });
    expect(screen.getByRole('button', { name: 'Remove Test Chip' })).toBeInTheDocument();
  });

  it('does not render close button when close prop is false', () => {
    renderComponent({ close: false });
    expect(screen.queryByRole('button', { name: 'Remove Test Chip' })).not.toBeInTheDocument();
  });

  it('emits close event when close button is clicked', async () => {
    const { emitted } = renderComponent({ close: true });
    await userEvent.click(screen.getByRole('button', { name: 'Remove Test Chip' }));
    expect(emitted().close).toHaveLength(1);
  });

  it('close button is disabled when disabled prop is true', () => {
    renderComponent({ close: true, disabled: true });
    expect(screen.getByRole('button', { name: 'Remove Test Chip' })).toBeDisabled();
  });

  it('does not emit close when disabled', () => {
    const { emitted } = renderComponent({ close: true, disabled: true });
    screen.getByRole('button', { name: 'Remove Test Chip' }).click();
    expect(emitted().close).toBeUndefined();
  });

  it('uses removeLabel prop as the close button accessible label', () => {
    renderComponent({ close: true, removeLabel: 'Delete Test Chip' });
    expect(screen.getByRole('button', { name: 'Delete Test Chip' })).toBeInTheDocument();
  });
});
