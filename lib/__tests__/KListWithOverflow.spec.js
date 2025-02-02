import { mount } from '@vue/test-utils';
import KListWithOverflow from '../KListWithOverflow.vue'; // Adjust path as needed

// Helper function to mock element dimensions using getBoundingClientRect
function setElementSize(element, { width, height }) {
  element.getBoundingClientRect = () => ({
    width,
    height,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
  });
}

// Constants for container and button dimensions
const LIST_WRAPPER_WIDTH = 101;
const MORE_BUTTON_WIDTH = 20;

// Utility function to wait for two nextTicks after mounting
async function waitForNextTicks(wrapper) {
  await wrapper.vm.$nextTick();
  await wrapper.vm.$nextTick();
}

describe('KListWithOverflow.vue', () => {
  it('renders all items when they fit within available space', async () => {
    const items = ['Item 1'];
    
    const wrapper = mount(KListWithOverflow, {
      propsData: { items },
      slots: {
        item: '<div class="list-item">{{ item }}</div>',
        more: '<button class="more-button">More</button>',
      },
    });

    await waitForNextTicks(wrapper);

    // Set dimensions for container and button
    setElementSize(wrapper.find('.list-wrapper').element, { width: LIST_WRAPPER_WIDTH, height: 30 });
    setElementSize(wrapper.find('.more-button-wrapper').element, { width: MORE_BUTTON_WIDTH, height: 20 });

    // Simulate item size (should fit within available space)
    const listItem = wrapper.find('.list-item');
    expect(listItem.exists()).toBe(true);
    setElementSize(listItem.element, { width: 80, height: 20 }); // Fits within 81px

    // Trigger recalculation of overflow handling
    wrapper.vm.setOverflowItems();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.overflowItems).toEqual([]);
    expect(wrapper.vm.isMoreButtonVisible).toBe(false);
    expect(listItem.element).toHaveStyle({ visibility: 'visible', position: 'unset' });
  });
  
  it('hides overflow items and displays "more" button when items do not fit', async () => {
    const items = ['Item 1', 'Item 2'];
    
    const wrapper = mount(KListWithOverflow, {
      propsData: { items },
      slots: {
        item: '<div class="list-item">{{ item }}</div>',
        more: '<button class="more-button">More</button>',
      },
    });

    await waitForNextTicks(wrapper);

    setElementSize(wrapper.find('.list-wrapper').element, { width: LIST_WRAPPER_WIDTH, height: 30 });
    setElementSize(wrapper.find('.more-button-wrapper').element, { width: MORE_BUTTON_WIDTH, height: 20 });

    const listItems = wrapper.findAll('.list-item');
    expect(listItems.length).toBe(2);

    // Define item dimensions
    setElementSize(listItems.at(0).element, { width: 80, height: 20 }); // Fits
    setElementSize(listItems.at(1).element, { width: 25, height: 20 }); // Overflows

    wrapper.vm.setOverflowItems();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.overflowItems).toEqual(['Item 2']);
    expect(wrapper.vm.isMoreButtonVisible).toBe(true);
    expect(listItems.at(0).element).toHaveStyle({ visibility: 'visible', position: 'unset' });
    expect(listItems.at(1).element).toHaveStyle({ visibility: 'hidden', position: 'absolute' });
  });

  it('passes correct overflow items to "more" slot', async () => {
    const items = ['Item 1', 'Item 2'];

    const wrapper = mount(KListWithOverflow, {
      propsData: { items },
      slots: {
        item: '<div class="list-item">{{ item }}</div>',
      },
      scopedSlots: {
        more(props) {
          return this.$createElement('div', { class: 'more-slot' }, String(props.overflowItems));
        },
      },
    });

    await waitForNextTicks(wrapper);

    setElementSize(wrapper.find('.list-wrapper').element, { width: LIST_WRAPPER_WIDTH, height: 30 });
    setElementSize(wrapper.find('.more-button-wrapper').element, { width: MORE_BUTTON_WIDTH, height: 20 });

    const listItems = wrapper.findAll('.list-item');
    setElementSize(listItems.at(0).element, { width: 80, height: 20 });
    setElementSize(listItems.at(1).element, { width: 25, height: 20 });

    wrapper.vm.setOverflowItems();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.overflowItems).toEqual(['Item 2']);
    expect(wrapper.vm.isMoreButtonVisible).toBe(true);

    const moreSlot = wrapper.find('.more-slot');
    expect(moreSlot.exists()).toBe(true);
    expect(moreSlot.text()).toBe('Item 2');
  });

  it('divider is not the last visible item', async () => {
    const items = ['Item 1', { type: 'divider', label: 'DIVIDER' }, 'Item 3'];
    
    const wrapper = mount(KListWithOverflow, {
      propsData: { items },
      slots: {
        item: '<div class="list-item">{{ typeof item === "object" ? item.label : item }}</div>',
        more: '<button class="more-button">More</button>',
      },
      scopedSlots: {
        divider(props) {
          return this.$createElement('div', { class: 'list-item' }, props.divider.label);
        },
      },
    });

    await waitForNextTicks(wrapper);

    setElementSize(wrapper.find('.list-wrapper').element, { width: LIST_WRAPPER_WIDTH, height: 30 });
    setElementSize(wrapper.find('.more-button-wrapper').element, { width: MORE_BUTTON_WIDTH, height: 20 });

    const listItems = wrapper.findAll('.list-item');
    setElementSize(listItems.at(0).element, { width: 60, height: 20 });
    setElementSize(listItems.at(1).element, { width: 20, height: 20 });
    setElementSize(listItems.at(2).element, { width: 30, height: 20 });

    wrapper.vm.setOverflowItems();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.overflowItems).toEqual(['Item 3']);
    expect(wrapper.vm.isMoreButtonVisible).toBe(true);
    expect(listItems.at(1).element).toHaveStyle({ visibility: 'hidden' });
  });
});
