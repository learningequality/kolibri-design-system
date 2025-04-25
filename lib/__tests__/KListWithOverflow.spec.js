// lib/__tests__/KListWithOverflow.spec.js

import { mount } from '@vue/test-utils'
import KListWithOverflow from '../KListWithOverflow.vue'

describe('KListWithOverflow', () => {
  it('renders a list of items', () => {
    const items = ['One', 'Two', 'Three']
    const wrapper = mount(KListWithOverflow, {
      propsData: { items }
    })

    items.forEach(item => {
      expect(wrapper.text()).toContain(item)
    })
  })

  it('displays overflow indicator if list is too long', () => {
    const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
    const wrapper = mount(KListWithOverflow, {
      propsData: { items }
    })

    expect(wrapper.text()).toContain('…') // or however overflow is rendered
  })
})
