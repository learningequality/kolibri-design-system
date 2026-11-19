import { nextTick } from 'vue';
import { render, waitFor } from '@testing-library/vue';
import UiPopover from '../UiPopover.vue';

describe('UiPopover close', () => {
  it('does not close again when unmounted while fading out', async () => {
    let popover;
    const onClose = jest.fn();
    const { updateProps } = render({
      components: { UiPopover },
      props: { show: { type: Boolean, default: true } },
      methods: { onClose },
      template: `
        <div>
          <button v-if="show">Trigger<UiPopover ref="popover" @close="onClose" /></button>
        </div>
      `,
      mounted() {
        popover = this.$refs.popover;
      },
    });
    await nextTick();
    popover.open();
    await waitFor(() => expect(popover.isOpen()).toBe(true));
    popover.close({ returnFocus: false });

    await updateProps({ show: false });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
