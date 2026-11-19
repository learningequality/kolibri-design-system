import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import UiPopover from '../UiPopover.vue';

describe('UiPopover', () => {
  it('opened on focus, lets Tab move focus off its trigger', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render({
      components: { UiPopover },
      methods: { onClose },
      template: `
        <div>
          <button>Trigger<UiPopover openOn="focus" @close="onClose">Content</UiPopover></button>
          <button>After</button>
        </div>
      `,
    });
    await user.tab();
    await waitFor(() => expect(screen.getByText('Content')).toBeVisible());
    await user.tab();
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
  });

  it('opened on hover, returns focus from its content to the element focused before it opened', async () => {
    const user = userEvent.setup();
    render({
      components: { UiPopover },
      template: `
        <div>
          <input aria-label="Field">
          <button>Trigger<UiPopover openOn="hover"><button>Inside</button></UiPopover></button>
        </div>
      `,
    });
    const field = screen.getByRole('textbox', { name: 'Field' });
    const trigger = screen.getByRole('button', { name: /Trigger/ });
    field.focus();
    await user.hover(trigger);
    const inside = await screen.findByRole('button', { name: 'Inside' });
    inside.focus();
    trigger._tippy.hide();
    expect(field).toHaveFocus();
  });
});
