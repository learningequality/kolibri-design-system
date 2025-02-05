import { shallowMount } from '@vue/test-utils';
import KBreadcrumbs from '../index.vue'; // Import from index.vue
import { renderComponent, takeSnapshot, click } from '../../../jest.conf/visual.testUtils';

describe('KBreadcrumbs', () => {
    describe('Single item breadcrumbs', () => {
      it('should not render a single breadcrumb item by default', () => {
        const wrapper = shallowMount(KBreadcrumbs, {
          propsData: {
            items: [{ text: 'Home', link: '/' }],
          },
        });
        expect(wrapper.find('[data-test="breadcrumb-item"]').exists()).toBe(false);
      });

      it('should render a single breadcrumb when showSingleItem is true', () => {
        const wrapper = shallowMount(KBreadcrumbs, {
          propsData: {
            items: [{ text: 'Home', link: '/' }],
            showSingleItem: true,
          },
        });
        expect(wrapper.find('[data-test="breadcrumb-item"]').exists()).toBe(true);
      });
    });
  
    describe('Multiple items without overflow', () => {
        it('should render multiple breadcrumb items when there is enough space', () => {
          const wrapper = shallowMount(KBreadcrumbs, {
            propsData: {
              items: [
                { text: 'Home', link: '/' },
                { text: 'Category', link: '/category' },
                { text: 'Sub-category', link: '/category/sub' },
              ],
            },
          });
          expect(wrapper.findAll('[data-test="breadcrumb-item"]').length).toBe(3);
        });
      });
      describe('Breadcrumb overflow handling', () => {
        it('should collapse overflowing breadcrumbs into a dropdown', () => {
          const wrapper = shallowMount(KBreadcrumbs, {
            propsData: {
              items: [
                { text: 'Home', link: '/' },
                { text: 'Category', link: '/category' },
                { text: 'Sub-category', link: '/category/sub' },
                { text: 'Long Breadcrumb Item', link: '/category/sub/long' },
                { text: 'Another Long Item', link: '/category/sub/long/another' },
              ],
            },
          });
          expect(wrapper.find('[data-test="breadcrumb-dropdown"]').exists()).toBe(true);
        });
      });


      describe('Breadcrumbs with links', () => {
        it('should render breadcrumb items as links if they have a link attribute', () => {
          const wrapper = shallowMount(KBreadcrumbs, {
            propsData: {
              items: [
                { text: 'Home', link: '/' },
                { text: 'Category', link: '/category' },
                { text: 'No Link', link: null },
              ],
            },
          });
          expect(wrapper.findAll('a').length).toBe(2);
        });
    
        it('should not render a link for items without a link attribute', () => {
          const wrapper = shallowMount(KBreadcrumbs, {
            propsData: {
              items: [{ text: 'No Link', link: null }],
              showSingleItem: true,
            },
          });
          expect(wrapper.find('a').exists()).toBe(false);
        });
      });


      describe('Dropdown behavior for overflowed breadcrumbs', () => {
        it('should open dropdown when clicking on overflowed breadcrumbs with links', async () => {
          const wrapper = shallowMount(KBreadcrumbs, {
            propsData: {
              items: [
                { text: 'Home', link: '/' },
                { text: 'Category', link: '/category' },
                { text: 'Sub-category', link: '/category/sub' },
                { text: 'Long Item', link: '/category/sub/long' },
                { text: 'Overflowed Item', link: '/category/sub/long/extra' },
              ],
            },
          });
  
          await click('[data-test="breadcrumb-dropdown-toggle"]');
      expect(wrapper.find('[data-test="breadcrumb-dropdown"]').isVisible()).toBe(true);
    });

    it('should open dropdown when clicking on overflowed breadcrumbs without links', async () => {
      const wrapper = shallowMount(KBreadcrumbs, {
        propsData: {
          items: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/category' },
            { text: 'Sub-category', link: '/category/sub' },
            { text: 'Long Item', link: null },
            { text: 'Overflowed Item', link: null },
          ],
        },
      });

      await click('[data-test="breadcrumb-dropdown-toggle"]');
      expect(wrapper.find('[data-test="breadcrumb-dropdown"]').isVisible()).toBe(true);
    });
  });

  describe.visual('KBreadcrumbs Visual Tests', () => {
    const snapshotOptions = { widths: [400], minHeight: 512 };

    it('renders correctly with a single breadcrumb (without showSingleItem)', async () => {
      await renderComponent('KBreadcrumbs', {
        items: [{ text: 'Home', link: '/' }],
      });
      await takeSnapshot('KBreadcrumbs - Single Item Hidden', snapshotOptions);
    });

    it('renders correctly with a single breadcrumb (with showSingleItem)', async () => {
      await renderComponent('KBreadcrumbs', {
        items: [{ text: 'Home', link: '/' }],
        showSingleItem: true,
      });
      await takeSnapshot('KBreadcrumbs - Single Item Visible', snapshotOptions);
    });

    it('renders correctly with multiple items that fit within the width', async () => {
      await renderComponent('KBreadcrumbs', {
        items: [
          { text: 'Home', link: '/' },
          { text: 'Category', link: '/category' },
          { text: 'Sub-category', link: '/category/sub' },
        ],
      });
      await takeSnapshot('KBreadcrumbs - Multiple Items Fit', snapshotOptions);
    });

    it('renders correctly with multiple items that overflow', async () => {
        await renderComponent('KBreadcrumbs', {
          items: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/category' },
            { text: 'Sub-category', link: '/category/sub' },
            { text: 'Long Item', link: '/category/sub/long' },
            { text: 'Overflowed Item', link: '/category/sub/long/extra' },
          ],
        });
        await takeSnapshot('KBreadcrumbs - Overflowed Items', snapshotOptions);
      });
  
      it('renders correctly with dropdown open for overflowed items with links', async () => {
        await renderComponent(
          'KBreadcrumbs',
          {
            items: [
              { text: 'Home', link: '/' },
              { text: 'Category', link: '/category' },
              { text: 'Overflowed Item', link: '/category/sub/long/extra' },
            ],
          },
          {
            menu: {
              element: 'KDropdownMenu',
              elementProps: { options: ['Option 1', 'Option 2'] },
            },
          },
        );
        await click('[data-test="breadcrumb-dropdown-toggle"]');
        await takeSnapshot('KBreadcrumbs - Dropdown Opened With Links', snapshotOptions);
      });
    });
  });
