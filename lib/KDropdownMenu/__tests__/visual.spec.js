import { renderComponentForVisualTest, takeSnapshot } from '../../../jest.conf/visual.testUtils';

describe.visual('KDropdownMenu Visual Tests', () => {
  const snapshotOptions = {
    widths: [400],
    minHeight: 520,
  };

  it('renders', async () => {
    // set viewport height to a large value to ensure the dropdown fits without flipping
    await page.setViewport({ width: 400, height: 1500 });
    await renderComponentForVisualTest('KDropdownMenuVisualTest');
    await takeSnapshot('KDropdownMenu visual tests', snapshotOptions);
  });

  function measureMenu() {
    return page.$eval('.viewport-bounded-popover', popoverEl => {
      const menuEl = popoverEl.querySelector('.ui-menu');
      menuEl.scrollTop = menuEl.scrollHeight;
      const options = popoverEl.querySelectorAll('.ui-menu-option');
      return {
        scrollContainers: [popoverEl, ...popoverEl.querySelectorAll('*')].filter(
          el => el.scrollHeight > el.clientHeight,
        ).length,
        popover: popoverEl.getBoundingClientRect().toJSON(),
        headerParts: [...popoverEl.querySelectorAll('.menu-header')].map(el =>
          el.getBoundingClientRect().toJSON(),
        ),
        lastOption: options[options.length - 1].getBoundingClientRect().toJSON(),
        container: document.querySelector('.scroll-container').getBoundingClientRect().toJSON(),
        viewport: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
      };
    });
  }

  async function openMenuScrolledToEnd() {
    await renderComponentForVisualTest('div');
    await renderComponentForVisualTest('KDropdownMenuAtViewportEdge');
    await page.waitForSelector('.tippy-popper[x-placement] .ui-menu', { visible: true });
    return measureMenu();
  }

  describe('with constrainToScrollParent false, opened at the right viewport edge', () => {
    it.each([
      [375, 700],
      [1024, 700],
      [667, 375],
    ])(
      'stays inside the viewport and extends outside the scroll container at %ix%ipx',
      async (width, height) => {
        await page.setViewport({ width, height });
        const { popover, headerParts, lastOption, container, viewport, scrollContainers } =
          await openMenuScrolledToEnd();

        expect(container.right).toBe(viewport.width);
        expect(popover.left).toBeGreaterThanOrEqual(0);
        expect(popover.top).toBeGreaterThanOrEqual(0);
        expect(popover.right).toBeLessThanOrEqual(viewport.width);
        expect(popover.bottom).toBeLessThanOrEqual(viewport.height);
        expect(popover.top).toBeLessThan(container.top);
        expect(headerParts[0].top).toBeGreaterThanOrEqual(popover.top);
        expect(headerParts[1].top).toBe(headerParts[0].top);
        expect(lastOption.bottom).toBeLessThanOrEqual(popover.bottom);
        expect(scrollContainers).toBeLessThanOrEqual(1);

        await takeSnapshot(`KDropdownMenu at the right viewport edge - ${width}x${height}px`, {
          widths: [width],
          minHeight: height,
        });
      },
    );

    it('stays inside the viewport after the viewport shrinks while open', async () => {
      await page.setViewport({ width: 1024, height: 700 });
      await openMenuScrolledToEnd();
      await page.setViewport({ width: 1024, height: 360 });
      await page.waitForFunction(
        () =>
          document.querySelector('.viewport-bounded-popover').getBoundingClientRect().bottom <=
          document.documentElement.clientHeight,
      );
      const { popover, lastOption, viewport } = await measureMenu();

      expect(popover.top).toBeGreaterThanOrEqual(0);
      expect(popover.right).toBeLessThanOrEqual(viewport.width);
      expect(popover.bottom).toBeLessThanOrEqual(viewport.height);
      expect(lastOption.bottom).toBeLessThanOrEqual(popover.bottom);
    });
  });
});
