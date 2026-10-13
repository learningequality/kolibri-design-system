import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import KDropdownMenu from '../index.vue';

const POSITIONS = [
  'bottom left',
  'bottom center',
  'bottom right',
  'top left',
  'top center',
  'top right',
  'left top',
  'left middle',
  'left bottom',
  'right top',
  'right middle',
  'right bottom',
];

const MenuInButton = {
  components: { KDropdownMenu },
  props: { position: { type: String, default: undefined } },
  template: `
    <button>
      Menu
      <KDropdownMenu :options="['One']" :position="position" />
    </button>
  `,
};

function renderMenu({ position, isRtl = false } = {}) {
  return render(MenuInButton, { props: { position }, mocks: { isRtl } });
}

async function openAndGetPlacement() {
  await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
  const popper = document.querySelector('.tippy-popper[x-placement]');
  const placement = popper.getAttribute('x-placement');
  await userEvent.click(screen.getByRole('button', { name: 'Menu' }));
  return placement;
}

async function getPlacement(options) {
  const { unmount } = renderMenu(options);
  const placement = await openAndGetPlacement();
  unmount();
  return placement;
}

describe('KDropdownMenu', () => {
  describe('popover placement', () => {
    it('opens below, aligned to the left edge, by default in LTR', async () => {
      expect(await getPlacement()).toBe('bottom-start');
    });

    it('uses the default placement when position is null', async () => {
      expect(await getPlacement({ position: null })).toBe('bottom-start');
    });

    it('opens below, aligned to the right edge, by default in RTL', async () => {
      expect(await getPlacement({ isRtl: true })).toBe('bottom-end');
    });

    it('opens above, extending leftward, for "top left" in LTR', async () => {
      expect(await getPlacement({ position: 'top left' })).toBe('top-end');
    });

    it('mirrors the side as well as the alignment in RTL', async () => {
      expect(await getPlacement({ position: 'left top', isRtl: true })).toBe('right-end');
    });

    it('applies a position changed after mount', async () => {
      const { updateProps, unmount } = renderMenu({ position: 'top left' });
      await openAndGetPlacement();
      await updateProps({ position: 'bottom center' });
      expect(await openAndGetPlacement()).toBe('bottom');
      unmount();
    });

    it('gives each position a distinct placement', async () => {
      const placements = [];
      for (const position of POSITIONS) {
        placements.push(await getPlacement({ position }));
      }
      expect(new Set(placements).size).toBe(POSITIONS.length);
    });
  });
});
