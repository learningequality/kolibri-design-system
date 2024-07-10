import { shallowMount } from '@vue/test-utils';
import percySnapshot from '@percy/puppeteer';
import KButton from '../KButton.vue';
import { canTakeScreenshot } from '../../../jest.conf/testUtils';

describe('KButton', () => {
  if (!canTakeScreenshot()) {
    describe('icon related props', () => {
      it('should render an icon before the text with the icon string passed to the `icon` prop', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            icon: 'add',
          },
        });
        expect(wrapper.find('[data-test="iconBefore"]').exists()).toBe(true);
      });
      it('should render an icon after the text with the icon string pased to the `iconAfter` prop', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            iconAfter: 'video',
          },
        });
        expect(wrapper.find('[data-test="iconAfter"]').exists()).toBe(true);
      });
      it('should render a dropdown icon when hasDropdown is true', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            hasDropdown: true,
          },
        });
        expect(wrapper.find('[data-test="dropdownIcon"]').exists()).toBe(true);
      });
    });

    describe('text prop and slots', () => {
      it('should render the text prop if nothing is in the default slot', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            text: 'test',
          },
        });
        expect(wrapper.text()).toContain('test');
      });

      it('should render the slot when the slot has content', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            text: 'test',
          },
          slots: {
            default: '<span>slot</span>',
          },
        });
        expect(wrapper.text()).toContain('slot');
        expect(wrapper.text()).toContain('test');
      });
    });

    describe('event handling', () => {
      it('should emit a click event when clicked', () => {
        const wrapper = shallowMount(KButton, {
          propsData: {
            text: 'test',
          },
        });
        wrapper.trigger('click');
        expect(wrapper.emitted().click).toBeTruthy();
      });
    });
  } else {
    describe('KButton Visual Tests', () => {
      beforeAll(async () => {
        await page.goto('http://localhost:4000/testing-playground', { waitUntil: 'networkidle2' });
      });

      async function renderComponent(component, props) {
        await page.evaluate(
          ({ component, props }) => {
            window.postMessage(
              {
                type: 'RENDER_COMPONENT',
                component: component,
                props: props,
              },
              '*'
            );
          },
          { component, props }
        );
        await page.waitForSelector('#testing-playground');

        const isComponentRendered = await page.evaluate(() => {
          const testing_playground = document.querySelector('#testing-playground');
          return testing_playground && testing_playground.children.length > 0;
        });

        if (!isComponentRendered) {
          // eslint-disable-next-line no-console
          console.error('Component did not render in the testing playground');
        }
      }

      it('renders correctly with default props', async () => {
        await renderComponent('KButton', { text: 'Test Button' });
        await percySnapshot(page, 'KButton - Default');
      });
    });
  }
});
