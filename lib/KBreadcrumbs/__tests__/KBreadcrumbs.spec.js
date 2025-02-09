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