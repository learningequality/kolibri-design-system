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